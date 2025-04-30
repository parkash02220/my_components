import KanbanBoardWrapper from "@/components/kanban/KanbanBoardWrapper";
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function ProjectPageContent({ params }) {
  const id = params.id;
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  const res = await ApiCall({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/get-board-with-details/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.error || !res.data?.board) {
    notFound();
  }

  const formattedProject = convertIdFields(res.data.board);

  return (
    <KanbanBoardWrapper
      boardId={id}
      currentProject={formattedProject}
    />
  );
}
