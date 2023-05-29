import fieldTypes from "./field-types";

export type ViewType = {
  readonly id: string;
  name: string;
  sections: string[];
};

export type SectionType = {
  readonly id: string;
  name: string;
  fieldsets: string[];
};

export type FieldsetType = {
  readonly id: string;
  name: string;
  grids: string[];
};

export type GridType = {
  readonly id: string;
  fields: string[];
};

export type FieldType = {
  readonly id: string;
  name: string;
  // field_id: string;
  // value: string;
  // placeholder: string;
  // type: (typeof fieldTypes)[number];
};
