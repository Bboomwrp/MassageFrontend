export interface MassageShopItem {
    _id: string,
    name: string,
    password : string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    __v: number,
    id: string
  }
  
export interface MassageShopJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: MassageShopItem[]
  }

export interface User {
    name: string,
    tel: string,
    email: string,
    role: string,
    password: string,
    createAt: Date
  }

export interface Booking {
    _id: string,
    bookingDate: Date,
    user: User,
    massageShop: MassageShopItem,
    createdAt: Date
  }
