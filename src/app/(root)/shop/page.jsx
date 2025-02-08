"use client";

import { Card } from "@components/ui/card";
import { Timer, TrendingUp, Package, Truck } from "lucide-react";
import Image from "next/image";

export default function ShopComingSoon() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[60vh] bg-orange-600">
        <Image
          src="/football.jpg"
          alt="Football stadium"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">RAMIYONE Shop</h1>
          <p className="text-2xl mb-8">Coming Soon</p>
          <div className="w-16 h-1 bg-white"></div>
        </div>
      </section>
      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 bg-gray-50 border-gray-100 shadow-sm">
            <TrendingUp className="h-8 w-8 text-[#DB0007] mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Trending Styles
            </h3>
            <p className="text-gray-600">
              Updated weekly with the latest football fashion and gear
            </p>
          </Card>

          <Card className="p-6 bg-gray-50 border-gray-100 shadow-sm">
            <Package className="h-8 w-8 text-[#DB0007] mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Premium Quality
            </h3>
            <p className="text-gray-600">
              Guaranteed authentic merchandise and official licensed products
            </p>
          </Card>

          <Card className="p-6 bg-gray-50 border-gray-100 shadow-sm">
            <Truck className="h-8 w-8 text-[#DB0007] mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Fast Delivery
            </h3>
            <p className="text-gray-600">
              Quick and reliable shipping to get your gear to you
            </p>
          </Card>
        </div>
      </div>

      {/* Launch Timer Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Timer className="h-12 w-12 text-[#DB0007] mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Store Launch Coming Soon
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We&apos;re putting the finishing touches on your new favorite
            football store. Sign up above to be the first to know when we launch
            and get exclusive early access offers.
          </p>
        </div>
      </div>
    </div>
  );
}
