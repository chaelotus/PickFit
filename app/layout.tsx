import AppHeader from "@/shared/ui/AppHeader";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppHeader title="안녕하세요, Lotus!" />
        {children}
      </body>
    </html>
  );
}
