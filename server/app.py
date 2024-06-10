#!/usr/bin/env python3

from flask import request, session

from config import app, bcrypt
from models import db # import your models here!


@app.get('/')
def index():
    return "Hello world"