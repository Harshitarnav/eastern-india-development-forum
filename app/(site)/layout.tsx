import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { CMSProvider } from "@/lib/cms-store";
import { SiteContent } from "@/components/loading/SiteContent";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <CMSProvider>
      <Nav />
      <main className="flex flex-1 flex-col">
        <SiteContent>{children}</SiteContent>
      </main>
      <Footer />
    </CMSProvider>
  );
}
