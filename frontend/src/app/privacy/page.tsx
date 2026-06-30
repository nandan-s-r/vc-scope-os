export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px' }}>Privacy Policy</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Last updated: June 30, 2026</p>
      
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>1. Information We Collect</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          We collect information you provide directly to us, including your name, email address, and any proprietary business data (such as pitch decks, meeting transcripts, and startup metrics) you upload to VC Scope OS. We also automatically collect certain technical data, such as IP addresses and usage metrics, to ensure platform security and performance.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>2. How We Use Your Information</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          We use your information to provide, maintain, and improve our venture capital operating system. Crucially, data you upload (such as pitch decks) is processed by third-party Large Language Models (LLMs) including Groq and Google Gemini to generate insights. We do not use your proprietary data to train our own models.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>3. Third-Party Data Sharing (AI Processing)</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          To provide AI-driven insights, uploaded documents and text are transmitted securely via API to our LLM partners (Groq, Google). By using our services, you consent to this data processing. We mandate via our vendor agreements that these third parties do not retain your proprietary data for model training.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>4. Data Security</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          We implement industry-standard security measures (including HTTPS, encrypted storage, and JWT authentication) to protect your personal and proprietary data from unauthorized access, alteration, disclosure, or destruction.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>5. GDPR and CCPA Rights</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Depending on your location, you may have the right to access, delete, or restrict the processing of your personal data. You may request account deletion and complete data wiping at any time by contacting our support team.
        </p>
      </section>
      
      <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
        <a href="/" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>← Back to Home</a>
      </div>
    </div>
  );
}
