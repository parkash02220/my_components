import { Suspense } from "react";
import ProjectPageContent from "./ProjectPageContent";
import Loader from "@/components/Loader/Loader";


export default function ProjectPage({ params }) {
  return (
    <Suspense fallback={<Loader />}>
      <ProjectPageContent params={params} />
    </Suspense>
  );
}
