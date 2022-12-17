import type { Task, TaskEditDTO } from "./types";

export const getUniqId = (): string => {
  const num = Math.ceil(Math.random() * 1000000);
  return `${num}`;
};

export const getUniqColor = (): string => {
  return `#49C4E5`;
};

export const updateTask = (task: Task, data: TaskEditDTO): Task => {
  let subtasks = task.subtasks;

  if (data.subtasks) {
    subtasks = (data.subtasks || []).map((subtask) => {
      let currentSubtask;
      if (subtask.id) {
        currentSubtask = task.subtasks.find((el) => el.id === subtask.id);
      }

      if (currentSubtask) {
        return {
          ...currentSubtask,
          isCompleted:
            typeof subtask.isCompleted !== "undefined"
              ? subtask.isCompleted
              : currentSubtask.isCompleted,
          title: subtask.label || currentSubtask.title,
        };
      } else {
        return {
          id: getUniqId(),
          title: subtask.label || "",
          isCompleted: false,
        };
      }
    });
  }

  return {
    ...task,
    status: data.status || task.status,
    title: data.title || task.title,
    description: data.description || task.description,
    subtasks,
  };
};
