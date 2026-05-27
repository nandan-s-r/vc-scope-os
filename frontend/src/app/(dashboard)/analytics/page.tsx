"use client";

import React from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const burnArrData = [
  { name: 'Jan', burn: 65000, arr: 12000 },
  { name: 'Feb', burn: 59000, arr: 18000 },
  { name: 'Mar', burn: 45000, arr: 29000 },
  { name: 'Apr', burn: 30000, arr: 42000 },
  { name: 'May', burn: 28000, arr: 46000 },
  { name: 'Jun', burn: 25000, arr: 52000 },
  { name: 'Jul', burn: 21000, arr: 56000 },
  { name: 'Aug', burn: 19000, arr: 61000 },
  { name: 'Sep', burn: 18000, arr: 62000 },
  { name: 'Oct', burn: 15000, arr: 64000 },
  { name: 'Nov', burn: 12000, arr: 66000 },
  { name: 'Dec', burn: 10000, arr: 68000 },
];

const acquisitionData = [
  { name: 'Jan', cac: 400, ltv: 2400, organic: 1200 },
  { name: 'Feb', cac: 380, ltv: 2500, organic: 1300 },
  { name: 'Mar', cac: 320, ltv: 2800, organic: 1500 },
  { name: 'Apr', cac: 300, ltv: 3100, organic: 1800 },
  { name: 'May', cac: 290, ltv: 3200, organic: 1900 },
  { name: 'Jun', cac: 280, ltv: 3400, organic: 2100 },
  { name: 'Jul', cac: 250, ltv: 3500, organic: 2200 },
];

export default function AnalyticsDashboard() {
  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '2rem', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.2rem', letterSpacing: '2px', fontWeight: 'bold' }}>
          PORTFOLIO: <span style={{ color: '#00e5ff' }}>LAST 12 MONTHS MEDIAN </span><span style={{ fontSize: '0.8rem' }}>▼</span>
        </h1>
        <div style={{ display: 'flex', gap: '1rem', color: '#888' }}>
          <span style={{ cursor: 'pointer' }}>📺</span>
          <span style={{ cursor: 'pointer' }}>🔄</span>
          <span style={{ cursor: 'pointer' }}>❓</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
        {/* Left Chart */}
        <div style={{ backgroundColor: '#111', padding: '1.5rem', borderRadius: '8px', border: '1px solid #222' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.8rem', color: '#888', fontWeight: 'bold', letterSpacing: '1px' }}>
            <span>BURN RATE VS ARR GROWTH</span>
            <span>⚙ OPTIONS</span>
          </div>
          
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={burnArrData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid stroke="#222" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#555" tick={{ fill: '#888', fontSize: 10 }} />
                <YAxis yAxisId="left" stroke="#555" tick={{ fill: '#888', fontSize: 10 }} tickFormatter={(val) => `$${val/1000}k`} />
                <YAxis yAxisId="right" orientation="right" stroke="#555" tick={{ fill: '#888', fontSize: 10 }} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', color: '#000', borderRadius: '4px', border: 'none', fontWeight: 'bold' }}
                  itemStyle={{ color: '#000' }}
                />
                <Bar yAxisId="left" dataKey="burn" fill="#00e5ff" barSize={20} radius={[2, 2, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="arr" stroke="#ff0055" strokeWidth={3} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '0.8rem', marginTop: '1rem' }}>
            <span style={{ color: '#00e5ff' }}>● Monthly Burn</span>
            <span style={{ color: '#ff0055' }}>— ARR Growth</span>
          </div>
        </div>

        {/* Right Chart */}
        <div style={{ backgroundColor: '#111', padding: '1.5rem', borderRadius: '8px', border: '1px solid #222' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.8rem', color: '#888', fontWeight: 'bold', letterSpacing: '1px' }}>
            <span>CUSTOMER ACQUISITION VS LTV</span>
            <span>⚙ OPTIONS</span>
          </div>
          
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={acquisitionData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid stroke="#222" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#555" tick={{ fill: '#888', fontSize: 10 }} />
                <YAxis stroke="#555" tick={{ fill: '#888', fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#222', borderColor: '#333', color: '#fff' }}
                />
                <Area type="monotone" dataKey="ltv" stroke="#00ff88" fill="#00ff88" fillOpacity={0.1} strokeWidth={2} />
                <Area type="monotone" dataKey="organic" stroke="#00e5ff" fill="#00e5ff" fillOpacity={0.1} strokeWidth={2} />
                <Area type="monotone" dataKey="cac" stroke="#ff0055" fill="#ff0055" fillOpacity={0.3} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '0.8rem', marginTop: '1rem' }}>
            <span style={{ color: '#ff0055' }}>— Blended CAC</span>
            <span style={{ color: '#00ff88' }}>— Lifetime Value (LTV)</span>
          </div>
        </div>
      </div>

      {/* Bottom Stats Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* Stats Left */}
        <div style={{ backgroundColor: '#111', padding: '1.5rem', borderRadius: '8px', border: '1px solid #222' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.8rem', color: '#888', fontWeight: 'bold', letterSpacing: '1px' }}>
            <span>PORTFOLIO METRICS</span>
            <span>⚙ OPTIONS</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ color: '#00e5ff', fontSize: '0.8rem' }}>Median Burn (L3M)</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#00e5ff' }}>$22.5k</div>
            </div>
            <div>
              <div style={{ color: '#ff0055', fontSize: '0.8rem' }}>Median ARR Growth</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ff0055' }}>2.7x YoY</div>
            </div>
            <div>
              <div style={{ color: '#fff', fontSize: '0.8rem' }}>LTV:CAC Ratio</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff' }}>4.6</div>
            </div>
          </div>
        </div>

        {/* Stats Right */}
        <div style={{ backgroundColor: '#111', padding: '1.5rem', borderRadius: '8px', border: '1px solid #222' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.8rem', color: '#888', fontWeight: 'bold', letterSpacing: '1px' }}>
            <span>DEAL PIPELINE PERFORMANCE</span>
            <span>⚙ OPTIONS</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ color: '#00ff88', fontSize: '0.8rem' }}>Deals Sourced</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#00ff88' }}>479</div>
            </div>
            <div>
              <div style={{ color: '#fff', fontSize: '0.8rem' }}>Avg Triage Time</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff' }}>17min</div>
            </div>
            <div>
              <div style={{ color: '#00e5ff', fontSize: '0.8rem' }}>Term Sheets</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#00e5ff' }}>4</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

