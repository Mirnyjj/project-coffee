import { styled } from "styled-components";

interface Props {
    className?: string
    id: string
    inactive?: boolean
    size?: string
    margin?: string
    color?: string
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  }

const IconConteiner = ({ className, id, onClick}: Props) => (
    <div className={className} onClick={onClick}>
    <i className={`fa ${id}`} aria-hidden="true"></i>   
    </div>
);

export const Icon = styled(IconConteiner)`
    font-size: ${({size = '25px'}) => size};
    margin: ${({margin = '0'}) => margin};
    color: ${({color = '#000'}) => color};
    transition: 0.5s;
        &:hover {
        cursor: ${({inactive}) => inactive ? 'default' : 'pointer'}; 
        color: ${({inactive}) => inactive ? '#000' : 'green'};
    }


`;
