import { Active } from "@dnd-kit/core";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Button } from "semantic-ui-react";
import { SortableList } from "./SortableList";
import SortableListFieldset from "./SortableListFieldset";
import { SectionType } from "@/types/form-type";
import { useAppStore, useFormStore } from "@/store";

type Props = {
  active: Active | null;
  parent: string;
  sections: SectionType[];
};

export default function SortableListSection({ active, parent, sections }: Props) {
  const preview = useAppStore((state) => state.preview);
  const fieldsets = useFormStore((state) => state.fieldsets);
  const addSection = useFormStore((state) => state.addSection);

  const handleAddSection = () => {
    addSection(parent, { name: "Section" });
  };

  return (
    <>
      <SortableList
        items={sections}
        direction="column"
        active={active}
        strategy={verticalListSortingStrategy}
        renderItem={(section) => (
          <SortableList.Item
            key={section.id}
            id={section.id}
            parent={parent}
            draggableHandleDirection="vertical"
          >
            <SortableListFieldset
              active={active}
              parent={section.id}
              fieldsets={section.fieldsets.map((fieldset) => fieldsets[fieldset])}
            />
          </SortableList.Item>
        )}
      />
      {preview && (
        <Button
          fluid
          basic
          icon="add"
          content="Section"
          style={{ minHeight: 108 }}
          onClick={handleAddSection}
        />
      )}
    </>
  );
}
