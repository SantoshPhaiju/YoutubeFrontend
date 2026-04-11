import { createContext } from "react";

export const CommentHoverContext = createContext<{
  hoveredLevel: number | null;
  setHoveredLevel: (level: number | null) => void;
} | null>(null);
