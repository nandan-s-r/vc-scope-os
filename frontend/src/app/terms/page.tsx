export default function TermsOfService() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px' }}>Terms of Service</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Last updated: June 30, 2026</p>
      
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>1. Acceptance of Terms</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          By accessing and using VC Scope OS ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>2. Description of Service</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          VC Scope OS provides AI-assisted venture capital tools, including but not limited to deal sourcing, pitch deck analysis, and meeting copilot features. We utilize third-party APIs (such as Groq and Google Gemini) to process this data.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>3. Limitation of Liability</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE". WE EXPRESSLY DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED. UNDER NO CIRCUMSTANCES SHALL VC SCOPE OS OR ITS DEVELOPERS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE SERVICE, INCLUDING BUT NOT LIMITED TO LOST DEALS, INVESTMENT LOSSES, OR DATA BREACHES.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>4. User Responsibilities</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          You are solely responsible for ensuring you have the legal right to upload proprietary pitch decks and transcripts to our Service. You agree not to reverse engineer the Service or use it to train competitive AI models.
        </p>
      </section>
      
      <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
        <a href="/" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>← Back to Home</a>
      </div>
    </div>
  );
}
