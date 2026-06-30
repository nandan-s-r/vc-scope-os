export default function CookiePolicy() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px' }}>Cookie Policy</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Last updated: June 30, 2026</p>
      
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>1. What Are Cookies?</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>2. How We Use Cookies</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          VC Scope OS uses cookies strictly for essential operational purposes:
          <ul style={{ marginTop: '8px', marginLeft: '20px', listStyleType: 'disc' }}>
            <li><strong>Authentication:</strong> To keep you logged in to your secure VC dashboard via JWT tokens.</li>
            <li><strong>Security:</strong> To protect against Cross-Site Request Forgery (CSRF) attacks.</li>
          </ul>
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>3. No Tracking or Analytics</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          We do NOT use tracking cookies, advertising cookies, or third-party analytics cookies (such as Google Analytics or Meta Pixels) to track your behavior across the internet. Your privacy and the confidentiality of your deal flow are paramount.
        </p>
      </section>
      
      <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
        <a href="/" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>← Back to Home</a>
      </div>
    </div>
  );
}
