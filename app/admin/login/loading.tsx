import { GlobalLoader } from "@/components/loading/GlobalLoader";

export default function AdminLoginLoading() {
  return (
    <GlobalLoader
      visible
      message="Loading login…"
      tagline="Please wait a moment"
    />
  );
}
