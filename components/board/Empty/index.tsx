import EmptyDialog from "./EmptyDialog";

const Empty = ({ boardId }: { boardId: string }) => {
  return (
    <main className="container flex h-full items-center justify-center gap-4 p-4">
      <div className="flex flex-col items-center gap-8">
        <p className="text-gray4">
          This board is empty. Create a new column to get started.
        </p>
        <EmptyDialog boardId={boardId} />
      </div>
    </main>
  );
};

export default Empty;
