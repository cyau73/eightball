// app/login/page.tsx
'use client';

import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await authClient.signIn.social({
                provider: 'google',
                callbackURL: '/', // Redirect back to your dashboard page after successful auth
            });
            if (res.error) {
                setError(res.error.message || 'Authentication failed');
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '16px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>Admin Access Only</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Sign in with an authorized Google account to manage your sassy catalog.</p>

            <button
                onClick={handleLogin}
                disabled={loading}
                style={{
                    padding: '12px 24px',
                    borderRadius: '12px',
                    background: '#fff',
                    color: '#000',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                {loading ? 'Signing in...' : 'Sign in with Google'}
            </button>

            {error && (
                <div style={{ color: '#f43f5e', fontSize: '13px', maxWidth: '320px', textAlign: 'center' }}>
                    {error}
                </div>
            )}
        </div>
    );
}