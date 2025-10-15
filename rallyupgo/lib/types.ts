export type ProductResponseDTO = {
    id: number;
    shopId: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
};

export type CouponDTO = {
    id: number;
    productDTO: ProductResponseDTO;
    code: string;
    used: boolean;
    createdAt: string;
};

export type ClientUserDTO = {
    id: number;
    username: string;
    email: string;
    qrCode: string;
    balance: number;
    currentShopUserDTO?: ShopUserDTO | null;
    couponDTOList: CouponDTO[];
};

export type LoginRequestDTO = { email: string; password: string };
export type RefreshDto = { refreshToken: string };
export type JwtResponseDTO = {
    token: string;
    type?: string;
    email?: string;
    refreshToken?: string;
    roles?: string[];
};

export type ShopUserDTO = {
    id: number;
    name: string;
    products: ShopItems[];
};

export type ShopItems = {
    id: number;
    shopId: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
};
