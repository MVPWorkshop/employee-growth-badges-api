import {
  AllowNull,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
  BelongsTo
} from 'sequelize-typescript';
import Organization from './Organization.model';
import Address from './Address.model';

@Table({
  freezeTableName: true,
  modelName: 'addresses_to_organizations',
  timestamps: true,
  underscored: true
})
export default class AddressToOrganization extends Model<AddressToOrganization> {
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
  address_id: string;

  @AllowNull(false)
  @Column({defaultValue: false})
  revoked: boolean;

  @AllowNull(true)
  @Column({type: DataType.DATE})
  revoked_at: string;

  // relations

  @BelongsTo(() => Address)
  address: Address;

  @BelongsTo(() => Organization)
  organization: Organization;
}
