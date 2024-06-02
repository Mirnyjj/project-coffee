import { styled } from 'styled-components'
import { Logo, ControlPanel, BasketCounter, Contacts } from './components';
import { device } from '../../adaptiv-styled/device';

const Dicription = styled.div`
  font-style: italic;
  @media ${device.laptop} {
    display: none;
  }

  
`;

type Props = {
  className?: string
}

const HeaderConteiner = ({className}: Props) => (

    <header className={className}>
      <Logo />
      <Dicription>
      Оазис в сердце города <br /> Лучшее место для отдыха в Инзе
      </Dicription>
      <div className='wrapper-basket-countacts'>
        <BasketCounter />
        <Contacts />
      </div>
      <ControlPanel />
    </header>
  );

  export const Header = styled(HeaderConteiner)`
  @media ${device.desktop} {
    .wrapper-basket-countacts{
      display: flex;
      gap: 20px;
    }
  }

  @media ${device.laptop} {
    padding: 20px 5px;
  }

  @media ${device.tablet} {
    .wrapper-basket-countacts{
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
}
    display: flex;
    justify-content: space-between;
    position: fixed;
    width: 100%;
    top: 0px;
    padding: 20px 40px;
    box-shadow: 0 0px 8px #000;
    background-color: #fff;
    z-index: 1100;
    max-height: 120px;

`