import Footer from "@/components/template-1/footer";
import Navbar from "@/components/template-1/Navbar";
import { Quicksand } from "next/font/google";

const quickSand = Quicksand({
  variable: "--font-quick-sand",
  subsets: ["latin"],
});

export default function temp1RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className={`${quickSand.variable} font-quicksand`}>{children}</main>
      <Footer />
    </>
  );
}
