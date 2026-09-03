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
                callbackURL: '/',
            });
            if (res?.error) {
                setError(res.error.message || 'Authentication failed');
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '70vh',
                gap: '16px',
            }}
        >
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>Administrator Access Only</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', textAlign: 'center' }}>
                Sign in with an authorized Google account
            </p>

            <button
                onClick={handleLogin}
                disabled={loading}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    background: '#fff',
                    color: '#000',
                    fontWeight: 700,
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                    transition: 'all 0.2s ease',
                }}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
                        fill="#4285F4"
                    />
                    <path
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
                        fill="#34A853"
                    />
                    <path
                        d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.09z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.09c.95-2.85 3.6-4.96 6.72-4.96z"
                        fill="#EA4335"
                    />
                </svg>
                {loading ? 'Redirecting to Google...' : 'Sign in with Google'}
            </button>

            {error && (
                <div style={{ color: '#f43f5e', fontSize: '13px', maxWidth: '320px', textAlign: 'center' }}>
                    {error}
                </div>
            )}
        </div>
    );
}