import NotFound from "@/app/not-found";
import Header from "@/components/Header";
import Column from "@/components/board/Column";
import Empty from "@/components/board/Empty";
import NewColumn from "@/components/board/NewColumn";
import { getBoardById } from "@/data/board";
import { getColumnsByBoardId } from "@/data/column";

const page = async ({ params }: { params: { board: string } }) => {
  const board = await getBoardById(params.board);
  if (!board) return <NotFound />;

  const columns = await getColumnsByBoardId(params.board);
  if (!columns) return <Empty boardId={params.board} />;

  return (
    <>
      <Header boardId={params.board} />
      <main className="scrollbar flex h-full w-screen snap-x snap-mandatory gap-6 p-12 pt-28 md:snap-none md:pt-32 lg:pt-36">
        {columns.map((column) => (
          <Column key={column.id} column={column} columns={columns} />
        ))}
        <NewColumn boardId={params.board} />
      </main>
    </>
  );
};

export default page;
