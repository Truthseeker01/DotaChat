from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _hashed_password = db.Column(db.String, nullable=False)
    player_id = db.Column(db.String)

    sent_messages = db.relationship('Message', foreign_keys='Message.sender_id', back_populates='sender')
    recieved_messages = db.relationship('Message', foreign_keys='Message.recipient_id', back_populates='recipient')
    friends = db.relationship('Friend', back_populates='user')

    serialize_rules = ('-sent_messages.sender', '-recieved_messages.recipient', '-friends.user', '-sent_messages', '-recieved_messages', '-friends',)


    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'player_id': self.player_id,
            'sent_messages': [message.to_dict() for message in self.sent_messages],
            'recieved_messages': [message.to_dict() for message in self.recieved_messages],
            'friends': [friend.to_dict() for friend in self.friends]
        }


class Message(db.Model, SerializerMixin):

    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    sender = db.relationship('User', foreign_keys=[sender_id], back_populates='sent_messages')
    recipient = db.relationship('User', foreign_keys=[recipient_id], back_populates='recieved_messages')

    serialize_rules = ('-sender.sent_messages', '-recipient.recieved_messages',)

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'timestamp': self.timestamp.isoformat() + 'Z',
            'sender_id': self.sender_id,
            'recipient_id': self.recipient_id,
            'sender': {'id': self.sender.id, 'username': self.sender.username} if self.sender else None,
            'recipient': {'id': self.recipient.id, 'username': self.recipient.username} if self.recipient else None
        }
    

class Friend(db.Model, SerializerMixin):
    
    __tablename__ = 'friends'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    friend_id = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', back_populates='friends')

    serialize_rules = ('-user.friends',)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'user_id': self.user_id,
            'friend_id': self.friend_id
        }










# class Play(db.Model, SerializerMixin):
#     __tablename__ = 'plays'

#     id = db.Column(db.Integer, primary_key=True)
#     filename = db.Column(db.String)
#     file = db.Column


# class Friendship(db.Model, SerializerMixin):

#     __tablename__ = 'friendships'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     friend_id = db.Column(db.Integer, db.ForeignKey('friends.id'))