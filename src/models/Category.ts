import {
  Model,
  Table,
  Column,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import Application from "./Application";

@Table({
  tableName: "categories",
  timestamps: false,
  paranoid: false,
})
export default class Category extends Model {
  @Column
  name!: string;

  @Column
  slug!: string;

  @Column
  parent_category_id!: number;

  @Column
  logo!: string;

  @Column(DataType.TEXT)
  data!: string;

  @Column
  created_at!: Date;

  @Column
  updated_at!: Date;

  @Column
  deleted_at!: Date;
}
