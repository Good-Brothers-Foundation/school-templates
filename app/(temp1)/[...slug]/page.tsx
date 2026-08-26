import ComingSoon from "@/components/template-1/ComingSoon";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function CatchAllPage({ params }: PageProps) {
  const resolvedParams = await params;
  console.log("Catch-all route matched for:", resolvedParams.slug);

  return <ComingSoon />;
}
