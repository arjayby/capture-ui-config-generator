import type { PropsWithChildren } from "react";
import { DragOverlay, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import type { DropAnimation } from "@dnd-kit/core";
import { restrictToHorizontalAxis, restrictToVerticalAxis } from "@dnd-kit/modifiers";

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        // opacity: "0.4",
      },
    },
  }),
};

type Props = {
  direction?: "row" | "column";
  restrictToDirection?: boolean;
};

export function SortableOverlay({
  children,
  direction,
  restrictToDirection,
}: PropsWithChildren<Props>) {
  const modifiers = [];

  if (restrictToDirection) {
    if (direction === "row") modifiers.push(restrictToHorizontalAxis);
    if (direction === "column") modifiers.push(restrictToVerticalAxis);
  }

  return (
    <DragOverlay dropAnimation={dropAnimationConfig} modifiers={modifiers}>
      {children}
    </DragOverlay>
  );
}
