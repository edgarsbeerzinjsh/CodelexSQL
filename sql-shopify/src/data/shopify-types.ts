export interface App {
    shopifyAppId: number;
    url: string;
    title: string;
    tagline: string;
    developer: string;
    developerLink: string;
    icon: string;
    rating: number;
    reviewsCount: number;
    description: string;
    pricingHint: string;
}

export interface Category {
    title: string;
}

export interface AppCategory {
    shopifyAppId: number;
    categoryId: number;
}

export interface KeyBenefit {
    shopifyAppId: number;
    title: string;
    description: string;
}

export interface PricingPlan {
    shopifyAppId: number;
    price: string;
}

export interface PricingPlanPrice {
    id: number;
    price: string;
}

export interface Review {
    shopifyAppId: number;
    author: string;
    body: string;
    rating: number;
    helpfulCount: number;
    dateCreated: string;
    developerReply: string;
    developerReplyDate: string;
}
