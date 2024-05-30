import Task from "./Task";

const Column = ({ column }: { column: any }) => {
  return (
    <div className="flex w-[17.5rem] shrink-0 snap-center flex-col gap-6">
      <h2 className="flex gap-4 uppercase text-gray4">
        <span>{column.title}</span>
        <span>({column.tasks.length})</span>
      </h2>
      <div className="flex flex-col gap-5">
        {column.tasks.map((task: any) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
