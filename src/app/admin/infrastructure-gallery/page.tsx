import GalleryManager from "@/components/admin/GalleryManager";

export default function AdminInfrastructureGalleryPage() {
  return (
    <GalleryManager
      endpoint="infrastructure-images"
      uploadFolder="infrastructure"
      title="Infrastructure Gallery"
      description="Manage the facility gallery shown on the infrastructure page. The first nine images by order appear before View All."
      formTitle="Facility Image"
      emptyMessage="No infrastructure gallery images yet."
    />
  );
}