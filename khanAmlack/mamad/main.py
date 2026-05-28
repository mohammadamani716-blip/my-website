from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import secrets

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

USERS_DB_FILE = "users.json"

# ذخیره توکن‌ها در حافظه
TOKENS_DB = {}

class UserCreate(BaseModel):
    id: int
    name: str
    lastname: str
    password: str
    username: str
    email: str
    city: str
    phone: str

class LoginRequest(BaseModel):
    username: str
    password: str

def load_users():
    try:
        with open(USERS_DB_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def save_users(users):
    with open(USERS_DB_FILE, "w") as f:
        json.dump(users, f, indent=4)

users_db = load_users()

@app.get("/")
def read_root():
    return {"message": "Welcome to the User Management API!"}

@app.post("/users/")
def add_user(user: UserCreate):

    users_db = load_users()

    for existing_user in users_db:
        if existing_user["id"] == user.id:
            raise HTTPException(
                status_code=400,
                detail=f"User with id {user.id} already exists."
            )

    user_dict = user.model_dump()

    users_db.append(user_dict)

    save_users(users_db)

    return {
        "message": "User added successfully",
        "user": user_dict
    }
    
@app.post("/login")
def login_user(login_data: LoginRequest):

    users_db = load_users()

    for user in users_db:

        if (
            user["username"] == login_data.username
            and
            user["password"] == login_data.password
        ):

            token = secrets.token_urlsafe(32)

            TOKENS_DB[token] = login_data.username

            user_info = user.copy()

            user_info.pop("password", None)

            return {

                "access_token": token,

                "token_type": "bearer",

                "user": user_info

            }

    raise HTTPException(
        status_code=401,
        detail="نام کاربری یا رمز عبور اشتباه است"
    )



