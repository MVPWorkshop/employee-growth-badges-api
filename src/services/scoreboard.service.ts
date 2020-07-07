import BadgeService from './badge.service';
import { DynamicObject } from '../types/util.types';
import BadgesServiceNamespace from './badge.service.d';

class ScoreboardService {
  // @TODO Write SQL clause to do all of this
  public static async getOrganizationScoreboard(organizationId: string) {

    const organizationBadges = await BadgeService.getBadgesByTransfers({
      organizationId
    });

    if (!organizationBadges) {
      return []
    }

    const badgesByAddress: DynamicObject<BadgesServiceNamespace.IBadgesOfOwnerQuery[]> = {};

    organizationBadges.map(badge => {
      console.log(badgesByAddress[badge.owner_address])
      badgesByAddress[badge.owner_address] = [
        ...(badgesByAddress[badge.owner_address] || []),
        badge
      ]
    });

    const scoreboard: {
      address: string,
      badges: BadgesServiceNamespace.IBadgesOfOwnerQuery[]
    }[] = [];

    Object.keys(badgesByAddress).map(address => {
      scoreboard.push({
        address,
        badges: badgesByAddress[address]
      })
    });

    scoreboard.sort((a, b) => {
      return a.badges.length < b.badges.length ? 1 : -1
    });

    return scoreboard;
  }
}

export default ScoreboardService;
