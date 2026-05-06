from fastapi import FastAPI, Request
from utils.ai_utils import call_groq

app = FastAPI()

@app.get("/")
def health_check():
    return {"status": "Webhook Active"}

@app.post("/webhook")
async def whatsapp_webhook(request: Request):
    """Receives POST from Meta WhatsApp Cloud API."""
    data = await request.json()
    
    # Validation and signature checks go here in production
    
    try:
        if 'messages' in data['entry'][0]['changes'][0]['value']:
            msg = data['entry'][0]['changes'][0]['value']['messages'][0]
            phone = msg['from']
            text = msg['text']['body']
            
            # 1. Groq detects intent
            intent = call_groq(f"Detect intent of this message: {text}", system_instruction="Return single word intent: lookup, add_note, schedule, briefing, general")
            
            # 2. Logic based on intent
            # ...
            print(f"WhatsApp msg from {phone}: {text} (Intent: {intent})")
            
            return {"status": "success"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/webhook")
async def verify_webhook(request: Request):
    """WhatsApp verification challenge."""
    params = request.query_params
    if params.get("hub.mode") == "subscribe" and params.get("hub.verify_token") == "antigravity":
        return int(params.get("hub.challenge"))
    return "Verification failed"
