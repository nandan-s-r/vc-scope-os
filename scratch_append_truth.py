import sys

code = """
@app.post("/api/truth-engine")
def run_truth_engine(payload: TruthEngineRequest, current_user: User = Depends(get_current_user)):
    db = SessionLocal()
    try:
        startup = db.query(Startup).filter(Startup.id == payload.startup_id).first()
        if not startup:
            raise HTTPException(status_code=404, detail="Startup not found")

        founders = db.query(Founder).filter(Founder.startup_id == payload.startup_id).all()
        meetings = db.query(Meeting).filter(Meeting.startup_id == payload.startup_id).all()
        decks = db.query(Deck).filter(Deck.startup_id == payload.startup_id).all()

        prompt = f'''
        You are the VC Scope OS Deal Truth Engine. Your job is to act as a cynical, highly analytical due diligence auditor for a venture capital firm.
        
        You are auditing a startup named {startup.name} in the {startup.sector} space.
        
        Here are the claims they make:
        - Revenue ARR: {startup.revenue_arr}
        - Description: {startup.description}
        - Problem: {startup.problem}
        - Solution: {startup.solution}
        - Moat: {startup.moat}
        
        Founders: {[{'name': f.name, 'background': f.background} for f in founders]}
        Meeting Transcripts & AI Summaries: {[{'summary': m.ai_summary, 'concerns': m.key_concerns} for m in meetings]}
        Deck Content: {[d.extracted_text for d in decks]}
        
        Cross-reference the startup claims with their meeting transcripts, deck contents, and founder backgrounds.
        Output ONLY a JSON payload with NO markdown block formatting, in this exact structure:
        {{
            "verified_claims": ["Claim 1", "Claim 2"],
            "unsupported_claims": ["Claim 1"],
            "contradictions": ["Contradiction 1"],
            "investor_questions": ["Question 1"],
            "confidence_score": 75
        }}
        '''

        import google.generativeai as genai
        import json
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt)
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:-3]
        
        return json.loads(text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()
"""

with open('backend/api.py', 'a', encoding='utf-8') as f:
    f.write(code)

print('Success')
