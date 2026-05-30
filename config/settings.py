import os
from dotenv import load_dotenv

load_dotenv()

# AI Providers
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

# Search APIs
SERPER_API_KEY = os.getenv("SERPER_API_KEY", "")

# WhatsApp config
WHATSAPP_ACCESS_TOKEN = os.getenv("WHATSAPP_ACCESS_TOKEN", "")
WHATSAPP_PHONE_NUMBER_ID = os.getenv("WHATSAPP_PHONE_NUMBER_ID", "")
WHATSAPP_VERIFY_TOKEN = os.getenv("WHATSAPP_VERIFY_TOKEN", "")

# Database Config
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./antigravity.db")
CHROMA_DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "chromadb_storage")

# App Config
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")
REPORTS_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "reports")

# Ensure dirs exist
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(REPORTS_DIR, exist_ok=True)
os.makedirs(CHROMA_DB_PATH, exist_ok=True)

