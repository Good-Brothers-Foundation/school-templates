import Footer from "@/components/template-1/footer";
import Navbar from "@/components/template-1/Navbar";

export default function temp1RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
