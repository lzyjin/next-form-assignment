import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "짹짹",
  description: "짹짹 떠들자",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ko">
      <body className={`antialiased w-screen min-h-screen`}>
        <div className="min-h-screen h-full max-w-xl mx-auto overflow-hidden">
          <div className="w-full h-ful border-r border-neutral-200">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
