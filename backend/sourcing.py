import requests
import xml.etree.ElementTree as ET
from datetime import datetime
import json
import os
from database.db import SessionLocal
from database.models import SourcingLead

from groq import Groq
from google import genai

def run_crawlers_and_evaluate():
    """
    Fetches the top products from Product Hunt RSS feed,
    evaluates them for 'customer obsession' using an LLM,
    and saves the high-scoring leads to the database.
    """
    url = "https://www.producthunt.com/feed"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except Exception as e:
        print(f"Failed to fetch Product Hunt RSS: {e}")
        return 0

    try:
        root = ET.fromstring(response.content)
    except Exception as e:
        print(f"Failed to parse XML: {e}")
        return 0

    items = root.findall('.//item')
    
    db = SessionLocal()
    new_leads_count = 0
    
    for item in items[:10]:
        title = item.findtext('title') or ""
        link = item.findtext('link') or ""
        description = item.findtext('description') or ""
        
        existing = db.query(SourcingLead).filter(SourcingLead.company_name == title).first()
        if existing:
            continue
            
        score, rationale = evaluate_customer_obsession(title, description)
        
        if score >= 70:
            lead = SourcingLead(
                company_name=title,
                website=link,
                description=f"{description}\n\n[AI Rationale]: {rationale}",
                source="Product Hunt / Social",
                signal_score=score,
                status="New",
                discovered_at=datetime.utcnow()
            )
            db.add(lead)
            new_leads_count += 1
            
    try:
        db.commit()
    except Exception as e:
        print(f"Database error saving leads: {e}")
        db.rollback()
    finally:
        db.close()
        
    return new_leads_count

def evaluate_customer_obsession(name: str, description: str) -> tuple[int, str]:
    prompt = f"""
    Evaluate the following startup launch for 'Customer Obsession'. 
    Customer obsession means a fanatical focus on user experience, rapid iteration based on feedback, and deep empathy for the user's problem.
    
    Startup Name: {name}
    Description: {description}
    
    Return ONLY a JSON object with two keys:
    1. "score": an integer from 0 to 100 representing the customer obsession signal. (Give 80-95 for highly engaged/obsessive products, 50-70 for average).
    2. "rationale": A 1-sentence explanation of why.
    """
    
    groq_api_key = os.getenv("GROQ_API_KEY")
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    
    try:
        if groq_api_key:
            client = Groq(api_key=groq_api_key)
            completion = client.chat.completions.create(
                model="llama3-8b-8192",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3,
                response_format={"type": "json_object"}
            )
            result = json.loads(completion.choices[0].message.content)
            return result.get("score", 50), result.get("rationale", "")
            
        elif gemini_api_key:
            client = genai.Client(api_key=gemini_api_key)
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
            )
            text = response.text
            if "```json" in text:
                text = text.split("```json")[1].split("```")[0].strip()
            result = json.loads(text)
            return result.get("score", 50), result.get("rationale", "")
            
        else:
            return 85, "Fallback score due to missing LLM API keys."
            
    except Exception as e:
        print(f"LLM Evaluation failed: {e}")
        return 75, "Failed to evaluate via LLM."
