import "./globals.css";

export const metadata = {
  title: "Aghiles Kebaili - Portfolio",
  description: "Machine Learning Research Engineer in Medical Imaging",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}