import { Active } from "@dnd-kit/core";
import { horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { Icon, Menu } from "semantic-ui-react";
import { SortableList } from "./SortableList";
import { ViewType } from "@/types/form-type";
import { useFormStore } from "@/store";

type Props = {
  views: ViewType[];
  active: Active | null;
};

export default function SortableListView({ active, views }: Props) {
  const addView = useFormStore((state) => state.addView);

  const handleAddView = () => {
    addView({ name: "New View" });
  };

  return (
    <Menu pointing color="blue" style={{ marginBottom: "2rem" }}>
      <SortableList
        items={views}
        direction="row"
        active={active}
        strategy={horizontalListSortingStrategy}
        renderItem={(view) => <SortableList.MenuItem key={view.id} id={view.id} name={view.name} />}
      />
      <Menu.Item name="add" onClick={handleAddView}>
        <Icon name="add" color="grey" style={{ margin: 0 }} />
      </Menu.Item>
    </Menu>
  );
}
