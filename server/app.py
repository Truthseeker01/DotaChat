#!/usr/bin/env python3
import logging
from flask import request, session, jsonify
from config import app, bcrypt
from models import db, User, Message, Friend
from flask_socketio import SocketIO, send, join_room, leave_room, emit
from flask_session import Session

socketio = SocketIO(app, cors_allowed_origins="*")

Session(app)

PROXY = '/api'

@app.post(PROXY + '/users')
def create_user():
    try:
        new_user = User(username=request.json['username'], player_id=request.json['player_id'])
        new_user._hashed_password = bcrypt.generate_password_hash(request.json['password']).decode('utf-8')
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        return new_user.to_dict(), 201
    except Exception as e:
        return { 'error': str(e) }, 406
    
@app.post(PROXY + '/users/<int:id>')
def post_new_friend(id):
    user = User.query.where(User.player_id == id).first()
    if user:
        friend = Friend(username = user.username, user_id = request.json['friend_id'], friend_id= user.id)
        db.session.add(friend)
        db.session.commit()
        return friend.to_dict(), 201
    else:
        return {'error': 'Not found'}
    

@app.get(PROXY + '/check-session')
def check_session():
    user_id = session.get('user_id')
    if user_id:
        user = User.query.get(user_id)
        if user:
            return user.to_dict(), 200
    return {}, 204


@app.post(PROXY + '/login')
def login():
    user = User.query.filter_by(username=request.json.get('username')).first()
    if user and bcrypt.check_password_hash(user._hashed_password, request.json.get('password')):
        session['user_id'] = user.id
        return user.to_dict()
    else:
        return {'error': 'Invalid username or password'}, 401
    

@app.delete(PROXY + '/logout')
def logout():
    session.pop('user_id')
    return {}, 204


@socketio.on('send_message')
def handle_send_message(data):
    print("Received data:", data)  # Debugging log

    sender_id = data.get('sender_id')
    recipient_id = data.get('recipient_id')
    message_content = data.get('content')  # Changed from 'message' to 'content'

    print("Sender ID:", sender_id)  # Debugging log
    print("Recipient ID:", recipient_id)  # Debugging log
    print("Message content:", message_content)  # Debugging log

    if sender_id and recipient_id and message_content:
        try:
            new_msg = Message(content=message_content, sender_id=sender_id, recipient_id=recipient_id)
            db.session.add(new_msg)
            db.session.commit()

            # Emit the message with the 'message' event name
            emit("message", {
                "content": message_content,
                "sender_id": sender_id,
                "recipient_id": recipient_id,
                "timestamp": new_msg.timestamp.isoformat()
            }, broadcast=True)

        except Exception as e:
            emit("message_error", {"error": f"Error adding message to database: {str(e)}"}, broadcast=True)
    else:
        emit("message_error", {"error": "Invalid message data"}, broadcast=True)



@app.route(PROXY + '/get_messages/<int:id>')
def get_messages(id):
    user_id = session.get('user_id')
    if user_id:
        sent_messages = Message.query.filter_by(sender_id=user_id, recipient_id = id).all()
        recieved_messages = Message.query.filter_by(recipient_id=user_id, sender_id= id).all()
        # all_messages = sent_messages + received_messages
        return {
            "sent_messages": [m.to_dict() for m in sent_messages],
            "recieved_messages": [m.to_dict() for m in recieved_messages]
            }, 200
    else:
        return {"error": "User not authenticated"}, 401

if __name__ == '__main__':
    socketio.run(app, port=5555, debug=True)