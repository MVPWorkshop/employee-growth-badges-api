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
import Address from './Address.model';

@Table({
  freezeTableName: true,
  modelName: 'votes',
  timestamps: true,
  underscored: true
})
export default class Vote extends Model<Vote> {
  @Unique
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({type: DataType.UUIDV4})
  id: string;

  @AllowNull(true)
  @Column
  vote: boolean;

  @ForeignKey(() => Badge)
  @Column({type: DataType.UUIDV4})
  badge_id: string;

  @ForeignKey(() => Address)
  @Column({type: DataType.UUIDV4})
  address_id: string;

  @BelongsTo(() => Badge)
  badge: Badge;

  @BelongsTo(() => Address)
  address: Address;
}
