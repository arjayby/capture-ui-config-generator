import type { CSSProperties, PropsWithChildren } from "react";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, Icon } from "semantic-ui-react";

type Props = {
  id: UniqueIdentifier;
  parent?: string | null;
  draggableHandleDirection?: "horizontal" | "vertical";
  styleCard?: CSSProperties;
  styleContent?: CSSProperties;
};

export function SortableItem({
  children,
  id,
  parent,
  draggableHandleDirection,
  styleCard,
  styleContent,
}: PropsWithChildren<Props>) {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id,
    data: { parent },
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card fluid style={{ marginBottom: "2rem", minHeight: 216, ...styleCard }}>
        <Card.Content extra>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: draggableHandleDirection !== "horizontal" ? "baseline" : "center",
            }}
          >
            <p>{id}</p>
            <div {...listeners}>
              <Icon
                name={draggableHandleDirection ? "sort" : "move"}
                color="grey"
                rotated={draggableHandleDirection === "horizontal" ? "clockwise" : undefined}
              />
            </div>
          </div>
        </Card.Content>
        <Card.Content style={{ padding: "3rem 3rem 1.5rem 3rem", ...styleContent }}>
          {children}
        </Card.Content>
      </Card>
    </div>
  );
}
