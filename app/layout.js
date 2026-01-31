import './globals.css';

export const metadata = {
  title: 'BRAVO Mentor App',
  description: 'Digitaal inwerkprogramma voor chauffeurs',
  manifest: '/manifest.json',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
  themeColor: '#542e91',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'BRAVO Mentor',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <head>
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
