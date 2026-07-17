import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./context/authContext";


export const metadata: Metadata = {
  title: "EMS Portal",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

    <html lang="en">

      <body>

        <AuthProvider>

          {children}

        </AuthProvider>


      </body>

    </html>

  );
}