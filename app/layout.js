import './globals.css';

export const metadata = {
  title: 'BRAVO Mentor App',
  description: 'Digitaal inwerkprogramma voor chauffeurs',
  generator: 'Next.js',
  manifest: '/manifest.json',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
  themeColor: '#542e91',
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
