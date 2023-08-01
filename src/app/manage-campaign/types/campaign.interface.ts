export interface CampaignInterface {
  id: string;
  name: string;
  objective?: string;
  category?: string;
  offer?: string;
  comment?: string;
  location?: {};
  status: string;
  ctr: number;
  'start date': string;
}
