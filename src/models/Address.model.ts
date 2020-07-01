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
import AddressToOrganization from './AddressToOrganization.model';
import Organization from './Organization.model';
import Vote from './Vote.model';

@Table({
  freezeTableName: true,
  modelName: 'addresses',
  timestamps: true,
  underscored: true
})
export default class Address extends Model<Address> {
  @Unique
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({type: DataType.UUIDV4})
  id: string;

  @AllowNull(false)
  @Column
  address: string;

  @AllowNull(true)
  @Column
  username: string;

  @AllowNull(true)
  @Column
  email: string;

  @HasMany(() => Badge)
  badges: Badge[];

  @BelongsToMany(() => Organization, () => AddressToOrganization)
  organizations: Organization[];

  @HasMany(() => Vote)
  votes: Vote[];
}
