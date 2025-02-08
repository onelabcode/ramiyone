import Image from "next/image";
import Link from "next/link";
import { fetchBrands } from "action/brand";
function SponsorItem({ sponsor }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Link
        href={sponsor.website}
        className="group relative flex items-center justify-center w-32 h-20 transition-opacity hover:opacity-80"
      >
        <Image
          src={sponsor.logo || "/placeholder.svg"}
          alt={`${sponsor.name} logo`}
          fill
          className="object-contain"
        />
      </Link>
      <span className="text-sm text-center text-gray-600">{sponsor.name}</span>
    </div>
  );
}

export async function BrandMarquee() {
  const brandsRes = await fetchBrands();
  const brands = brandsRes.success ? brandsRes.data : [];

  return (
    <section className="w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <div className="mx-auto max-w-6xl px-6 py-8">
            <p className="text-lg text-center text-muted-foreground mb-6">
              Our Trusted Sponsors
            </p>
          </div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />
          {
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12 pt-8">
              {brands.map((sponsor, i) => (
                <SponsorItem key={i} sponsor={sponsor} />
              ))}
            </div>
          }
        </div>
      </div>
    </section>
  );
}
