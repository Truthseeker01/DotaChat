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

        u = User(username="JJ", player_id= "1260869135", profile_img='https://dotesports.com/wp-content/uploads/2023/04/phantom-lancer-dota-2.jpg')
        u._hashed_password= bcrypt.generate_password_hash('123').decode('utf-8')
        users.append(u)

        u = User(username="123", player_id= "5551234561", profile_img='https://wallpaper-house.com/data/out/9/wallpaper2you_294856.jpg')
        u._hashed_password= bcrypt.generate_password_hash('password').decode('utf-8')
        users.append(u)

        u = User(username="Ace", player_id= "5551234562", profile_img='https://playerreadyup.com/wp-content/uploads/2018/08/grimstroke_blog.png')
        u._hashed_password= bcrypt.generate_password_hash('password').decode('utf-8')
        users.append(u)

        u = User(username="Player56", player_id= "5551234563", profile_img='https://www.pcgamesn.com/wp-content/uploads/2022/02/dota-2-primal-beast-abilities.jpg')
        u._hashed_password= bcrypt.generate_password_hash('password').decode('utf-8')
        users.append(u)

        u = User(username="Tastey Donut", player_id= "5551234564", profile_img='https://www.xfire.com/wp-content/uploads/2020/12/Best-Dota-2-Heroes-for-Beginners-1.jpg')
        u._hashed_password= bcrypt.generate_password_hash('password').decode('utf-8')
        users.append(u)

        u = User(username="Silent", player_id= "5551234565", profile_img='https://www.techicy.com/wp-content/uploads/2019/06/The-Best-Dota-2-Heroes-For-A-Newbie.jpg')
        u._hashed_password= bcrypt.generate_password_hash('password').decode('utf-8')
        users.append(u)

        u = User(username="HandsomePudge", player_id= "5551234566", profile_img='https://wallup.net/wp-content/uploads/2017/05/29/323866-heroes-warrior-Defense_of_the_ancient-Dota-Dota_2-Valve-Valve_Corporation-fantasy_art-sword-armor-fire-Ember_Spirit.jpg')
        u._hashed_password= bcrypt.generate_password_hash('password').decode('utf-8')
        users.append(u)

        u = User(username="Mr.Wrecker", player_id= "5551234567", profile_img='https://media-management-service.s3.amazonaws.com/media/images/8502aa1d9402354c4cf47c39ec29c92e_large_cover.3D.original.jpg')
        u._hashed_password= bcrypt.generate_password_hash('password').decode('utf-8')
        users.append(u)

        u = User(username="banPA", player_id= "5551234568", profile_img='https://www.pcgamesn.com/wp-content/uploads/2018/06/Best-Dota-2-heroes-art.jpg')
        u._hashed_password= bcrypt.generate_password_hash('password').decode('utf-8')
        users.append(u)

        u = User(username="WitchDoctor", player_id= "5551234569", profile_img='https://images.squarespace-cdn.com/content/v1/59af2189c534a58c97bd63b3/1576955032504-KJ9ORQ6LEDS44XGXU4FF/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/Echoes+of+the+Eyrie+loading+screen+Vengeful+Spirit+Valve.jpg')
        u._hashed_password= bcrypt.generate_password_hash('password').decode('utf-8')
        users.append(u)

        db.session.add_all(users)
        db.session.commit()

        f = Friend(username='WitchDoctor', player_id = "5551234569", user_id = 1, friend_id=10, profile_img='https://images.squarespace-cdn.com/content/v1/59af2189c534a58c97bd63b3/1576955032504-KJ9ORQ6LEDS44XGXU4FF/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/Echoes+of+the+Eyrie+loading+screen+Vengeful+Spirit+Valve.jpg')
        friends.append(f)

        f = Friend(username='banPA', player_id= "5551234568", user_id = 1, friend_id=9, profile_img='https://www.pcgamesn.com/wp-content/uploads/2018/06/Best-Dota-2-heroes-art.jpg')
        friends.append(f)

        f = Friend(username='Mr.Wrecker', player_id= "5551234567", user_id = 1, friend_id=8, profile_img='https://media-management-service.s3.amazonaws.com/media/images/8502aa1d9402354c4cf47c39ec29c92e_large_cover.3D.original.jpg')
        friends.append(f)

        f = Friend(username='HandsomePudge', player_id= "5551234566", user_id = 1, friend_id=7, profile_img='https://wallup.net/wp-content/uploads/2017/05/29/323866-heroes-warrior-Defense_of_the_ancient-Dota-Dota_2-Valve-Valve_Corporation-fantasy_art-sword-armor-fire-Ember_Spirit.jpg')
        friends.append(f)

        f = Friend(username='Silent', player_id= "5551234565", user_id = 1, friend_id=6, profile_img='https://www.techicy.com/wp-content/uploads/2019/06/The-Best-Dota-2-Heroes-For-A-Newbie.jpg')
        friends.append(f)

        f = Friend(username='Tastey Donut', player_id= "5551234564", user_id = 1, friend_id=5, profile_img='https://www.xfire.com/wp-content/uploads/2020/12/Best-Dota-2-Heroes-for-Beginners-1.jpg')
        friends.append(f)

        f = Friend(username='Player56', player_id= "5551234562", user_id = 1, friend_id=4, profile_img='https://www.pcgamesn.com/wp-content/uploads/2022/02/dota-2-primal-beast-abilities.jpg')
        friends.append(f)

        f = Friend(username='123', player_id= "5551234561", user_id = 1, friend_id=2, profile_img='https://wallpaper-house.com/data/out/9/wallpaper2you_294856.jpg')
        friends.append(f)

        f = Friend(username='JJ', player_id= "1260869135", user_id = 10, friend_id=1, profile_img='https://dotesports.com/wp-content/uploads/2023/04/phantom-lancer-dota-2.jpg')
        friends.append(f)

        f = Friend(username='JJ', player_id= "1260869135", user_id = 9, friend_id=1, profile_img='https://dotesports.com/wp-content/uploads/2023/04/phantom-lancer-dota-2.jpg')
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
