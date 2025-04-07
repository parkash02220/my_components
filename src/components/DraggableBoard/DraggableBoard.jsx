"use client";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  useDroppable,
} from "@dnd-kit/core";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import { GripVertical } from "lucide-react";

const initialColumns = [
  {
    id: "todo",
    title: "Todo",
    cards: [
      {
        id: "card-1",
        name: "Task 1",
        time: "10:00 AM",
        description: "Fix login bug",
        image: "https://via.placeholder.com/40",
      },
      {
        id: "card-2",
        name: "Task 2",
        time: "11:00 AM",
        description: "Update docs",
        image: "https://via.placeholder.com/40",
      },
      {
        id: "card-5",
        name: "Task 5",
        time: "1:00 PM",
        description: "Design homepage",
        image: "https://via.placeholder.com/40",
      },
      {
        id: "card-6",
        name: "Task 6",
        time: "2:00 PM",
        description: "Test auth flow",
        image: "https://via.placeholder.com/40",
      },
      {
        id: "card-7",
        name: "Task 7",
        time: "3:00 PM",
        description: "Write unit tests",
        image: "https://via.placeholder.com/40",
      },
      {
        id: "card-8",
        name: "Task 8",
        time: "4:00 PM",
        description: "Set up CI/CD",
        image: "https://via.placeholder.com/40",
      },
    ],
  },
  {
    id: "ongoing",
    title: "Ongoing",
    cards: [
      {
        id: "card-3",
        name: "Task 3",
        time: "12:00 PM",
        description: "Build dashboard",
        image: "https://via.placeholder.com/40",
      },
      {
        id: "card-9",
        name: "Task 9",
        time: "1:30 PM",
        description: "Integrate API",
        image: "https://via.placeholder.com/40",
      },
      {
        id: "card-10",
        name: "Task 10",
        time: "2:30 PM",
        description: "Fix UI bugs",
        image: "https://via.placeholder.com/40",
      },
      {
        id: "card-11",
        name: "Task 11",
        time: "3:30 PM",
        description: "Polish animations",
        image: "https://via.placeholder.com/40",
      },
    ],
  },
  {
    id: "testing",
    title: "Testing",
    cards: [
      {
        id: "card-12",
        name: "Task 12",
        time: "9:00 AM",
        description: "Test login",
        image: "https://via.placeholder.com/40",
      },
      {
        id: "card-13",
        name: "Task 13",
        time: "10:00 AM",
        description: "Cross-browser test",
        image: "https://via.placeholder.com/40",
      },
      {
        id: "card-14",
        name: "Task 14",
        time: "11:00 AM",
        description: "Mobile responsiveness",
        image: "https://via.placeholder.com/40",
      },
      {
        id: "card-15",
        name: "Task 15",
        time: "12:00 PM",
        description: "Test payments",
        image: "https://via.placeholder.com/40",
      },
      {
        id: "card-16",
        name: "Task 16",
        time: "1:00 PM",
        description: "Test performance",
        image: "https://via.placeholder.com/40",
      },
      {
        id: "card-17",
        name: "Task 17",
        time: "2:00 PM",
        description: "Bug regression",
        image: "https://via.placeholder.com/40",
      },
      {
        id: "card-18",
        name: "Task 18",
        time: "3:00 PM",
        description: "UI/UX feedback",
        image: "https://via.placeholder.com/40",
      },
      {
        id: "card-19",
        name: "Task 19",
        time: "4:00 PM",
        description: "Final approval testing",
        image: "https://via.placeholder.com/40",
      },
    ],
  },
  {
    id: "completed",
    title: "Completed",
    cards: [
      {
        id: "card-4",
        name: "Task 4",
        time: "9:00 AM",
        description: "Deploy app",
        image: "https://via.placeholder.com/40",
      },
    ],
  },
];

function DraggableColumn({ column, listeners, overCardId, activeCard }) {
  const { setNodeRef } = useDroppable({ id: column.id });
  const activeCardId = activeCard?.id || "";
  const showShadow =
    activeCardId && column.cards.find((c) => c.id === overCardId);
  const shadowIndex = column.cards.findIndex((c) => c.id === overCardId);
  const cardsWithShadow = [...column.cards];

  if (showShadow && shadowIndex >= 0) {
    cardsWithShadow.splice(shadowIndex, 0, { id: "shadow-placeholder" });
  }

  return (
    <motion.div layout>
      <Paper
        ref={setNodeRef}
        elevation={3}
        sx={{ minWidth: 336, p: 2, borderRadius: 4 }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">{column.title}</Typography>
          <IconButton {...listeners}>
            <GripVertical />
          </IconButton>
        </Box>

        <AnimatePresence>
          {cardsWithShadow.map((card) => {
            if (card.id === "shadow-placeholder") {
              return (
                <motion.div
                  key="shadow-placeholder"
                  initial={{ opacity: 0.5, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  style={{ width: 336, marginBottom: 8 }}
                >
                  <Card sx={{ borderRadius: 3, opacity: 0.5 }}>
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar src={activeCard?.image} />
                        <Box>
                          <Typography variant="subtitle1">
                            {activeCard?.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {activeCard?.time}
                          </Typography>
                          <Typography variant="body2">
                            {activeCard?.description}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            }

            if (card.id === activeCardId) {
              return null;
            }

            return (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <DraggableCard card={card} activeCardId={activeCardId} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </Paper>
    </motion.div>
  );
}

function DraggableCard({ card, activeCardId }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: 8,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar src={card.image} />
            <Box>
              <Typography variant="subtitle1">{card.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {card.time}
              </Typography>
              <Typography variant="body2">{card.description}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default function DraggableBoard() {
  const [columns, setColumns] = useState(initialColumns);
  const [activeCard, setActiveCard] = useState(null);
  const columnIds = columns.map((col) => col.id);
  const [overCardId, setOverCardId] = useState(null);
  const allCardIds = columns.flatMap((col) => col.cards.map((c) => c.id));

  const handleDragStart = (event) => {
    const { active } = event;
    const dragged = columns
      .flatMap((col) => col.cards)
      .find((card) => card.id === active.id);
    if (dragged) {
      setActiveCard(dragged);
    }
  };

  const handleDragOver = (event) => {
    const { over } = event;
    if (over) setOverCardId(over.id);
  };

  const handleDragEnd = (event) => {
    setActiveCard(null);
    setOverCardId(null);
    const { active, over } = event;
    if (!over) return;

    if (columnIds.includes(active.id) && columnIds.includes(over.id)) {
      const oldIndex = columnIds.indexOf(active.id);
      const newIndex = columnIds.indexOf(over.id);
      setColumns((prev) => arrayMove(prev, oldIndex, newIndex));
      return;
    }
    let sourceCol, targetCol;

    columns.forEach((col) => {
      if (col.cards.find((c) => c.id === active.id)) sourceCol = col;
      if (col.cards.find((c) => c.id === over.id)) targetCol = col;
    });

    if (!targetCol) {
      targetCol = columns.find((col) => col.id === over.id);
    }

    if (!sourceCol || !targetCol) return;

    const sourceIndex = sourceCol.cards.findIndex((c) => c.id === active.id);
    let targetIndex = targetCol.cards.findIndex((c) => c.id === over.id);

    if (sourceCol.id === targetCol.id) {
        if (sourceIndex < targetIndex) {
            targetIndex -= 1;
          }
        
      const newCards = arrayMove(sourceCol.cards, sourceIndex, targetIndex);
      const newCol = { ...sourceCol, cards: newCards };
      setColumns((cols) => cols.map((c) => (c.id === newCol.id ? newCol : c)));
    } else {
      const card = sourceCol.cards[sourceIndex];
      const updatedSource = {
        ...sourceCol,
        cards: sourceCol.cards.filter((_, i) => i !== sourceIndex),
      };
      const updatedTarget = {
        ...targetCol,
        cards:
          targetIndex >= 0
            ? [
                ...targetCol.cards.slice(0, targetIndex),
                card,
                ...targetCol.cards.slice(targetIndex),
              ]
            : [...targetCol.cards, card],
      };
      setColumns((cols) =>
        cols.map((col) =>
          col.id === updatedSource.id
            ? updatedSource
            : col.id === updatedTarget.id
            ? updatedTarget
            : col
        )
      );
    }
  };

  return (
    <>
      <Box>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
        >
        {columnIds.includes(activeCard?.id) ? (
  // User is dragging a column
  <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
    <Grid
      container
      spacing={3}
      wrap="nowrap"
      sx={{ overflowX: "auto", py: 2 }}
    >
      {columns.map((column) => (
        <SortableColumn
          key={column.id}
          column={column}
          overCardId={overCardId}
          activeCard={activeCard}
        />
      ))}
    </Grid>
  </SortableContext>
) : (
  // User is dragging a card
  <SortableContext items={allCardIds} strategy={rectSortingStrategy}>
    <Grid
      container
      spacing={3}
      wrap="nowrap"
      sx={{ overflowX: "auto", py: 2 }}
    >
      {columns.map((column) => (
        <SortableColumn
          key={column.id}
          column={column}
          overCardId={overCardId}
          activeCard={activeCard}
        />
      ))}
    </Grid>
  </SortableContext>
)}

          <DragOverlay>
            {activeCard ? (
              <motion.div
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{ width: 336, marginBottom: 8 }}
              >
                <Card sx={{ borderRadius: 3, width: 250 }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar src={activeCard.image} />
                      <Box>
                        <Typography variant="subtitle1">
                          {activeCard.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {activeCard.time}
                        </Typography>
                        <Typography variant="body2">
                          {activeCard.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </Box>
    </>
  );
}

function SortableColumn({ column, overCardId, activeCard }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: column.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Grid item ref={setNodeRef} style={style} {...attributes}>
      <DraggableColumn
        column={column}
        listeners={listeners}
        overCardId={overCardId}
        activeCard={activeCard}
      />
    </Grid>
  );
}
