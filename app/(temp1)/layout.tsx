import Footer from "@/components/template-1/footer";
import Navbar from "@/components/template-1/Navbar";
import { Quicksand } from "next/font/google";
import { FormProvider } from "@/components/template-1/context/FormContext";
import PopupForm from "@/components/template-1/PopupForm";

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
    <FormProvider>
      <Navbar />
      <main className={`${quickSand.variable} font-quicksand`}>{children}</main>
      <Footer />
      <PopupForm />
    </FormProvider>
  );
}

