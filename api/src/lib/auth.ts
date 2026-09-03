import { betterAuth } from "better-auth";

const allowedEmails = (process.env.ALLOWED_ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

export const auth = betterAuth({
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 7 * 24 * 60 * 60, // 7 days
            strategy: "jwt",
            refreshCache: true,
        },
    },
    account: {
        storeStateStrategy: "cookie",
        storeAccountCookie: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            mapProfileToUser: async (profile) => {
                const email = profile.email?.toLowerCase();

                if (!email || !allowedEmails.includes(email)) {
                    throw new Error("Unauthorized: Your email is not in the admin whitelist.");
                }

                return {
                    email,
                    name: profile.name,
                    image: profile.picture,
                    emailVerified: true,
                };
            },
        },
    },
});