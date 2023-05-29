import { create } from "zustand";
import { persist } from "zustand/middleware";

import { FieldType, FieldsetType, GridType, SectionType, ViewType } from "@/types/form-type";
import { generateId } from "@/utils";

type StoreType = {
  activeViewId: string;
  viewsOrder: string[];
  views: {
    [key: string]: ViewType;
  };
  sections: {
    [key: string]: SectionType;
  };
  fieldsets: {
    [key: string]: FieldsetType;
  };
  grids: {
    [key: string]: GridType;
  };
  fields: {
    [key: string]: FieldType;
  };
};

type StoreActionType = {
  setActiveViewId: (viewId: string) => void;
  setViewsOrder: (views: string[]) => void;
  addView: ({ name }: { name: string }) => void;
  addSection: (parent: string, { name }: { name: string }) => void;
  addFieldset: (parent: string, { name }: { name: string }) => void;
  addGrid: (parent: string) => void;
  addField: (parent: string, { name }: { name: string }) => void;
  updateView: (viewId: string, data: ViewType) => void;
  updateSection: (sectionId: string, data: SectionType) => void;
  updateFieldset: (fieldsetId: string, data: FieldsetType) => void;
  updateGrid: (gridId: string, data: GridType) => void;
};

type FormStoreType = StoreType & StoreActionType;

const useFormStore = create<FormStoreType>()(
  persist(
    (set) => ({
      activeViewId: "view-1",
      viewsOrder: ["view-1", "view-2"],
      views: {
        "view-1": {
          id: "view-1",
          name: "Application Form",
          sections: ["section-1"],
        },
        "view-2": {
          id: "view-2",
          name: "Document Upload",
          sections: [],
        },
      },
      sections: {
        "section-1": {
          id: "section-1",
          name: "S1",
          fieldsets: ["fieldset-1", "fieldset-2"],
        },
      },
      fieldsets: {
        "fieldset-1": {
          id: "fieldset-1",
          name: "F1",
          grids: ["grid-1", "grid-2", "grid-3"],
        },
        "fieldset-2": {
          id: "fieldset-2",
          name: "F2",
          grids: ["grid-4", "grid-5"],
        },
      },
      grids: {
        "grid-1": { id: "grid-1", fields: ["field-1"] },
        "grid-2": { id: "grid-2", fields: ["field-2"] },
        "grid-3": { id: "grid-3", fields: ["field-3"] },
        "grid-4": { id: "grid-4", fields: [] },
        "grid-5": { id: "grid-5", fields: [] },
      },
      fields: {
        "field-1": { id: "field-1", name: "Field 1" },
        "field-2": { id: "field-2", name: "Field 2" },
        "field-3": { id: "field-3", name: "Field 3" },
      },
      addView: ({ name }) =>
        set((state) => {
          const id = generateId("view", Object.keys(state.views));
          const newView = {
            id,
            name,
            sections: [],
          };
          return {
            views: {
              ...state.views,
              [id]: newView,
            },
            viewsOrder: [...state.viewsOrder, id],
          };
        }),
      addSection: (parent, { name }) =>
        set((state) => {
          const view = state.views[parent];
          const id = generateId("section", Object.keys(state.sections));
          const newSection = {
            id,
            name,
            fieldsets: [],
          };

          return {
            sections: {
              ...state.sections,
              [id]: newSection,
            },
            views: {
              ...state.views,
              [parent]: {
                ...view,
                sections: [...view.sections, id],
              },
            },
          };
        }),
      addFieldset: (parent, { name }) =>
        set((state) => {
          const section = state.sections[parent];
          const id = generateId("fieldset", Object.keys(state.fieldsets));
          const newFieldset = {
            id,
            name,
            grids: [],
          };

          return {
            fieldsets: {
              ...state.fieldsets,
              [id]: newFieldset,
            },
            sections: {
              ...state.sections,
              [parent]: {
                ...section,
                fieldsets: [...section.fieldsets, id],
              },
            },
          };
        }),
      addGrid: (parent) =>
        set((state) => {
          const fieldset = state.fieldsets[parent];
          const id = generateId("grid", Object.keys(state.grids));
          const newGrid = {
            id,
            fields: [],
          };

          return {
            grids: {
              ...state.grids,
              [id]: newGrid,
            },
            fieldsets: {
              ...state.fieldsets,
              [parent]: {
                ...fieldset,
                grids: [...fieldset.grids, id],
              },
            },
          };
        }),
      addField: (parent, { name }) =>
        set((state) => {
          const grid = state.grids[parent];
          const id = generateId("field", Object.keys(state.fields));
          const newField = {
            id,
            name,
          };

          return {
            fields: {
              ...state.fields,
              [id]: newField,
            },
            grids: {
              ...state.grids,
              [parent]: {
                ...grid,
                fields: [...grid.fields, id],
              },
            },
          };
        }),
      setActiveViewId: (viewId) => set(() => ({ activeViewId: viewId })),
      setViewsOrder: (views) => set(() => ({ viewsOrder: views })),
      updateView: (viewId, data) =>
        set((state) => ({
          views: { ...state.views, [viewId]: data },
        })),
      updateSection: (sectionId, data) =>
        set((state) => ({
          sections: { ...state.sections, [sectionId]: data },
        })),
      updateFieldset: (fieldsetId, data) =>
        set((state) => ({ fieldsets: { ...state.fieldsets, [fieldsetId]: data } })),
      updateGrid: (gridId, data) => set((state) => ({ grids: { ...state.grids, [gridId]: data } })),
    }),
    { name: "form-store" }
  )
);
export default useFormStore;
