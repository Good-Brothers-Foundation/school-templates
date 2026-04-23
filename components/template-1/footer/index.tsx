"use client";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  PinterestLogoIcon,
} from "@phosphor-icons/react";
import Wrapper from "@/components/ui/Wrapper";
import Logo from "../Navbar/Logo";
import Image from "next/image";

export default function Footer() {
  const branches = [
    {
      name: "New York Branch",
      flag: "🇺🇸",
      address: "House 25, Road 10, New York, city 652, USA",
      phone: "+110 1819-987021",
      email: "info@example.com",
    },
    {
      name: "Canada Branch",
      flag: "🇨🇦",
      address: "House 25, Road 10, New York, city 652, USA",
      phone: "+110 1819-987021",
      email: "info@example.com",
    },
  ];

  return (
    <footer className="relative z-10 bg-[#FFF9EA] pt-20 font-quicksand overflow-hidden">
      <Wrapper>
        {/* --- Top Section: Logo and Branch Cards --- */}
        <div className="grid gap-10 lg:grid-cols-12 mb-16">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 text-[15px] leading-relaxed text-slate-600 max-w-xs">
              This school has provided a safe, caring, and joyful environment
              for my child. The teachers are very supportive and attentive.
            </p>
            <div className="mt-8 flex gap-3">
              {[FacebookLogoIcon, InstagramLogoIcon, PinterestLogoIcon].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-500 transition-all hover:bg-primary-template-1 hover:text-white hover:border-primary-template-1"
                  >
                    <Icon size={18} weight="fill" />
                  </a>
                ),
              )}
            </div>
          </div>

          <div className="lg:col-span-8 grid gap-6 md:grid-cols-2">
            {branches.map((branch, i) => (
              <div
                key={i}
                className="relative rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm transition-transform hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-slate-800">
                      {branch.name}
                    </h4>
                    <div className="h-0.5 w-10 bg-primatext-primary-template-1 mt-1" />
                  </div>
                  <span className="text-2xl">{branch.flag}</span>
                </div>
                <ul className="space-y-4 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <MapPin
                      size={18}
                      className="text-primary-template-1 shrink-0"
                    />
                    {branch.address}
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone
                      size={18}
                      className="text-primary-template-1 shrink-0"
                    />
                    {branch.phone}
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail
                      size={18}
                      className="text-primary-template-1 shrink-0"
                    />
                    {branch.email}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* --- Middle Section: Links Grid --- */}
        <div className="relative z-10 grid gap-10 border-t border-dashed border-slate-300 pt-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-list">
              {["Our Program", "Our Blogs", "FAQ'S", "Contact Us"].map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="footer-heading">Our Activities</h4>
            <ul className="footer-list">
              {[
                "Art Program",
                "Singing & Dance",
                "Poems Acting",
                "Annual Sports",
              ].map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="footer-heading">Our Categories</h4>
            <ul className="footer-list">
              {[
                "Our Teachers",
                "Our Students",
                "Our School",
                "Education Curricullam",
              ].map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="footer-heading">School Info</h4>
            <ul className="footer-list">
              {[
                "Parents Support",
                "Teacher's List",
                "Privacy Policy",
                "More About Us",
              ].map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Wrapper>

      {/* --- Bottom Section: Wave Image and Copyright --- */}
      <div className="relative mt-20 w-full">
        <div className="relative h-25 w-full ">
          <Image
            src="/template-1/footer/bottom-line.png"
            alt="Wave background"
            fill
            className="object-cover object-top"
          />
        </div>

        <div className="absolute inset-x-0 bottom-6 text-center text-sm font-medium text-slate-600">
          Copyright © CS Global Primary School All Rights Reserved.
        </div>
      </div>

      {/* shapes */}
      <Wrapper className="relative h-0 min-w-full border-2 z-9">
        <div className="absolute -left-5 bottom-20 block animate-upside-down w-fit">
          <Image
            alt="bee-shape"
            src={"/template-1/footer/bear.png"}
            width={180}
            height={80}
            className="opacity-50"
          />
        </div>
        <div className="absolute left-[102%] -translate-x-full bottom-30 animate-upside-down w-fit">
          <Image
            alt="bee-shape"
            src={"/template-1/footer/bag.png"}
            width={250}
            height={80}
            className="opacity-50"
          />
        </div>
      </Wrapper>

      <style jsx>{`
        .footer-heading {
          font-weight: 800;
          color: #3d5667;
          margin-bottom: 1.5rem;
          position: relative;
        }
        .footer-heading::before {
          content: "";
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 25px;
          height: 2px;
          background-color: #fb923c;
        }
        .footer-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: #64748b;
        }
        .footer-list li a:hover {
          color: #fb923c;
          transition: color 0.2s;
        }
      `}</style>
    </footer>
  );
}
