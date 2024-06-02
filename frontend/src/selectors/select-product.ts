import { Product } from "../models/models";

interface Wrapper {
    product: Product[]
}
export const selectProduct = ({product}: Wrapper) => product;