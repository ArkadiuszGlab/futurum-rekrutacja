export type Campaign = Partial<{
  id: string;
  name: string;
  keywords: string[];
  bidAmount: number;
  campaignFund: number;
  status: boolean;
  town: string;
  radius: number;
}>;
