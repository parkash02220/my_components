import ProjectPageContent from "./ProjectPageContent";

export default async function ProjectPage({ params }) {
  const { id } = await params;

  return <ProjectPageContent id={id} />;
}
