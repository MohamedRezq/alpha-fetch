import {
  Model,
  Table,
  Column,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import OrganizationApplication from "./OrganizationApplication";

@Table({
  tableName: "sync_logs",
  timestamps: false,
  paranoid: false,
})
export default class SyncLog extends Model {
  @Column(DataType.ENUM("extension", "official_api", "manual"))
  source!: string;

  @Column(DataType.ENUM("employees", "invoices", "billing"))
  type!: string;

  @Column(DataType.TEXT)
  data!: string;

  @Column
  created_at!: Date;

  @Column
  updated_at!: Date;

  @Column
  deleted_at!: Date;

  @ForeignKey(() => OrganizationApplication)
  @Column
  organization_application_id!: number;
}
