'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/login');
                    router.refresh();
                },
            },
        });
    };

    return (
        <button
            onClick={handleLogout}
            style={{
                padding: '8px 16px',
                borderRadius: '8px',
                background: '#f43f5e',
                color: '#fff',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
            }}
        >
            Sign Out
        </button>
    );
}