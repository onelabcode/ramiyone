import RootLayout from "./layout.client";
import ServerLayout from "./layout.server";

import { BASE_URL } from "@/lib/env";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "RamiyOne",
    template: "%s | RamiyOne",
  },
  description:
    "RamiyOne scouting is a Digital scouting platform for talented individuals. Discover your potential and connect with like-minded individuals.",
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: "/ramiyone.png",
  },
};

export default function CombinedLayout({ children }) {
  return (
    <ServerLayout>
      <RootLayout>{children}</RootLayout>
    </ServerLayout>
  );
}
