import { Active } from "@dnd-kit/core";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Button, Grid } from "semantic-ui-react";
import { SortableList } from "./SortableList";
import SortableListGrid from "./SortableListGrid";
import { FieldsetType } from "@/types/form-type";
import { useAppStore, useFormStore } from "@/store";

type Props = {
  active: Active | null;
  parent: string;
  fieldsets: FieldsetType[];
};

export default function SortableListFieldset({ active, parent, fieldsets }: Props) {
  const preview = useAppStore((state) => state.preview);
  const grids = useFormStore((state) => state.grids);
  const addFieldset = useFormStore((state) => state.addFieldset);

  const handleAddFieldset = () => {
    addFieldset(parent, { name: "Fieldset" });
  };

  return (
    <>
      <SortableList
        items={fieldsets}
        direction="column"
        active={active}
        strategy={verticalListSortingStrategy}
        renderItem={(fieldset) => (
          <SortableList.Item
            key={fieldset.id}
            id={fieldset.id}
            parent={parent}
            draggableHandleDirection="vertical"
            styleContent={{ padding: "3rem" }}
          >
            <Grid>
              {/* @ts-ignore: Unreachable code error */}
              <Grid.Row columns={fieldset.grids.length}>
                <SortableListGrid
                  active={active}
                  parent={fieldset.id}
                  grids={fieldset.grids.map((grid) => grids[grid])}
                />
              </Grid.Row>
            </Grid>
          </SortableList.Item>
        )}
      />
      {preview && (
        <Button
          fluid
          basic
          icon="add"
          content="Fieldset"
          style={{ minHeight: 108 }}
          onClick={handleAddFieldset}
        />
      )}
    </>
  );
}
