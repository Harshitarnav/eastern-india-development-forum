import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CMSProvider } from "@/lib/cms-store";

export default function AdminConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CMSProvider>
      <DashboardShell>{children}</DashboardShell>
    </CMSProvider>
  );
}
