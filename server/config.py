from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()



app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_TYPE'] = 'filesystem'  # Use filesystem to store session data
app.json.compact = False

AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
S3_BUCKET_NAME = os.environ.get('S3_BUCKET_NAME')
S3_REGION = os.environ.get('S3_REGION')



bcrypt = Bcrypt(app)

CORS(app)

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)

migrate = Migrate(app, db)

db.init_app(app)



