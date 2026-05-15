import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "User Management System | TypeScript CRUD",
  description: "A typed user management dashboard with search, edit, delete, and validation.",
};

interface RootLayoutProp{
  children : ReactNode;
}

export default function RootLayout({ children }:RootLayoutProp) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <header className="navbar">
            <div className="navbar-brand">
    
              <h1>User Management System</h1>
            </div>
            
          </header>

          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
