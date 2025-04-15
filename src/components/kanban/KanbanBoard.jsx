"use client";

import { throttle } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  DragOverlay,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

import { coordinateGetter } from "./multipleContainersKeyboardPreset";
import { hasDraggableData } from "./utils";
import { BoardColumn } from "./BoardColumn";
import { TaskCard } from "./TaskCard";
import useGetProject from "@/hooks/projects/useGetProject";
import useMoveTask from "@/hooks/projects/task/useMoveTask";

const defaultCols = [
  { id: "todo", title: "Todo" },
  { id: "in-progress", title: "In progress" },
  { id: "done", title: "Done" },
];

const initialTasks = [
  { id: "task1", columnId: "done", content: "Project initiation and planning" },
  {
    id: "task2",
    columnId: "done",
    content: "Gather requirements from stakeholders",
  },
  { id: "task3", columnId: "done", content: "Create wireframes and mockups" },
  { id: "task4", columnId: "in-progress", content: "Develop homepage layout" },
  {
    id: "task5",
    columnId: "in-progress",
    content: "Design color scheme and typography",
  },
  { id: "task6", columnId: "todo", content: "Implement user authentication" },
  { id: "task7", columnId: "todo", content: "Build contact us page" },
  { id: "task8", columnId: "todo", content: "Create product catalog" },
  { id: "task9", columnId: "todo", content: "Develop about us page" },
  {
    id: "task10",
    columnId: "todo",
    content: "Optimize website for mobile devices",
  },
  { id: "task11", columnId: "todo", content: "Integrate payment gateway" },
  { id: "task12", columnId: "todo", content: "Perform testing and bug fixing" },
  {
    id: "task13",
    columnId: "todo",
    content: "Launch website and deploy to server",
  },
];

export default function KanbanBoard({ boardId }) {
  const { loadingGetProject, getProjectById, projectData } =
    useGetProject(boardId);
  const { loadingMoveTask, moveTask } = useMoveTask();
  const throttledSetTasks = useRef(
    throttle((updateFn) => {
      setTasks(updateFn);
    }, 100)
  ).current;

  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!projectData) return;

    const sortedSections = [...(projectData?.sections || [])].sort(
      (a, b) => a?.position - b?.position
    );

    // Convert to columns and tasks format
    const columnData = sortedSections?.map((section) => ({
      id: section?.id,
      title: section?.name,
    }));

    const taskData = sortedSections?.flatMap((section) =>
      (section?.tasks || []).map((task) => ({
        id: task?.id,
        content: task?.title,
        columnId: section?.id,
      }))
    );

    setColumns(columnData);
    setTasks(taskData);
  }, [projectData]);
  const [activeTask, setActiveTask] = useState(null);
  const [activeColumn, setActiveColumn] = useState(null);
  const pickedUpTaskColumn = useRef(null);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter })
  );

  const onDragStart = (event) => {
    const data = event.active?.data?.current;
    if (!hasDraggableData(event.active)) return;

    if (data?.type === "Column") {
      setActiveColumn(data.column);
    }

    if (data?.type === "Task") {
      pickedUpTaskColumn.current = data.task.columnId;
      setActiveTask(data.task);
    }
  };

  const onDragEnd = (event) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over || !hasDraggableData(active)) return;

    const activeId = active.id;
    const overId = over.id;

    const activeData = active.data.current;

    if (activeData.type === "Column") {
      setColumns((columns) => {
        const fromIndex = columns.findIndex((c) => c.id === activeId);
        const toIndex = columns.findIndex((c) => c.id === overId);
        if (fromIndex === -1 || toIndex === -1) return columns;
        return arrayMove(columns, fromIndex, toIndex);
      });
      return;
    }

    if (activeData.type === "Task") {
      setTasks((tasks) => {
        const fromIndex = tasks.findIndex((t) => t.id === activeId);
        const activeTask = tasks[fromIndex];
        if (!activeTask) return tasks;

        const overData = over?.data?.current;
        const isOverAColumn = overData?.type === "Column";
        const isOverATask = overData?.type === "Task";

        // Dropped into empty column or on column
        if (isOverAColumn) {
          const overColumnId = overId;

          if (activeTask.columnId === overColumnId) return tasks;

          const updatedTask = { ...activeTask, columnId: overColumnId };

          // Remove from old column and add to beginning of new column
          const filteredTasks = tasks.filter((task) => task.id !== activeId);
          const insertIndex = tasks.findIndex(
            (task) => task.columnId === overColumnId
          );

          const newTasks = [
            ...filteredTasks.slice(0, insertIndex),
            updatedTask,
            ...filteredTasks.slice(insertIndex),
          ];

          moveTask(activeId, overColumnId, 0);
          return newTasks;
        }

        // Dropped on another task
        if (isOverATask) {
          const toIndex = tasks.findIndex((t) => t.id === overId);
          const overTask = tasks[toIndex];
          if (!overTask) return tasks;

          const updatedTask = {
            ...activeTask,
            columnId: overTask.columnId,
          };

          const sameColumn = activeTask.columnId === overTask.columnId;
          const filteredTasks = tasks.filter((task) => task.id !== activeId);

          const insertIndex = toIndex;

          const newTasks = [
            ...filteredTasks.slice(0, insertIndex),
            updatedTask,
            ...filteredTasks.slice(insertIndex),
          ];

          const droppedColumn = newTasks?.filter(
            (task) => task?.columnId === updatedTask?.columnId
          );
          const newPosition = droppedColumn.findIndex(
            (task) => task?.id === updatedTask?.id
          );

          moveTask(activeId, updatedTask.columnId, newPosition + 1);
          return newTasks;
        }

        return tasks;
      });
    }

    pickedUpTaskColumn.current = null;
  };

  const onDragOver = (event) => {
    const { active, over } = event;
    if (!over || !hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (activeData?.type !== "Task") return;

    const isOverATask = overData?.type === "Task";
    const isOverAColumn = overData?.type === "Column";

    throttledSetTasks((tasks) => {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const activeTask = tasks[activeIndex];
      if (!activeTask) return tasks;

      let newTasks = [...tasks];

      if (isOverATask) {
        const overIndex = tasks.findIndex((t) => t.id === overId);
        const overTask = tasks[overIndex];
        if (!overTask) return tasks;

        if (
          activeTask.id === overTask.id &&
          activeTask.columnId === overTask.columnId
        ) {
          return tasks;
        }

        const updatedTask = {
          ...activeTask,
          columnId: overTask.columnId,
        };

        if (
          activeTask.columnId === updatedTask.columnId &&
          activeIndex === overIndex
        ) {
          return tasks;
        }

        newTasks[activeIndex] = updatedTask;
        return arrayMove(newTasks, activeIndex, overIndex - 1);
      }

      if (isOverAColumn) {
        if (activeTask.columnId !== overId) {
          const updatedTask = { ...activeTask, columnId: overId };
          newTasks[activeIndex] = updatedTask;
          return newTasks;
        }
      }

      return tasks;
    });
  };

  const tasksByColumn = useMemo(() => {
    const grouped = {};
    for (const task of tasks) {
      if (!grouped[task.columnId]) {
        grouped[task.columnId] = [];
      }
      grouped[task.columnId].push(task);
    }
    return grouped;
  }, [tasks]);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <div
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
          overflowX: "auto",
          height: "100%",
        }}
      >
        <SortableContext items={columnsId}>
          {columns.map((col) => (
            <BoardColumn
              key={col.id}
              column={col}
              tasks={tasksByColumn[col.id] || []}
              activeColumnId={activeColumn?.id}
            />
          ))}
        </SortableContext>
      </div>

      {typeof window !== "undefined" &&
        createPortal(
          <DragOverlay>
            {activeColumn && (
              <BoardColumn
                isOverlay
                column={activeColumn}
                tasks={tasksByColumn[activeColumn.id] || []}
              />
            )}
            {activeTask && <TaskCard task={activeTask} isOverlay />}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
}
