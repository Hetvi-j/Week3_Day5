import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "User Management System",
  description: "CRUD App using Next.js",
};

interface RootLayoutProp{
  children : ReactNode;
}

export default function RootLayout({ children }:RootLayoutProp) {
  return (
    <html lang="en">
      <body>

        <nav className="navbar">
          <h1>User Management System</h1>
        </nav>

        {children}

      </body>
    </html>
  );
}