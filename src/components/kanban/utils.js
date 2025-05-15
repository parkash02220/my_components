
import { Active, Over } from '@dnd-kit/core';
import {
  closestCenter,
  pointerWithin,
  rectIntersection,
} from "@dnd-kit/core";
export function hasDraggableData(entry) {
  if (!entry || !entry.data || !entry.data.current) {
    return false;
  }

  const data = entry.data.current;

  return data?.type === 'Column' || data?.type === 'Task';
}

export const customCollisionDetection = (args) => {
  return  pointerWithin(args) || closestCenter(args)  || rectIntersection(args);
};