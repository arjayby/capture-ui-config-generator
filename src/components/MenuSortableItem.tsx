import type { CSSProperties } from "react";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Icon, Menu } from "semantic-ui-react";
import { useFormStore } from "@/store";

type Props = {
  id: UniqueIdentifier;
  name: string;
  parent?: string | null;
};

export function MenuSortableItem({ id, name, parent }: Props) {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id,
    data: { parent },
  });

  const activeViewId = useFormStore((state) => state.activeViewId);
  const setActiveViewId = useFormStore((state) => state.setActiveViewId);

  const handleSetActiveViewId = () => {
    setActiveViewId(id.toString());
  };

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    backgroundColor: "white",
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Menu.Item
        name={id.toString()}
        active={id.toString() === activeViewId}
        onClick={handleSetActiveViewId}
        style={{ paddingRight: 4 }}
      >
        {name}
        <div {...listeners}>
          <Icon
            name="sort"
            color="grey"
            style={{
              margin: "0 0 0 16px",
              padding: 7,
            }}
            rotated="clockwise"
          />
        </div>
      </Menu.Item>
    </div>
  );
}
