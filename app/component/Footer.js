'use client';

import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full max-w-screen-xl mx-auto bg-black text-white p-10 rounded-lg shadow-lg border border-gray-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
   
        <div className="space-x-3 space-y-5">
        <div className="flex items-center gap-3">
            <Image
              src="/ramiyone.png" 
              alt="RAMiYoNE Logo" 
              width={160} 
              height={48} 
              className="object"
            />
          </div>
          <p className="text-base text-gray-400">
          Your Talent, Our Platform.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Quick Links</h3>
          <ul className="space-y-3">
            <li><Link href="/" className="text-base text-gray-400 hover:text-white transition">Home</Link></li>
            <li><Link href="/aboutus" className="text-base text-gray-400 hover:text-white transition">About</Link></li>
            <li><Link href="/blogs" className="text-base text-gray-400 hover:text-white transition">Blog</Link></li>
            <li><Link href="/contactus" className="text-base text-gray-400 hover:text-white transition">Contact Us</Link></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Contact Us</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-white" />
              <span className="text-base text-gray-400">Addis abeba</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-white" />
              <span className="text-base text-gray-400">0984803187</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-white" />
              <span className="text-base text-gray-400">Ramiyonelab@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-600">
        <p className="text-center text-base text-gray-400">
          © 2025 RamiyOne. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
