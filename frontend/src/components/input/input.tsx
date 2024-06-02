import { forwardRef } from "react";
import { styled } from "styled-components";

type Props = {
    className?: string
    width?: string
  } & React.InputHTMLAttributes<HTMLInputElement>

const InputContainer = forwardRef<HTMLInputElement, Props>(({className, ...props}, ref) => {
    return <input className={className} {...props} ref={ref} />
});

export const Input = styled(InputContainer)`
    width: ${({width = '100%'}) => width};
    height: 40px;
    margin: 0 0 10px;
    border: 1px solid #000;
    border-radius: 5px;
    padding: 10px;
    font-size: 18px;
`;
