import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { SiteContent } from "@/components/loading/SiteContent";
import { CmsPublicProvider } from "@/lib/cms/public-provider";
import { getPublicCmsBundle } from "@/lib/cms/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cms = await getPublicCmsBundle();

  return (
    <CmsPublicProvider value={cms}>
      <Nav />
      <main className="flex-1 flex flex-col">
        <SiteContent>{children}</SiteContent>
      </main>
      <Footer />
    </CmsPublicProvider>
  );
}
