import BigNumber from 'bignumber.js';

class VoteUtil {
  public static calculateNumberOfVotesNeeded(numberOfVoters: number) {
    return new BigNumber(numberOfVoters).multipliedBy(0.5).integerValue(BigNumber.ROUND_FLOOR).plus(1).toNumber();
  }
}

export default VoteUtil;
