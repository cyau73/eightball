'use client';

import React, { useState, useEffect } from 'react';

export default function ApiLandingPage() {
  const [activeTab, setActiveTab] = useState<'tester' | 'catalog' | 'docs'>('catalog');
  const [fortune, setFortune] = useState<string>('Ask the sassy 8-ball anything...');
  const [metadata, setMetadata] = useState<any>(null);
  const [intensity, setIntensity] = useState<'ALL' | 'MILD' | 'SPICY' | 'SAVAGE'>('SAVAGE');
  const [seed, setSeed] = useState<string>('seed_demo_user_123');
  const [loading, setLoading] = useState(false);
  const [health, setHealth] = useState<any>(null);

  // Catalog state
  const [messages, setMessages] = useState<any[]>([]);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogIntensity, setCatalogIntensity] = useState('ALL');
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [catalogSource, setCatalogSource] = useState('');

  // New message form state
  const [newText, setNewText] = useState('');
  const [newIntensity, setNewIntensity] = useState<'MILD' | 'SPICY' | 'SAVAGE'>('SAVAGE');
  const [newCategory, setNewCategory] = useState<'GENERAL' | 'WORK' | 'DATING' | 'EXISTENTIAL' | 'TECH'>('GENERAL');
  const [addStatus, setAddStatus] = useState<string | null>(null);

  const fetchFortune = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/fortune?seed=${encodeURIComponent(seed)}&intensity=${intensity}&nonce=${Date.now()}`
      );
      const data = await res.json();
      if (data.success) {
        setFortune(data.fortune);
        setMetadata(data.metadata);
      } else {
        setFortune(data.fallback || 'Something went wrong!');
      }
    } catch (e: any) {
      setFortune('Error reaching server: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCatalog = async () => {
    setCatalogLoading(true);
    try {
      const res = await fetch(`/api/messages?search=${encodeURIComponent(catalogSearch)}&intensity=${catalogIntensity}`);
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages || []);
        setCatalogSource(data.source || '');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCatalogLoading(false);
    }
  };

  const handleAddMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: newText,
          intensity: newIntensity,
          category: newCategory,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setNewText('');
        setAddStatus('Added successfully!');
        fetchCatalog();
        setTimeout(() => setAddStatus(null), 3000);
      } else {
        setAddStatus('Error: ' + data.error);
      }
    } catch (err: any) {
      setAddStatus('Failed: ' + err.message);
    }
  };

  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then((data) => setHealth(data))
      .catch(() => {});
    fetchCatalog();
  }, []);

  useEffect(() => {
    fetchCatalog();
  }, [catalogIntensity]);

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Top Banner Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            background: 'rgba(236, 72, 153, 0.15)',
            border: '1px solid rgba(236, 72, 153, 0.35)',
            borderRadius: '999px',
            color: '#f472b6',
            fontSize: '13px',
            fontWeight: 700,
            marginBottom: '16px',
            letterSpacing: '0.5px',
          }}
        >
          🔮 SASSY 8-BALL DASHBOARD & API
        </div>
        <h1
          style={{
            fontSize: '42px',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #fff 30%, #ec4899 70%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-1px',
            marginBottom: '10px',
          }}
        >
          PostgreSQL Sassy Messages Catalog
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '640px', margin: '0 auto' }}>
          Explore, filter, and manage all curated sassy fortunes powering your mobile app on Vercel.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '32px',
        }}
      >
        {[
          { id: 'catalog', label: '📚 Sassy Message Catalog' },
          { id: 'tester', label: '⚡ Live API Tester' },
          { id: 'docs', label: '📖 Endpoints & Setup' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: activeTab === tab.id ? '1px solid #ec4899' : '1px solid var(--border-color)',
              background: activeTab === tab.id ? 'rgba(236, 72, 153, 0.2)' : 'var(--bg-card)',
              color: activeTab === tab.id ? '#fdf2f8' : 'var(--text-secondary)',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: activeTab === tab.id ? '0 4px 20px rgba(236, 72, 153, 0.25)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: SASSY MESSAGE CATALOG & CMS */}
      {activeTab === 'catalog' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Add Sassy Message Panel */}
          <div
            style={{
              background: 'var(--bg-card)',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              padding: '24px',
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px', color: '#f8fafc' }}>
              ✨ Add New Sassy Fortune
            </h2>
            <form onSubmit={handleAddMessage} style={{ display: 'grid', gap: '16px' }}>
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Enter witty, savage, or sarcastic response..."
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '10px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  fontSize: '14px',
                }}
              />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 700 }}>INTENSITY:</label>
                  <select
                    value={newIntensity}
                    onChange={(e: any) => setNewIntensity(e.target.value)}
                    style={{
                      background: '#0a0b12',
                      color: '#fff',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <option value="MILD">MILD</option>
                    <option value="SPICY">SPICY</option>
                    <option value="SAVAGE">SAVAGE</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 700 }}>CATEGORY:</label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    style={{
                      background: '#0a0b12',
                      color: '#fff',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <option value="GENERAL">GENERAL</option>
                    <option value="WORK">WORK</option>
                    <option value="DATING">DATING</option>
                    <option value="EXISTENTIAL">EXISTENTIAL</option>
                    <option value="TECH">TECH</option>
                  </select>
                </div>

                <button
                  type="submit"
                  style={{
                    marginLeft: 'auto',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                    color: '#fff',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  + Add to Database
                </button>
              </div>
              {addStatus && (
                <div style={{ color: addStatus.includes('Error') ? '#f43f5e' : '#4ade80', fontSize: '13px', fontWeight: 600 }}>
                  {addStatus}
                </div>
              )}
            </form>
          </div>

          {/* Filter Bar & Header */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800 }}>Sassy Fortunes Inventory ({messages.length})</h2>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Source: {catalogSource || 'Prisma / In-Memory'}</p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Search messages..."
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchCatalog()}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  fontSize: '13px',
                  minWidth: '200px',
                }}
              />
              <div style={{ display: 'flex', gap: '6px' }}>
                {['ALL', 'MILD', 'SPICY', 'SAVAGE'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setCatalogIntensity(lvl)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: catalogIntensity === lvl ? '1px solid #ec4899' : '1px solid var(--border-color)',
                      background: catalogIntensity === lvl ? 'rgba(236, 72, 153, 0.2)' : 'var(--bg-card)',
                      color: catalogIntensity === lvl ? '#f472b6' : 'var(--text-secondary)',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Message Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {catalogLoading ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                Loading catalog...
              </div>
            ) : messages.length === 0 ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                No sassy messages matched your filter.
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={msg.id || idx}
                  style={{
                    background: 'var(--bg-card)',
                    borderRadius: '16px',
                    padding: '20px',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <p style={{ fontSize: '15px', fontWeight: 600, color: '#f8fafc', lineHeight: 1.5, marginBottom: '16px' }}>
                    "{msg.text}"
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontWeight: 800,
                        background:
                          msg.intensity === 'SAVAGE'
                            ? 'rgba(244, 63, 94, 0.15)'
                            : msg.intensity === 'SPICY'
                            ? 'rgba(236, 72, 153, 0.15)'
                            : 'rgba(56, 189, 248, 0.15)',
                        color:
                          msg.intensity === 'SAVAGE'
                            ? '#f43f5e'
                            : msg.intensity === 'SPICY'
                            ? '#ec4899'
                            : '#38bdf8',
                      }}
                    >
                      {msg.intensity}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                      📂 {msg.category || 'GENERAL'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: LIVE API TESTER & 8-BALL */}
      {activeTab === 'tester' && (
        <div
          style={{
            background: 'var(--bg-card)',
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            padding: '36px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>
                INTENSITY FILTER
              </label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                {(['ALL', 'MILD', 'SPICY', 'SAVAGE'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setIntensity(lvl)}
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: intensity === lvl ? '1px solid #ec4899' : '1px solid var(--border-color)',
                      background: intensity === lvl ? 'rgba(236, 72, 153, 0.2)' : 'rgba(255,255,255,0.03)',
                      color: intensity === lvl ? '#f472b6' : 'var(--text-secondary)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>
                CLIENT USER SEED
              </label>
              <input
                type="text"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  marginBottom: '20px',
                }}
              />

              <button
                onClick={fetchFortune}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '15px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 8px 24px rgba(236, 72, 153, 0.35)',
                }}
              >
                {loading ? '🔮 Consulting the stars...' : '🎲 Draw Sassy Fortune'}
              </button>
            </div>

            <div
              style={{
                background: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #09090b 100%)',
                borderRadius: '16px',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                minHeight: '220px',
              }}
            >
              <p style={{ fontSize: '20px', fontWeight: 800, color: '#fff', lineHeight: 1.4, marginBottom: '16px' }}>
                "{fortune}"
              </p>
              {metadata && (
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', gap: '12px', fontFamily: 'monospace' }}>
                  <span>🔥 {metadata.intensity}</span>
                  <span>📂 {metadata.category}</span>
                  <span>📦 {metadata.isFromDatabase ? 'PostgreSQL' : 'In-Memory'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ENDPOINTS & DOCUMENTATION */}
      {activeTab === 'docs' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ background: '#10b981', color: '#000', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>
                GET
              </span>
              <code style={{ color: '#fff', fontSize: '14px' }}>/api/fortune</code>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '12px' }}>
              Retrieves a seeded or random sassy fortune.
            </p>
            <pre style={{ background: '#090a0f', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#38bdf8', overflowX: 'auto' }}>
              GET /api/fortune?seed=seed_usr_123&intensity=SAVAGE
            </pre>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ background: '#3b82f6', color: '#fff', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>
                GET / POST
              </span>
              <code style={{ color: '#fff', fontSize: '14px' }}>/api/messages</code>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '12px' }}>
              List and add new sassy fortunes to PostgreSQL.
            </p>
            <pre style={{ background: '#090a0f', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#38bdf8', overflowX: 'auto' }}>
              POST /api/messages
              {'\n'}{JSON.stringify({ text: "Don't count on it bestie.", intensity: "SAVAGE" }, null, 2)}
            </pre>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ background: '#8b5cf6', color: '#fff', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>
                HEALTH
              </span>
              <code style={{ color: '#fff', fontSize: '14px' }}>/api/health</code>
            </div>
            <pre style={{ background: '#090a0f', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#4ade80', overflowX: 'auto' }}>
              {health ? JSON.stringify(health, null, 2) : 'Loading status...'}
            </pre>
          </div>
        </div>
      )}
    </main>
  );
}
