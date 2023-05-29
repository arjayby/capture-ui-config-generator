const generateId = <TItem>(prefix: string, items: TItem[]) => `${prefix}-${items.length + 1}`;

export default generateId;
