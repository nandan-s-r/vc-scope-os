'use client';
import { useState } from 'react';
import Modal from './Modal';
import { useAuth } from '@/context/AuthContext';

export default function AddStartupModal({ isOpen, onClose, onSuccess }: { isOpen: boolean, onClose: () => void, onSuccess: () => void }) {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    sector: '',
    stage: '',
    website: '',
    location: '',
    description: '',
    revenue_arr: '',
    valuation: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000';
      const res = await fetch(`${apiBase}/api/startups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Failed to create startup');
      
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="ADD NEW STARTUP">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {error && <div style={{ color: 'var(--accent-red)', fontSize: '12px' }}>{error}</div>}
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <label className="mono text-secondary" style={{ fontSize: '11px', display: 'block', marginBottom: '4px' }}>COMPANY NAME</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="input-field" placeholder="Acme Corp" />
          </div>
          <div style={{ flex: 1 }}>
            <label className="mono text-secondary" style={{ fontSize: '11px', display: 'block', marginBottom: '4px' }}>SECTOR</label>
            <input type="text" name="sector" value={formData.sector} onChange={handleChange} className="input-field" placeholder="AI / SaaS" />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <label className="mono text-secondary" style={{ fontSize: '11px', display: 'block', marginBottom: '4px' }}>STAGE</label>
            <input type="text" name="stage" value={formData.stage} onChange={handleChange} className="input-field" placeholder="Seed" />
          </div>
          <div style={{ flex: 1 }}>
            <label className="mono text-secondary" style={{ fontSize: '11px', display: 'block', marginBottom: '4px' }}>WEBSITE</label>
            <input type="url" name="website" value={formData.website} onChange={handleChange} className="input-field" placeholder="https://..." />
          </div>
        </div>

        <div>
          <label className="mono text-secondary" style={{ fontSize: '11px', display: 'block', marginBottom: '4px' }}>DESCRIPTION</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="input-field" style={{ minHeight: '80px', resize: 'vertical' }} placeholder="What do they do?"></textarea>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <label className="mono text-secondary" style={{ fontSize: '11px', display: 'block', marginBottom: '4px' }}>REVENUE ARR</label>
            <input type="text" name="revenue_arr" value={formData.revenue_arr} onChange={handleChange} className="input-field" placeholder="$1.2M" />
          </div>
          <div style={{ flex: 1 }}>
            <label className="mono text-secondary" style={{ fontSize: '11px', display: 'block', marginBottom: '4px' }}>VALUATION</label>
            <input type="text" name="valuation" value={formData.valuation} onChange={handleChange} className="input-field" placeholder="$20M" />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '16px' }}>
          {loading ? 'SAVING...' : 'SAVE STARTUP RECORD'}
        </button>
      </form>
    </Modal>
  );
}
