import { DynamicObject } from '../types/util.types';
import { EBadgeType } from '../types/badge.types';
import CommonUtil from '../utils/common.util';

interface IBadgeMetadata {
  name: string;
  image: string;
}

export const badgeTypeMetadata: DynamicObject<IBadgeMetadata, EBadgeType> = {
  [EBadgeType.THANK_YOU]: {
    name: 'Thank you',
    image: CommonUtil.publicFolderUrl + '/images/thank_you.svg'
  },
  [EBadgeType.ANNIVERSARY]: {
    name: 'Anniversary',
    image: CommonUtil.publicFolderUrl + '/images/anniversary.svg'
  },
  [EBadgeType.PROMOTED]: {
    name: 'Promoted',
    image: CommonUtil.publicFolderUrl + '/images/promotion.svg'
  },
  [EBadgeType.TEAMMATE_YEAR]: {
    name: 'Teammate of the year',
    image: CommonUtil.publicFolderUrl + '/images/teammate_of_year.svg'
  },
  [EBadgeType.TEAMMATE_MONTH]: {
    name: 'Teammate of the month',
    image: CommonUtil.publicFolderUrl + '/images/teammate_of_month.svg'
  }
};
