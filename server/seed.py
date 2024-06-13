#!/usr/bin/env python3

from app import app, bcrypt
from models import db, User, Message, Friend
from faker import Faker
from werkzeug.security import generate_password_hash

faker = Faker()

if __name__ == '__main__':
    with app.app_context():
        print("Seeding database...")
        User.query.delete()
        Message.query.delete()
        Friend.query.delete()

        users = []
        friends = []
        messages = []

        u = User(username="Lina's Husband", player_id= "1260869135")
        u._hashed_password= bcrypt.generate_password_hash('123').decode('utf-8')
        users.append(u)

        u = User(username="123", player_id= "5551234561")
        u._hashed_password= bcrypt.generate_password_hash('password').decode('utf-8')
        users.append(u)

        u = User(username="STFU", player_id= "5551234562")
        u._hashed_password= bcrypt.generate_password_hash('password').decode('utf-8')
        users.append(u)

        u = User(username="Player56", player_id= "5551234563")
        u._hashed_password= bcrypt.generate_password_hash('password').decode('utf-8')
        users.append(u)

        u = User(username="Tastey Donut", player_id= "5551234564")
        u._hashed_password= bcrypt.generate_password_hash('password').decode('utf-8')
        users.append(u)

        u = User(username="Silent", player_id= "5551234565")
        u._hashed_password= bcrypt.generate_password_hash('password').decode('utf-8')
        users.append(u)

        u = User(username="HandsomePudge", player_id= "5551234566")
        u._hashed_password= bcrypt.generate_password_hash('password').decode('utf-8')
        users.append(u)

        u = User(username="Mr.Wrecker", player_id= "5551234567")
        u._hashed_password= bcrypt.generate_password_hash('password').decode('utf-8')
        users.append(u)

        u = User(username="banPA", player_id= "5551234568")
        u._hashed_password= bcrypt.generate_password_hash('password').decode('utf-8')
        users.append(u)

        u = User(username="WitchDoctor", player_id= "5551234569")
        u._hashed_password= bcrypt.generate_password_hash('password').decode('utf-8')
        users.append(u)

        db.session.add_all(users)
        db.session.commit()

        f = Friend(username='WitchDoctor', user_id = 1, friend_id=10)
        friends.append(f)

        f = Friend(username='banPA', user_id = 1, friend_id=9)
        friends.append(f)

        f = Friend(username='Mr.Wrecker', user_id = 1, friend_id=8)
        friends.append(f)

        f = Friend(username='HandsomePudge', user_id = 1, friend_id=7)
        friends.append(f)

        f = Friend(username='Silent', user_id = 1, friend_id=8)
        friends.append(f)

        f = Friend(username='Tastey Donut', user_id = 1, friend_id=5)
        friends.append(f)

        f = Friend(username='Player56', user_id = 1, friend_id=4)
        friends.append(f)

        f = Friend(username='123', user_id = 1, friend_id=2)
        friends.append(f)

        f = Friend(username='Lina\'s Husband', user_id = 10, friend_id=1)
        friends.append(f)

        f = Friend(username='Lina\'s Husband', user_id = 9, friend_id=1)
        friends.append(f)

        db.session.add_all(friends)
        db.session.commit()

        m = Message(content='Hi', sender_id= 1, recipient_id=2)
        messages.append(m)
        m = Message(content='Hi you', sender_id= 2, recipient_id=1)
        messages.append(m)

        m = Message(content='Hi', sender_id= 1, recipient_id=4)
        messages.append(m)
        m = Message(content='su\'p?', sender_id= 4, recipient_id=1)
        messages.append(m)

        db.session.add_all(messages)
        db.session.commit()

        
        


        print("Seeding complete!")
