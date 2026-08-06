import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { SiteContent } from "@/components/loading/SiteContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { CmsPublicProvider } from "@/lib/cms/public-provider";
import { buildOrganizationJsonLd } from "@/lib/cms/jsonld";
import { getPublicCmsBundle } from "@/lib/cms/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cms, orgJsonLd] = await Promise.all([
    getPublicCmsBundle(),
    buildOrganizationJsonLd(),
  ]);

  return (
    <CmsPublicProvider value={cms}>
      <JsonLd data={orgJsonLd} />
      <Nav />
      <main className="flex flex-1 flex-col">
        <SiteContent>{children}</SiteContent>
      </main>
      <Footer />
    </CmsPublicProvider>
  );
}
