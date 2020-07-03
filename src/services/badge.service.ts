import Badge from '../models/Badge.model';
import { EBadgeStatus } from '../types/badge.types';
import { Transaction } from 'sequelize';
import BadgesServiceNamespace from './badge.service.d';
import { DynamicObject } from '../types/util.types';

class BadgeService {
  public static async createBadge(data: BadgesServiceNamespace.ICreateBadgeData, tx?: Transaction) {
    return Badge.create({
      organization_id: data.organizationId,
      creator_address_id: data.creatorAddressId,
      created_for_address: data.createdForAddress,
      special_note: data.specialNote,
      badge_type: data.badgeType,
      status: EBadgeStatus.VOTING
    }, {transaction: tx});
  }

  public static async getBadgeById(badgeId: string) {
    return Badge.findOne({
      where: {
        id: badgeId
      }
    });
  }

  public static async getBadgeList(query?: BadgesServiceNamespace.IBadgeListQueries) {
    const queries: DynamicObject = {};

    if (query) {
      if (query.organization_id) {
        queries.organization_id = query.organization_id
      }
      if (query.user_id) {
        // query transfers table
      }
    }

    return Badge.findAll({
      where: queries
    });
  }
}

export default BadgeService;