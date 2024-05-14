import { Route, Routes } from 'react-router';
import { styled } from 'styled-components'
import { Footer, Header, Title } from './components';
import { AdministrationPage, Authorization, Basket, HomePage, Menu, Product, Registration, Order} from './pages';
import { useLayoutEffect } from 'react';
import { setUser } from './actions';
import { ERROR } from './constants';
import { DishCard } from './pages/menu/components/dish-card/dishCard';
import { useDispatch } from 'react-redux';
import { device } from './adaptiv-styled/device';
import { AddProduct } from './pages/admin-page/components/add-product/addProduct';
import { AddCategory } from './pages/admin-page/components/add-category/addCategory';
import { EditProduct } from './pages/admin-page/components/edit-product/editProduct';
import { EditCategory } from './pages/admin-page/components/edit-category/editCategory';

const AppColomn = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  min-height: 100%;
  
`

const Page = styled.div`
  padding: 120px 0 20px;

  @media ${device.desktop} {
    max-width: 1440px;
    margin-left: auto;
    margin-right: auto;
  }
  
  @media ${device.laptopL} {
    max-width: 1024px;
  }
  
  @media ${device.laptop} {
    max-width: 768px;
  }
  @media ${device.tablet} {
    max-width: none;
    margin-left: 0;
    margin-right: 0;
  }
`;


function Coffee() {
  const dispatch = useDispatch();



  useLayoutEffect(() => {

    const currentUserDataJSON = sessionStorage.getItem('userData');
    if(!currentUserDataJSON) {
      return
    }

    const currentUserData = JSON.parse(currentUserDataJSON);

    dispatch(setUser({
      ...currentUserData,
      roleId: Number(currentUserData.roleId),
    }))
  
    
  }, [dispatch]);

  return (
    <>
    <Header />
    <AppColomn>
      <Page>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/menu' element={<Menu />}/>
          <Route path='/menu/:categoryId' element={<DishCard />}/>
          <Route path='/login' element={<Authorization />}/>
          <Route path='/register' element={<Registration />}/>
          <Route path='/administration-page' element={<AdministrationPage />}/>
          <Route path='/product/:id' element={<Product />}/>
          <Route path='/basket' element={<Basket />}/>
          <Route path='/administration-page/add-product' element={<AddProduct />}/>
          <Route path='/administration-page/add-category' element={<AddCategory />}/>
          <Route path='/administration-page/edit-product' element={<EditProduct />}/>
          <Route path='/administration-page/edit-category' element={<EditCategory />}/>
          <Route path='/administration-page/order' element={<Order />}/>
          <Route path='*' element={<Title title={ERROR.PAGE_NOT_EXIST}/>}/>
        </Routes> 
      </Page>
    </AppColomn>
      <Footer /> 
    </>
  )
}

export default Coffee
