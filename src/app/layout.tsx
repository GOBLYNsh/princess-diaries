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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Dancing+Script:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-ivory-100 text-cocoa-700 min-h-screen selection:bg-dusty-rose-200 selection:text-burgundy-900">
        {children}
      </body>
    </html>
  );
}