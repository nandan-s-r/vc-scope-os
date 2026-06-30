'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CommandBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const q = query.trim().toLowerCase();
      if (q === '/memo') router.push('/memo');
      else if (q === '/source') router.push('/source');
      else if (q === '/deck') router.push('/deck');
      else if (q === '/startups') router.push('/startups');
      else if (q === '/meetings') router.push('/meetings');
      else if (q.startsWith('/')) alert(`Unknown command: ${q}`);
      else if (q) {
        // Just route to startups with a simple alert for now
        alert(`Search for "${q}" is not yet fully implemented on the backend.`);
      }
      setQuery('');
    }
  };

  return (
    <div className="cmd-search" style={{ position: 'relative' }}>
      <span style={{ color: 'var(--accent-blue)', fontSize: '11px', fontWeight: 600 }}>[CMD]</span>
      <input 
        type="text" 
        placeholder="Try /memo, /source, /deck..." 
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Command palette and search"
      />
    </div>
  );
}
