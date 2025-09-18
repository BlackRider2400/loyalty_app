type Coupon = {
    id: string;
    location: string;
    title: string;
    description: string;
    imgUrl: string;
    priceCoins: number;
    code?: string;
    enabled: boolean; // nowy
};
