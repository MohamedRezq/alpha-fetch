import {
  Model,
  Table,
  Column,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import Application from "./Application";

@Table({
  tableName: "organization_applications",
  timestamps: false,
  paranoid: false,
})
export default class OrganizationApplication extends Model {
  @Column
  organization_id!: number;

  @Column(DataType.BOOLEAN)
  is_active!: boolean;

  @Column(DataType.TEXT)
  data!: string;

  @Column
  created_at!: Date;

  @Column
  updated_at!: Date;

  @Column
  deleted_at!: Date;

  @ForeignKey(() => Application)
  @Column
  application_id!: number;
}
