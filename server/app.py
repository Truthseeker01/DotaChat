#!/usr/bin/env python3
import logging
from flask import request, session, jsonify
from config import app, bcrypt, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET_NAME, S3_REGION
from models import db, User, Message, Friend
from flask_socketio import SocketIO, send, join_room, leave_room, emit
from flask_session import Session
import requests
import boto3
from botocore.exceptions import ClientError
import urllib.parse

socketio = SocketIO(app, cors_allowed_origins="*")

Session(app)

PROXY = '/api'
s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

@app.get(PROXY + '/users')
def get_users():
    return [ u.to_dict() for u in User.query.all()], 200

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
        current_user = User.query.where(User.id == session.get('user_id')).first()
        exiting_friend = Friend.query.filter_by(username = user.username, player_id = user.player_id, user_id = request.json['friend_id'], friend_id= user.id, profile_img=user.profile_img).first()

        if user == current_user:
            return 'error: You can\'t be friends with yourself'

        if not user or not current_user:
            return 'error  : user not found', 404
        
        if exiting_friend in current_user.friends:
            return 'error: This user is already a friend', 404
        
        friend = Friend(username = user.username, player_id = user.player_id, user_id = request.json['friend_id'], friend_id= user.id, profile_img=user.profile_img)
        db.session.add(friend)
        db.session.commit()
        return friend.to_dict(), 201

@app.post(PROXY + '/reaction/<int:id>')
def create_reaction(id):
    msg = Message.query.where(Message.id == id).first()
    msg.reaction = request.json['reaction']

    db.session.commit()

    return msg.to_dict(), 201
    

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
    sender_id = data.get('sender_id')
    recipient_id = data.get('recipient_id')
    message_content = data.get('content') 

    if sender_id and recipient_id and message_content:
        try:
            new_msg = Message(content=message_content, sender_id=sender_id, recipient_id=recipient_id)
            db.session.add(new_msg)
            db.session.commit()

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
        return {
            "sent_messages": [m.to_dict() for m in sent_messages],
            "recieved_messages": [m.to_dict() for m in recieved_messages]
            }, 200
    else:
        return {"error": "User not authenticated"}, 401
    

@app.route(PROXY + '/upload-video', methods=['PUT'])
def upload_video():
    try:
        file = request.files['file']
        content = request.form['content']
        profile_pic = request.form['profile_pic']
        uploader_id = request.form['uploader_id']
        uploader_name = request.form['uploader_name']
        url = request.form['url']

        response = s3.put_object(
            Bucket=S3_BUCKET_NAME,
            Key=url,
            Body=file,
            Metadata={
                'uploader_id': uploader_id,
                'uploader_name': uploader_name,
                'content': content,
                'profile_pic': profile_pic,
            },
            ContentType='video/mp4'
        )

        return jsonify({'message': 'File uploaded successfully', 'key': url}), 200

    except ClientError as e:
        print(f"Error uploading file to S3: {e}")
        return jsonify({'error': 'Failed to upload file'}), 500
    

@app.route(PROXY + '/videos', methods=['GET'])
def list_videos():
    try:
        response = s3.list_objects_v2(
            Bucket=S3_BUCKET_NAME
        )
        videos = []
        base_s3_url = 'https://dota-chat.s3.amazonaws.com/' 
        for obj in response.get('Contents', []):

            object_url = base_s3_url + urllib.parse.quote(obj['Key'])

            metadata = s3.head_object(Bucket=S3_BUCKET_NAME, Key=obj['Key'])['Metadata']
            uploader_id = metadata.get('uploader_id', 'Unknown') 
            uploader_name = metadata.get('uploader_name', 'Unknown')
            content = metadata.get('content', 'Unknown')
            profile_pic = metadata.get('profile_pic', 'Unknown')
            videos.append({
                'Key': obj['Key'],
                'ObjectUrl': object_url,
                'UploaderId': uploader_id,
                'UploaderName': uploader_name,
                'Content': content,
                'PorfilePic': profile_pic,
                'Size': obj['Size'],
                'LastModified': obj['LastModified']
            })

        return jsonify(videos), 200

    except Exception as e:
        print(f"Error listing objects from S3: {e}")
        return jsonify({'error': 'Failed to list videos'}), 500

if __name__ == '__main__':
    socketio.run(app, port=5555, debug=True)