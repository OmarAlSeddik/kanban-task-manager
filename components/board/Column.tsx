import Task from "@/components/board/Task";
import { getTasksByColumnId } from "@/data/task";
import { Column } from "@prisma/client";
import EditColumn from "./EditColumn";

const ColumnComponent = async ({
  column,
  columns,
}: {
  column: Column | undefined;
  columns: Column[] | undefined;
}) => {
  const tasks = await getTasksByColumnId(column?.id as string);

  return (
    <div className="flex w-[17.5rem] shrink-0 snap-center flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="flex gap-4 uppercase text-gray4">
          <span>{column?.title}</span>
          <span>({tasks?.length})</span>
        </h2>
        <EditColumn column={column} />
      </div>
      <div className="flex flex-col gap-5">
        {tasks?.map((task: any) => (
          <Task key={task.id} task={task} columns={columns} />
        ))}
      </div>
    </div>
  );
};

export default ColumnComponent;
