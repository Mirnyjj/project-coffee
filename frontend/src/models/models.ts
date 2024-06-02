export interface User {
    id?: string
    login: string
    roleId: number
    registeredAt?: string
    session?: string
}

export interface Category {
    id?: string
    title: string
    imageUrl: string
    publishedAt?: string
}

export interface AddCategory {
    id: string
    title: string
    imageUrl: string
    publishedAt?: string
}



export interface Product {
    id?: string
    title: string
    imageUrl: string
    description: string
    price: string
    categoryId: string
    publishedAt?: string
}

export interface IsOrder {
    id?: string
    deliveryTerms: DeliveryTerms
    products: AddedProductInBasket[]
    numberOrder: number
    publishedAt: string
}

export interface DeliveryTerms {
    name: string
    telephone: string
    address: string
    comment: string
}


export interface Foto {
    id: string
    imageUrl: string
    publishedAt: string
}

export interface Action {
    type: string
}

export interface ActionSetCategory {
    type: string
    payload: Category
}
export interface ActionSetProduct {
    type: string
    payload: Product
}

export interface ActionSetUser {
    type: string
    payload: User
}

export interface Basket {
    id: string
    title: string
    imageUrl: string
    description: string
    price: string
    categoryId: string
    publishedAt: string
    amount?: number
}

export interface AddedProductInBasket {
    id: string
    title: string
    imageUrl: string
    description: string
    price: string
    categoryId: string
    publishedAt: string
    amount: number
}

export type Target = {
    target: {
        value: string
    }
}