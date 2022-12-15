export interface CreateKoinStatsProps {
  price: number;
  bidPrice: number;
  bidQuantity: number;
  askPrice: number;
  askQuantity: number;
}

export interface KoinStatsProps extends CreateKoinStatsProps {
  timestamp: number;
}

export interface UpdateKoinStatsProps {
  price: number;
  bidPrice: number;
  bidQuantity: number;
  askPrice: number;
  askQuantity: number;
}
