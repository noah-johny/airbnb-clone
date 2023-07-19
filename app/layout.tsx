import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import MyModal from "./components/modals/MyModal";

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
        <MyModal
          title={"Modal Title"}
          isOpen
          primaryActionLabel={"Submit"}
          secondaryActionLabel={"Previous"}
          // onSubmit={() => {}}
          // onClose={onClose}
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
