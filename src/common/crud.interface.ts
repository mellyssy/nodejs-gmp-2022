export interface CRUD {
  autosuggest: (substr: string, limit: number) => unknown;
  create: (resource: any) => unknown;
  readById: (id: string) => unknown;
  updateById: (id: string, resource: any) => unknown;
  deleteById: (id: string) => unknown;
}
