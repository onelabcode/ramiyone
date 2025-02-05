'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export default function TermsAndConditions() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      {/* Hero Section with scaling effect */}
      <div 
        className={`sticky top-0 z-10 bg-[#fbfbfd] transition-all duration-300 ${
          scrolled ? 'py-4 shadow-sm' : 'py-20'
        }`}
      >
        <h1 
          className={`text-center transition-all duration-300 ${
            scrolled 
              ? 'text-2xl font-semibold' 
              : 'text-5xl sm:text-6xl font-bold'
          }`}
        >
          Terms and Conditions
        </h1>
      </div>

      <div className="max-w-[980px] mx-auto px-6 pb-20">
        <div className="max-w-[680px] mx-auto">
          {/* Introduction */}
          <p className="text-[19px] leading-[1.47059] text-[#1d1d1f] font-normal mb-12 text-center">
            Welcome to Digital Scouting. Please read these terms carefully before using our platform.
          </p>

          {/* Collapsible Sections */}
          <Accordion type="single" collapsible className="w-full space-y-6">
            <AccordionItem value="section-1" className="border-none">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center text-left">
                  <div>
                    <h2 className="text-xl font-semibold text-[#1d1d1f]">Public Access to Information</h2>
                    <p className="text-[15px] text-[#86868b] mt-1">Information visibility and accessibility</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-8">
                <ul className="list-none space-y-4 text-[17px] leading-[1.47059] text-[#1d1d1f]">
                  <li>All information provided by players, including name, videos, performance stats, physical attributes (e.g., height, weight), birthdate, and any other details, will be publicly visible on the platform.</li>
                  <li>By creating a profile, players acknowledge and agree that their information is accessible to anyone visiting the website, including scouts, coaches, and the general public.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="section-2" className="border-none">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center text-left">
                  <div>
                    <h2 className="text-xl font-semibold text-[#1d1d1f]">Transparency and Consent</h2>
                    <p className="text-[15px] text-[#86868b] mt-1">User agreements and responsibilities</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-8">
                <ul className="list-none space-y-4 text-[17px] leading-[1.47059] text-[#1d1d1f]">
                  <li>Players: By submitting information to the platform, you agree that it will be publicly displayed. This includes videos and any additional details provided during registration or profile updates.</li>
                  <li>Coaches and Scouts: By using the platform, you agree to use player information professionally and solely for scouting, coaching, or player development purposes.</li>
                  <li>All users are responsible for understanding and agreeing to these terms before interacting with the platform.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="section-3" className="border-none">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center text-left">
                  <div>
                    <h2 className="text-xl font-semibold text-[#1d1d1f]">Ownership of Content</h2>
                    <p className="text-[15px] text-[#86868b] mt-1">Content rights and platform usage</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-8">
                <ul className="list-none space-y-4 text-[17px] leading-[1.47059] text-[#1d1d1f]">
                  <li>Players retain ownership of all uploaded content, including videos and stats.</li>
                  <li>By uploading content, players grant Digital Scouting the right to display this content publicly for scouting, coaching, and promotional purposes.</li>
                  <li>The platform is not responsible for how third parties outside the platform may use publicly available information.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="section-4" className="border-none">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center text-left">
                  <div>
                    <h2 className="text-xl font-semibold text-[#1d1d1f]">Professional Conduct</h2>
                    <p className="text-[15px] text-[#86868b] mt-1">Expected behavior and consequences</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-8">
                <ul className="list-none space-y-4 text-[17px] leading-[1.47059] text-[#1d1d1f]">
                  <li>All users must act professionally and respectfully when using the platform.</li>
                  <li>Inappropriate behavior, misuse of information, or unprofessional communication will result in account suspension or permanent bans.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="section-5" className="border-none">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center text-left">
                  <div>
                    <h2 className="text-xl font-semibold text-[#1d1d1f]">Acknowledgment of Risks</h2>
                    <p className="text-[15px] text-[#86868b] mt-1">Understanding potential risks and liability</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-8">
                <ul className="list-none space-y-4 text-[17px] leading-[1.47059] text-[#1d1d1f]">
                  <li>Players acknowledge that by sharing their information publicly, it may be accessed and used by third parties outside the platform.</li>
                  <li>Digital Scouting is not liable for any misuse or unauthorized use of publicly available information by external parties.</li>
                  <li>By using the platform, you agree to assume this risk and waive any liability claims against Digital Scouting.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="section-6" className="border-none">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center text-left">
                  <div>
                    <h2 className="text-xl font-semibold text-[#1d1d1f]">Information Sharing</h2>
                    <p className="text-[15px] text-[#86868b] mt-1">Guidelines for sharing information</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-8">
                <ul className="list-none space-y-4 text-[17px] leading-[1.47059] text-[#1d1d1f]">
                  <li>The platform does not impose restrictions on the type of information players share publicly.</li>
                  <li>Players are responsible for ensuring that the information they provide is accurate and that they are comfortable with it being publicly accessible.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="section-7" className="border-none">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center text-left">
                  <div>
                    <h2 className="text-xl font-semibold text-[#1d1d1f]">Reporting and Accountability</h2>
                    <p className="text-[15px] text-[#86868b] mt-1">Issue reporting and resolution</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-8">
                <ul className="list-none space-y-4 text-[17px] leading-[1.47059] text-[#1d1d1f]">
                  <li>Players, coaches, scouts, and visitors can report any misuse or issues encountered on the platform.</li>
                  <li>Ramiyones will investigate and take appropriate actions, including suspending or banning offending accounts.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="section-8" className="border-none">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center text-left">
                  <div>
                    <h2 className="text-xl font-semibold text-[#1d1d1f]">Agreement to Terms</h2>
                    <p className="text-[15px] text-[#86868b] mt-1">Acceptance of terms and updates</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-8">
                <p className="text-[17px] leading-[1.47059] text-[#1d1d1f]">
                  By using the website, creating a profile, or accessing public content, all users acknowledge that they have read and agreed to these terms. These terms are subject to updates, and continued use of the platform signifies agreement to the latest version.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Footer */}
          <div className="text-[12px] text-[#86868b] mt-16 pt-8 border-t border-[#d2d2d7]">
            <div className="flex justify-between items-center">
              <p>© {new Date().getFullYear()} Digital Scouting. All rights reserved.</p>
              <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}