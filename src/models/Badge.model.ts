import {
  AllowNull, BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey, HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique
} from 'sequelize-typescript';
import Organization from './Organization.model';
import Address from './Address.model';
import { EBadgeStatus, EBadgeType } from '../types/badge.types';
import Vote from './Vote.model';
import Transfer from './Transfer.model';

@Table({
  freezeTableName: true,
  modelName: 'badges',
  timestamps: true,
  underscored: true
})
export default class Badge extends Model<Badge> {
  @Unique
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({type: DataType.UUIDV4})
  id: string;

  @ForeignKey(() => Organization)
  @Column({type: DataType.UUIDV4})
  organization_id: string;

  @ForeignKey(() => Address)
  @Column({type: DataType.UUIDV4})
  creator_address_id: string;

  @AllowNull(false)
  @Column
  created_for_address: string;

  @AllowNull(true)
  @Column
  special_note: string;

  @AllowNull(false)
  @Column
  badge_type: EBadgeType;

  @AllowNull(true)
  @Column
  token_id_on_chain: string;

  @AllowNull(false)
  @Column
  status: EBadgeStatus;

  @BelongsTo(() => Organization)
  organization: Organization;

  @BelongsTo(() => Address)
  creator_address: Address;

  @HasMany(() => Vote)
  votes: Vote[];

  @HasMany(() => Transfer)
  transfers: Transfer[];
}
