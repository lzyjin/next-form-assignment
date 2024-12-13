import type { Metadata } from "next";
import "./globals.css";
import {Bounce, ToastContainer} from "react-toastify";

export const metadata: Metadata = {
  title: "짹짹",
  description: "짹짹 떠들자",
  icons: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐤</text></svg>",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ko">
      <body className={`antialiased w-screen min-h-screen bg-white text-[#171717] dark:bg-black dark:text-[#71767b]`}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <div className="min-h-screen h-full max-w-xl mx-auto overflow-hidden border-r border-neutral-200 dark:border-[#3c4043]">
          <div className="w-full h-ful">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
