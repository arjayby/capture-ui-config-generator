import React, { useMemo } from "react";
import type { ReactNode } from "react";
import type { Active, UniqueIdentifier } from "@dnd-kit/core";
import { SortableContext, SortingStrategy } from "@dnd-kit/sortable";
import { SortableOverlay } from "@/components/SortableOverlay";
import { SortableItem } from "@/components/SortableItem";
import { MenuSortableItem } from "./MenuSortableItem";

type BaseItem = {
  id: UniqueIdentifier;
};

type Props<T extends BaseItem> = {
  items: T[];
  renderItem(item: T, index?: number): ReactNode;
  direction?: "row" | "column";
  active: Active | null;
  restrictToDirection?: boolean;
  strategy?: SortingStrategy;
};

export function SortableList<T extends BaseItem>({
  items,
  renderItem,
  direction,
  active,
  strategy,
  restrictToDirection = true,
}: Props<T>) {
  const activeItem = useMemo(() => items.find((item) => item.id === active?.id), [active, items]);

  return (
    <>
      <SortableContext items={items} strategy={strategy}>
        {items.map((item, index) => renderItem(item, index))}
      </SortableContext>
      <SortableOverlay direction={direction} restrictToDirection={restrictToDirection}>
        {activeItem ? renderItem(activeItem) : null}
      </SortableOverlay>
    </>
  );
}

SortableList.Item = SortableItem;
SortableList.MenuItem = MenuSortableItem;
