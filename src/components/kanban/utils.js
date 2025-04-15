// utils/hasDraggableData.js
import { Active, Over } from '@dnd-kit/core';

/**
 * Checks if the provided entry (Active or Over) has valid draggable data.
 * Supports both Column and Task types.
 *
 * @param {Active | Over | null | undefined} entry
 * @returns {boolean}
 */
export function hasDraggableData(entry) {
  if (!entry || !entry.data || !entry.data.current) {
    return false;
  }

  const data = entry.data.current;

  return data?.type === 'Column' || data?.type === 'Task';
}
