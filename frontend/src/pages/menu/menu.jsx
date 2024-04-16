import { useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
import { MenuCard } from "./components";
import { PAGINATION_LIMIT } from "../../constants";
import { debounce, request } from "../../utils";
import { Loader, Title } from "../../components";
import { Dish } from "./components/dish-card/components/dish";
import { Search } from "../../components/search/search";
import { Pagination } from "../../components/pagination/pagination";

const MenuContainer = ({className}) => {
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState();
    const [shouldSearch, setShouldSearch] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [notFound, setNotFound] = useState(false);
    
    useEffect(() => {
        if(searchPhrase === '') {
            request(`/api/categories?page=${page}&limit=${PAGINATION_LIMIT}`).then(({data: {categories, lastPage}}) => {
                setCategories(categories);
                setLastPage(lastPage);
                setProducts([]);
            })
        } else {
            request(`/api/products?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`).then(({data: {products, lastPage}}) => {
                setProducts(products);
                if(products.length === 0) {
                    setNotFound(true);
                } else {
                    setLastPage(lastPage);
                    setNotFound(false)
                }
            })
        }
        
    }, [page, shouldSearch])

    
    const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

    const onSearch = (e) => {
        setNotFound(false)
        setSearchPhrase(e.target.value);
        startDelayedSearch(!shouldSearch)
    };

    return categories.length !== 0 || products.length !== 0 
    ? (
        <div className={className}>
            <Search searchPhrase={searchPhrase} onChange={onSearch}/>
            {notFound && <Title title="Блюда не найдены" size="50px" />}
            <div className="products-and-category">
                {products.length === 0 ? <div className="categories-list">
                    {categories.map(({id, title, imageUrl }) => <MenuCard 
                        key={id}
                        id={id}
                        title={title}
                        imageUrl={imageUrl}
                    />)}
                </div>
                :
                <div className="categories-list">
                {products.map(({id, title, imageUrl, price }) => <Dish 
                    key={id}
                    id={id}
                    title={title}
                    imageUrl={imageUrl}
                    price={price}
                />)}
                </div>}
            </div>
                {lastPage > 1 && (products.length > 0 || categories.length > 0) && <Pagination setPage={setPage} page={page} lastPage={lastPage}/>}
        </div>
    )
    : <Loader />
};


export const Menu = styled(MenuContainer)`
    display: flex;
    flex-direction: column;
    gap: 20px;

    products-and-category {
        display: flex;
        flex-direction: column;
        justify-content: space-between; 
    }

    .categories-list {
        display: flex;
        flex-wrap: wrap;

    }

`;
