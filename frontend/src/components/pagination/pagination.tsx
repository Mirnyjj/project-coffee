import { styled } from "styled-components";
import { Button } from "../button/button";
import { device } from "../../adaptiv-styled/device";

type Props = {
    className?: string
    page: number
    setPage: (page: number) => void
    lastPage: number
  }

const PaginationContainer = ({className, page, setPage, lastPage}: Props) => {
    
    return (
        <div className={className}>
            <Button disabled={page === 1} onClick={() => setPage(1)} >В начало</Button>
            <Button disabled={page === 1} onClick={() => setPage(page - 1)} >Предыдущая</Button>
            <div className="current-page">Страница: {page}</div>
            <Button disabled={page === lastPage} onClick={() => setPage(page+1)} >Следующая</Button>
            <Button disabled={page === lastPage} onClick={() => setPage(lastPage)} >В конец</Button>
        </div>
    )
};


export const Pagination = styled(PaginationContainer)`
    display: flex;
    justify-content: center;
    margin: 0 0 20px;

    & button {
        margin: 0 5px;
    }

    .current-page {
        width: 100%;
        height: 32px;
        margin: 0px 5px;
        font-size: 18px;
        font-weight: 500;
        text-align: center;
        line-height: 26px;
        border: 1px solid #fff;
        color: #fff;
    }
    
    @media ${device.desktop} {
      padding: 0 35px;
      .current-page {
          display: none;
      }
    }
      @media ${device.tablet} {
        padding: 0 15px;
        .current-page {
            display: none;
        }
      }


`;
