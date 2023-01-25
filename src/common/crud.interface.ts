export interface CRUD {
  create: (resource: any) => unknown;
  readById: (id: string) => unknown;
  updateById: (id: string, resource: any) => unknown;
  deleteById: (id: string) => unknown;
  getAll: () => unknown;
}

export interface WithAutosuggest {
  autosuggest?: (substr: string, limit: number) => unknown;
}
