import RootLayout from "./layout.client";
import ServerLayout from "./layout.server";

export default function CombinedLayout({ children }) {
  return (
    <ServerLayout>
      <RootLayout>{children}</RootLayout>
    </ServerLayout>
  );
}
