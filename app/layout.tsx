import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import Modal from "./components/modals/Modal";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Modal
          title={"Modal Title"}
          isOpen
          // actionLabel={""}
          // onSubmit={() => {}}
          // onClose={() => {}}
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
