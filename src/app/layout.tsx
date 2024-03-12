import type {Metadata} from "next";

import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Punto de Venta",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] px-4">
        <header className="text-xl font-bold leading-[3rem]"> Punto de Venta
        <br></br>
        <Link
         className="text-center rounded-md w-20 h-10 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          href={"/"}> Inicio </Link>
       </header>
        
        <main className="py-8">{children}</main>
        <footer className="text-center leading-[3rem] opacity-70">
          ©  Altiora {new Date().getFullYear()}
        </footer> 
      </body>
    </html>
  );
}
