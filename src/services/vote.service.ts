import Vote from '../models/Vote.model';
import VoteServiceNamespace from './vote.service.d';
import { Transaction } from 'sequelize';
import { DynamicObject } from '../types/util.types';
import Address from '../models/Address.model';

class VoteService {
  public static async createVote(addressId: string, data: VoteServiceNamespace.ICreateVoteData, tx: Transaction) {
    return Vote.findOrCreate({
      where: {
        badge_id: data.badgeId,
        address_id: addressId
      },
      defaults: {
        badge_id: data.badgeId,
        address_id: addressId,
        vote: data.vote
      },
      transaction: tx
    });
  }

  public static async getVoteById(voteId: string) {
    return Vote.findOne({
      where: {
        id: voteId
      }
    });
  }

  public static async getVoteList(query?: VoteServiceNamespace.IVoteListQueries, tx?: Transaction) {
    const queries: DynamicObject = {};

    if (query) {
      if (query.badge_id) {
        queries.badge_id = query.badge_id;
      }

      queries.vote = !!query.vote;
    }

    return Vote.findAll({
      where: queries,
      transaction: tx,
      include: [
        {model: Address}
      ]
    })
  }

  public static async getBadgeVoteCount(badgeId: string, tx?: Transaction) {
    // @TODO Learn to count!

    const positiveVotes = await this.getVoteList({
      badge_id: badgeId,
      vote: true
    }, tx);

    const negativeVotes = await this.getVoteList({
      badge_id: badgeId,
      vote: false
    }, tx);

    return {
      positiveVotes: positiveVotes.length,
      negativeVotes: negativeVotes.length
    }
  }
}

export default VoteService;
