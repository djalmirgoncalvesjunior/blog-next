import { Metadata } from "next";
import "./globals.css";
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogFooter } from "@/components/blog/blog-footer";

export const metadata : Metadata = {
  title: "Title do Layout",
  description: "Aplicação de CRUD utilizando Next.js",
}

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={"antialiased flex flex-col min-h-svh"}
      > 
        <BlogHeader />
        {children}
        <BlogFooter />
      </body>
    </html>
  );
}
