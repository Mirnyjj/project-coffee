import { styled } from 'styled-components';

type Props = {
    className?: string
    imageUrl?: string
    inactive?: boolean
    name?: string
    disabled?: boolean
    margin?: string
    radius?: string
    width?: string
    height?: string
  }

const ImgConteiner = ({ className, imageUrl, name, width, height}: Props) => (
        <img className={className} src={`${imageUrl}`} 
        alt={name}
        width={width}
        height={height} 
        aria-hidden="true" 
        />
);

export const Img = styled(ImgConteiner)`
    margin: ${({margin = '0'}) => margin};
    color: ${({disabled}) => disabled ? '#ccc' : '#000'};
    border-radius: ${({radius = '0'}) => radius};
        &:hover {
        cursor: ${({inactive}) => inactive ? 'default' : 'pointer'}; 
    }


`;
