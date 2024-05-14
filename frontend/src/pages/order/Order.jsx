import { styled } from "styled-components"
import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { selectUserRole } from "../../selectors";
import { ROLE } from "../../constants";
import { checkAccess, debounce, request } from "../../utils";
import { PrivateContent, Title, Search, Pagination, Loader} from "../../components";
import { Products} from "./components";

const OrderContainer = ({className}) => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [shouldSearch, setShouldSearch] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const userRole = useSelector(selectUserRole);

    useEffect(() => {
        if(!checkAccess([ROLE.ADMIN], userRole)) {
            return;
        };
        request(`/api/orders?search=${searchPhrase}&page=${page}&limit=4`)
            .then(({data: {orders, lastPage}}) => {
                setOrders(orders);
                setIsLoading(false);
                if(orders.length === 0) {
                    setNotFound(true);
                    setLastPage(0);
                } else {
                    setNotFound(false)
                    setLastPage(lastPage);
                }    
        })
       
    }, [userRole, shouldSearch, page])

    const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

    const onSearch = (e) => {
        setSearchPhrase(e.target.value);
        startDelayedSearch(!shouldSearch)
    };

    return isLoading ? <Loader /> : (
        <PrivateContent access={[ROLE.ADMIN]}>
        <div className={className}>
            <div className="search">
            <div className="search-name">
                Введите 4 последние цифры номера телефона для поиска заказа
            </div>
            <Search searchPhrase={searchPhrase} onChange={onSearch}/>
            </div>
            {notFound ?
            <Title title="Заказ не найден" margin="0 0 20px 0" size="25px" />
            : <div className="orders">
                {orders.map(({deliveryTerms, products, publishedAt, numberOrder}) => {
                    return (
                        <div className="order" key={numberOrder}>
                            <Title title={`Заказ №${numberOrder}`} size="30px"/>
                            <div className="delivery-terms">
                                <div>Имя: {deliveryTerms.name}</div>
                                <div>Контактный номер: {deliveryTerms.telephone}</div>
                                <div>Адрес доставки: {deliveryTerms.address}</div>
                                <div>Коментарий к заказу: {deliveryTerms.comment}</div>
                                <div>Дата заказа: {publishedAt}</div>
                            </div>
                            <Products products={products} />
                        </div>
                    )
                })}
            </div>
            }
        </div>
        {lastPage > 1 && <Pagination setPage={setPage} page={page} lastPage={lastPage}/>}
        </PrivateContent>
    )

    
}

export const Order = styled(OrderContainer)`
    display: flex;
    flex-direction: column;
    justify-content: center;

    .search {
        display: flex;
        flex-direction: column;
        padding: 20px;
    }

    .orders {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 20px;
    }
    .order {
        padding: 10px 0 0 0;
        display: flex;
        flex-direction: column;
        background-color: #553131;
        border-radius: 10px;
        width: 490px;
        margin: 10px;
    }
    .delivery-terms {
        display: flex;
        flex-direction: column;
        margin: 0 20px;
        font-size: 14px;
        font-weight: 700;
        color: #e9b900;
    }

    .search-name {
        text-align: center;
        font-weight: 700;
        color: #fff;
        font-size: 18px;
    }
`