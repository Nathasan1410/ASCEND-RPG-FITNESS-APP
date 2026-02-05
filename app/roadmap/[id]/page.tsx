import { FeatureDetail } from "@/components/roadmap/FeatureDetail";

export default function FeatureDetailPage({ params }: { params: { id: string } }) {
  return <FeatureDetail featureId={params.id} />;
}
