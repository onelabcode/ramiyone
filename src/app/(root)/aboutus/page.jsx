import { User, Video, Globe } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col items-center mt-20 px-6 pb-12">
      {/* About Us Section */}
      <div className="text-center mb-14 max-w-4xl mx-auto">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">About Us</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Ramiyones Digital Scouting is a cutting-edge platform designed to
          revolutionize the way football players connect with scouts. Our
          mission is to give talented players the opportunity to showcase their
          skills through detailed video profiles.
        </p>
      </div>

      {/* Key Features */}
      <AboutContent />
    </div>
  );
};

export function AboutContent() {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6 xl:max-h-[34rem]">
      <GridItem
        icon={<Video className="h-6 w-6 text-black dark:text-neutral-400" />}
        title="Player Profiles"
        description="Players can create profiles that include essential information such as personal stats (birthdate, height, weight), skill videos, and more. Scouts can then easily access this information, streamlining the scouting process and making talent discovery more efficient."
      />
      <GridItem
        icon={<User className="h-6 w-6 text-black dark:text-neutral-400" />}
        title="Empowering Athletes"
        description="At Ramiyones Digital Scouting, we are committed to empowering players to take control of their careers, providing tools to highlight their potential while giving scouts access to a diverse pool of athletes worldwide."
      />
      <GridItem
        icon={<Globe className="h-6 w-6 text-black dark:text-neutral-400" />}
        title="Global Opportunities"
        description="Whether you’re an aspiring player or a dedicated scout, Ramiyones Digital Scouting is the bridge to your next big opportunity."
      />
    </ul>
  );
}

const GridItem = ({ icon, title, description }) => {
  return (
    <li className="min-h-[14rem] list-none">
      <div className="relative h-full rounded-2.5xl border p-4 md:rounded-3xl md:p-6">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-black dark:text-white">
                {title}
              </h3>
              <p className="text-sm text-black dark:text-neutral-400">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default AboutUs;
