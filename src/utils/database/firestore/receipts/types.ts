export type Receipt = {
  createdAt: number;
  id: string;
  imageUrl: string;
  isConfirmed?: boolean;
  jsonData: string;
  title?: string;
  userId: string;
};
