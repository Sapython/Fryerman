export class Product {
    name: string = '';
    types: string[] = [];
    prices: number[] = []; //array bcz each type may have has its own price
    images: string[] = []; //urls
    inStock: number = 0;
}