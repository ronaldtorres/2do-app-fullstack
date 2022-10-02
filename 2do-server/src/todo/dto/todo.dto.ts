export class TodoDto {
  description?: string;
  sort?: number;
  completed?: boolean;

  constructor() {
    this.description = '';
  }
}

export class TodoBatchUpdateDto {
  id: string;
  sort: number;
}
