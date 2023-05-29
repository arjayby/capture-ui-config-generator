import { Active } from "@dnd-kit/core";
import { SortableList } from "./SortableList";
import { FieldType } from "@/types/form-type";
import { Button } from "semantic-ui-react";
import { useAppStore, useFormStore } from "@/store";

type Props = {
  active: Active | null;
  parent: string;
  fields: FieldType[];
};

export default function SortableListField({ active, parent, fields }: Props) {
  const preview = useAppStore((state) => state.preview);
  const addField = useFormStore((state) => state.addField);

  const handleAddField = () => {
    addField(parent, { name: "Field" });
  };

  return (
    <>
      <SortableList
        items={fields}
        direction="column"
        restrictToDirection={false}
        active={active}
        renderItem={(field) => (
          <SortableList.Item
            key={field.id}
            id={field.id}
            parent={parent}
            styleCard={{ minHeight: 108 }}
          ></SortableList.Item>
        )}
      />
      {preview && (
        <Button
          fluid
          basic
          icon="add"
          content="Field"
          style={{ minHeight: 59 }}
          onClick={handleAddField}
        />
      )}
    </>
  );
}
