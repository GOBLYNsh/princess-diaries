import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Princess Diaries - A Princess Day Surprise',
  description: 'A beautiful personalized Princess Day experience for the special girl who makes ordinary days feel magical.',
  keywords: 'princess, scrapbook, digital diary, photo album, celebration, surprise',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Dancing+Script:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-cream-50 text-warm-brown-800 min-h-screen">
        {children}
      </body>
    </html>
  );
}