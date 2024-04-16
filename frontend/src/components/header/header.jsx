import { styled } from 'styled-components'
import { Logo, ControlPanel, BasketCounter, Contacts } from './components';

const Dicription = styled.div`
  font-style: italic;
  
`;

const HeaderConteiner = ({className}) => (
    <header className={className}>
      <Logo />
      <Dicription>
      Оазис в сердце города <br /> Лучшее место для отдыха в Инзе
      </Dicription>
      <Contacts />
      <BasketCounter />
      <ControlPanel />
    </header>
  );

  export const Header = styled(HeaderConteiner)`
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0px;
    width: 100%;
    height: 120px;
    padding: 20px 40px;
    box-shadow: 0 0px 8px #000;
    background-color: #fff;
    z-index: 1100;
`