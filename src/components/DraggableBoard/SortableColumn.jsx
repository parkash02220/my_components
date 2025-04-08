import React, { useMemo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Box from '@mui/material/Box';

const SortableColumn = ({ children, id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = useMemo(() => ({
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    position: 'relative',
  }), [transform, transition, isDragging]);

  return (
    <div ref={setNodeRef} style={style}>
      {/* Drag handle icon */}
      <Box
        {...attributes}
        {...listeners}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          cursor: 'grab',
          zIndex: 10,
          color: '#999',
        }}
      >
        <DragIndicatorIcon />
      </Box>

      {children}
    </div>
  );
};

export default SortableColumn;
