import type { Metadata } from "next";
import "./globals.css";
import '98.css'
import Footer from "@/app/widgets/footer/footer";

export const metadata: Metadata = {
  title: "Обработка Контуров",
  description: "Задай свои параметры и ЖЕСТКО обработай свое изображение и получи КОНТУРЫ!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en">
      <body>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
