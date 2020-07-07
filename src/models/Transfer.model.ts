import {
  AllowNull, BelongsTo,
  Column,
  DataType,
  Default, ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique
} from 'sequelize-typescript';
import Badge from './Badge.model';

@Table({
  freezeTableName: true,
  modelName: 'transfers',
  timestamps: true,
  underscored: true
})
export default class Transfer extends Model<Transfer> {
  @Unique
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({type: DataType.UUIDV4})
  id: string;

  @AllowNull(false)
  @Unique
  @Column
  tx_hash: string;

  @AllowNull(false)
  @Column
  address_from: string;

  @AllowNull(false)
  @Column
  address_to: string;

  @AllowNull(false)
  @Column
  token_id_on_chain: string;
}
