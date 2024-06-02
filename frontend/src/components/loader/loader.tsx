import { keyframes, styled } from "styled-components";
import lebel from "../../img/lebel.png"

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const InfiniteRotate = styled.div`
    animation: ${rotate} 2s linear infinite;
`
type Props = {
  className?: string
}

const LoaderContainer = ({className}: Props) => {
  return (
    <div className={className}>
    <InfiniteRotate>
      <img className="louder" src={lebel}/>
    </InfiniteRotate>
    </div>
  )
};

export const Loader = styled(LoaderContainer)`
position: relative;
min-height: 100vh;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
`;