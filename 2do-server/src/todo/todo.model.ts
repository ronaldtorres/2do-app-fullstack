import { Table, Column, Model, Index, DataType } from 'sequelize-typescript';

@Table({
  modelName: 'todo',
  timestamps: false,
})
export class TodoModel extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Index
  @Column({ type: DataType.UUIDV1, defaultValue: DataType.UUIDV4 })
  uuid: string;

  @Column
  description: string;

  @Column
  sort: number;

  @Column({ defaultValue: false })
  completed: boolean;

  @Column
  createdAt: Date;
}
