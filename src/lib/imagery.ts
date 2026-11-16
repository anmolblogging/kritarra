import photos from './campaign.json';

export type CampaignPhoto = {
  id: string;
  src: string;
  srcSet: string;
  variants: { src: string; width: number }[];
  width: number;
  height: number;
  alt: string;
  source: string;
};

export const campaign = photos satisfies Record<string, CampaignPhoto>;

export const socialCampaigns = [
  campaign.c2347,
  campaign.c2354,
  campaign.c2358,
  campaign.c2357,
];
