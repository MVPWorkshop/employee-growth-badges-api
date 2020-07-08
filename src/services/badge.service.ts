import Badge from '../models/Badge.model';
import { EBadgeStatus } from '../types/badge.types';
import { Transaction, QueryTypes, Includeable } from 'sequelize';
import BadgesServiceNamespace from './badge.service.d';
import { DynamicObject } from '../types/util.types';
import Address from '../models/Address.model';
import Organization from '../models/Organization.model';
import Database from '../models';

class BadgeService {
  public static async createBadge(data: BadgesServiceNamespace.ICreateBadgeData, tx?: Transaction) {
    return Badge.create({
      organization_id: data.organizationId,
      creator_address_id: data.creatorAddressId,
      created_for_address: data.createdForAddress.toLowerCase(),
      special_note: data.specialNote,
      badge_type: data.badgeType,
      status: EBadgeStatus.VOTING
    }, {transaction: tx});
  }

  public static async getBadgeById(badgeId: string, include?: Includeable[]) {
    return Badge.findOne({
      where: {
        id: badgeId
      },
      include
    });
  }

  public static async getBadgeByBlockchainId(bcId: string) {
    return Badge.findOne({
      where: {
        token_id_on_chain: bcId
      },
      include: [
        {model: Address},
        {model: Organization}
      ]
    });
  }

  public static async getBadgeList(query?: BadgesServiceNamespace.IBadgeListQueries) {
    const queries: DynamicObject = {};

    if (query) {
      if (query.organization_id) {
        queries.organization_id = query.organization_id
      }
    }

    return Badge.findAll({
      where: queries
    });
  }

  public static async getBadgesByTransfers(data: BadgesServiceNamespace.IBadgesOfOwnerListQueries) {

    let sql = `
    SELECT DISTINCT ON ("token_id_on_chain")
      "transfers"."token_id_on_chain", 
      "transfers"."address_to" as "owner_address",
      "badges"."id", 
      "badges"."organization_id",
      "badges"."creator_address_id", 
      "badges"."created_for_address", 
      "badges"."special_note",
      "badges"."badge_type",
      "badges"."status",
      "badges"."created_at",
      "badges"."updated_at"
    FROM "transfers" JOIN "badges"
    ON "transfers"."token_id_on_chain" = "badges"."token_id_on_chain"
    `;

    if (data.walletAddress) {
      sql += 'WHERE LOWER("transfers"."address_to") LIKE :walletAddress\n';
    }
    if (data.organizationId) {
      sql += `${data.walletAddress ? 'AND' : 'WHERE'} "badges"."organization_id" = :organizationId`;
    }

    return Database.query<BadgesServiceNamespace.IBadgesOfOwnerQuery>(sql, {
      replacements: {
        walletAddress: data.walletAddress,
        organizationId: data.organizationId
      },
      type: QueryTypes.SELECT
    });
  }

  public static async updateBadge(badgeId: string, data: BadgesServiceNamespace.IUpdateBadgeData, tx?: Transaction) {
    const dbBadge = await this.getBadgeById(badgeId);

    return dbBadge.update(data, {
      transaction: tx
    });
  }
}

export default BadgeService;
