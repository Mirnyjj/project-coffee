import { Route, Routes } from 'react-router';
import { styled } from 'styled-components'
import { Footer, Header, Title } from './components';
import { AdministrationPage, Authorization, Basket, HomePage, Menu, Product, Registration, Order} from './pages';
import { useLayoutEffect } from 'react';
import { setUser } from './actions';
import { ERROR } from './constants';
import { DishCard } from './pages/menu/components/dish-card/dishCard';
import { useDispatch } from 'react-redux';

const AppColomn = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
  margin: 0 auto;
  width: 1000px;


  .wrapper-loader {
    display: flex;
    position: fixed;
  }
  
`

const Page = styled.div`
  padding: 120px 0 20px;
`;


function Coffee() {
  const dispatch = useDispatch();



  useLayoutEffect(() => {

    const currentUserDataJSON = sessionStorage.getItem('userData');
    if(!currentUserDataJSON) {
      return
    };

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
          <Route path='/order' element={<Order />}/>
          <Route path='*' element={<Title title={ERROR.PAGE_NOT_EXIST}/>}/>
        </Routes> 
      </Page>
    </AppColomn>
      <Footer /> 
    </>
  )
}

export default Coffee
