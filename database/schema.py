from database.db import engine
from database.models import Base
# Import all models so they are registered with Base
from database.models import *

def init_db():
    print("Initializing Database Schema...")
    Base.metadata.create_all(bind=engine)
    print("Database Schema initialized successfully.")

if __name__ == "__main__":
    init_db()
