import { MediaUploadForm } from "@/components/forms/media/media-upload-form";
import { AdminBreadcrumb } from "@/components/admin/admin-nav";

export default function MediaUploadPage() {
  return (
    <div>
      <AdminBreadcrumb items={[
        { title: "Media", href: "/admin/media" },
        { title: "Upload" }
      ]} />
      
      <MediaUploadForm />
    </div>
  );
}
