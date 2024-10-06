import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const allRoundGothicSemi = localFont({
  src: './fonts/allroundgothic-semi.otf',
  variable: '--font-allroundgothic-semi',
  weight: '100 600',
});

const allRoundGothicThick = localFont({
  src: './fonts/allroundgothic-thick.otf',
  variable: '--font-allroundgothic-thick',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Coffiii',
  description: 'coffiii cafe.fm cafe ambiance',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/svg"
          sizes="32x32"
        />
      </head>
      <body
        className={`${allRoundGothicSemi.variable} ${allRoundGothicThick.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
