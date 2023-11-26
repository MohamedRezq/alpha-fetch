import {
  Model,
  Table,
  Column,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import Category from "./Category";

@Table({
  tableName: "applications",
  timestamps: false,
  paranoid: false,
})
export default class Application extends Model {
  @Column
  name!: string;

  @Column
  slug!: string;

  @Column
  description!: string;

  @Column
  logo!: string;

  @Column(DataType.BOOLEAN)
  is_integrated!: boolean;

  @Column(DataType.TEXT)
  data!: string;

  @Column
  created_at!: Date;

  @Column
  updated_at!: Date;

  @Column
  deleted_at!: Date;

  @ForeignKey(() => Category)
  @Column
  category_id!: number;
}
