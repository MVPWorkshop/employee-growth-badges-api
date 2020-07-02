import { Column, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

@Table({
  modelName: 'session',
  timestamps: true,
  underscored: true,
  freezeTableName: true
})
export default class Session extends Model<Session> {
  @PrimaryKey
  @Unique
  @Column
  sid: string;

  @Column
  expires: Date;

  @Column
  data: string;
}
