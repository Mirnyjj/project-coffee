import { Category } from './../models/models';
interface Wrapper {
    category: Category[]
}
export const selectCategory = ({category}: Wrapper) => category;
