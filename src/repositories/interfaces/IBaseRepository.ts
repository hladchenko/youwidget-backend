export interface IBaseRepository<T, TCreate, TUpdate> {
  findAll(): T[];
  findById(id: string): T | null;
  create(data: TCreate): T;
  update(id: string, data: TUpdate): T | null;
  delete(id: string): boolean;
}
