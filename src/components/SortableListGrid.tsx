import { Active } from "@dnd-kit/core";
import { Button, Card, Grid } from "semantic-ui-react";
import { SortableList } from "./SortableList";
import SortableListField from "./SortableListField";
import { GridType } from "@/types/form-type";
import { useAppStore, useFormStore } from "@/store";

type Props = {
  active: Active | null;
  parent: string;
  grids: GridType[];
};

export default function SortableListGrid({ active, parent, grids }: Props) {
  const preview = useAppStore((state) => state.preview);
  const fields = useFormStore((state) => state.fields);
  const addGrid = useFormStore((state) => state.addGrid);

  const handleAddGrid = () => {
    addGrid(parent);
  };

  return (
    <>
      <SortableList
        items={grids}
        direction="row"
        active={active}
        renderItem={(grid) => (
          <Grid.Column>
            <SortableList.Item
              key={grid.id}
              id={grid.id}
              parent={parent}
              draggableHandleDirection="horizontal"
              styleCard={{ minHeight: 0 }}
            >
              <SortableListField
                active={active}
                parent={grid.id}
                fields={grid.fields.map((field) => fields[field])}
              />
            </SortableList.Item>
          </Grid.Column>
        )}
      />
      {preview && (
        <Button
          fluid
          basic
          icon="add"
          content="Grid"
          style={{ height: 58, width: "calc(100% - 2rem)", margin: "0 auto" }}
          onClick={handleAddGrid}
        />
      )}
    </>
  );
}
