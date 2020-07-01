import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique
} from 'sequelize-typescript';
import Badge from './Badge.model';
import Address from './Address.model';
import AddressToOrganization from './AddressToOrganization.model';

@Table({
  freezeTableName: true,
  modelName: 'organizations',
  timestamps: true,
  underscored: true
})
export default class Organization extends Model<Organization> {
  @Unique
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({type: DataType.UUIDV4})
  id: string;

  @AllowNull(false)
  @Column
  name: string;

  @HasMany(() => Badge)
  badges: Badge[];

  @BelongsToMany(() => Address, () => AddressToOrganization)
  addresses: Address[];
}
