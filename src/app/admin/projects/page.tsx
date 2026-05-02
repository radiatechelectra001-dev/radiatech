import GalleryManager from "@/components/admin/GalleryManager";

export default function AdminProjectsPage() {
  return (
    <GalleryManager
      endpoint="project-images"
      uploadFolder="projects"
      title="Our Projects"
      description="Manage the project images shown on the homepage. The first six images by order appear before View All."
      formTitle="Project Image"
      emptyMessage="No project images yet."
    />
  );
}