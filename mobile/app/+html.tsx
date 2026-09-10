// app/+html.tsx
import { ScrollViewStyleReset } from 'expo-router/html';

export default function Root({ children }: { children: React.ReactNode }) {
    const jsonLdData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebApplication',
                '@id': 'https://sassy-8ball.vercel.app/#webapp',
                name: 'Sassy Magic 8-Ball',
                url: 'https://sassy-8ball.vercel.app',
                description:
                    'An interactive, witty, and savage digital Magic 8-Ball that delivers hilarious fortunes with customizable sass levels (Mild, Spicy, Savage). Powered by deterministic entropy.',
                applicationCategory: 'EntertainmentApplication',
                operatingSystem: 'Web, iOS, Android',
                browserRequirements: 'Requires JavaScript. Works on all modern browsers.',
                offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                },
                creator: {
                    '@type': 'Organization',
                    name: 'Sassy 8-Ball Studio',
                },
            },
            {
                '@type': 'FAQPage',
                '@id': 'https://sassy-8ball.vercel.app/#faq',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What is the Sassy Magic 8-Ball?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'The Sassy Magic 8-Ball is a modern, comedic twist on the classic 1950s fortune-telling toy. Instead of generic answers, it delivers witty, sassy, and brutally honest responses tailored to your chosen sass intensity (Mild, Spicy, or Savage).',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'How do the different sass levels work?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Mild offers warm, gentle, and encouraging vibes. Spicy delivers sharp wit and playful sarcasm. Savage unleashes unfiltered roasts, reality checks, and hilarious burns.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'How do I ask the 8-ball a question on web vs mobile?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'On mobile devices, you can physically shake your phone or swipe the 3D ball. On desktop web, you can click and drag to spin the ball or press the Shake button.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Are the fortunes truly random?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Yes. Each user receives a unique cryptographic seed that drives a deterministic Mulberry32 pseudorandom generator combined with serverless entropy, ensuring fair, non-repeating results.',
                        },
                    },
                ],
            },
        ],
    };

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover" />

                {/* Primary SEO Meta Tags */}
                <title>Sassy Magic 8-Ball | Online Oracle, Savage Fortunes & Daily Answers</title>
                <meta
                    name="description"
                    content="Ask the Sassy Magic 8-Ball your deepest life questions and receive hilarious, witty, and savage fortunes. Choose between Mild, Spicy, and Savage modes. Free online oracle."
                />
                <meta
                    name="keywords"
                    content="magic 8-ball, sassy eight ball, magic eight ball online, funny fortune teller, oracle, decision maker, savage 8 ball, yes or no oracle, funny advice"
                />
                <meta name="author" content="Sassy 8-Ball" />
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="theme-color" content="#0a0b10" />
                <link rel="canonical" href="https://sassy-8ball.vercel.app/" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://sassy-8ball.vercel.app/" />
                <meta property="og:site_name" content="Sassy Magic 8-Ball" />
                <meta property="og:title" content="Sassy Magic 8-Ball | Online Oracle, Savage Fortunes & Daily Answers" />
                <meta
                    property="og:description"
                    content="Ask the Sassy Magic 8-Ball your deepest life questions and receive hilarious, witty, and savage fortunes. Choose Mild, Spicy, or Savage."
                />
                <meta property="og:image" content="https://sassy-8ball.vercel.app/assets/icon.png" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content="https://sassy-8ball.vercel.app/" />
                <meta name="twitter:title" content="Sassy Magic 8-Ball | Online Oracle & Savage Answers" />
                <meta
                    name="twitter:description"
                    content="Ask the Sassy Magic 8-Ball your deepest life questions and receive hilarious, witty, and savage fortunes."
                />
                <meta name="twitter:image" content="https://sassy-8ball.vercel.app/assets/icon.png" />

                {/* Google AdSense Verification & Auto-Ads */}
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1519113587025254"
                    crossOrigin="anonymous"
                />

                {/* Schema.org Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
                />

                <ScrollViewStyleReset />

                {/* Web-specific styling for smooth natural scrolling and SEO readability */}
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
              html, body {
                background-color: #0a0b10;
                color: #f8fafc;
                min-height: 100%;
                overflow-x: hidden;
                overflow-y: auto !important;
                -webkit-overflow-scrolling: touch;
              }
              #root {
                min-height: 100%;
                display: flex;
                flex-direction: column;
              }
              a {
                color: #ec4899;
                text-decoration: none;
                transition: color 0.2s ease;
              }
              a:hover {
                color: #f472b6;
                text-decoration: underline;
              }
              ::selection {
                background: rgba(236, 72, 153, 0.3);
                color: #fff;
              }
              @media (max-width: 680px) {
                .web-desktop-nav {
                  display: none !important;
                }
                .web-mobile-toggle {
                  display: flex !important;
                }
              }
              @media (min-width: 681px) {
                .web-desktop-nav {
                  display: flex !important;
                }
                .web-mobile-toggle {
                  display: none !important;
                }
                .web-mobile-dropdown {
                  display: none !important;
                }
              }
            `,
                    }}
                />
            </head>
            <body>{children}</body>
        </html>
    );
}