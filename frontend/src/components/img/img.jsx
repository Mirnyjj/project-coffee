import PropTypes from 'prop-types';
import { styled } from 'styled-components';

const ImgConteiner = ({ className, imageUrl, inactive, name, width, height, ...props}) => (
        <img className={className} src={`${imageUrl}`} 
        alt={name}
        width={width}
        height={height} 
        aria-hidden="true" 
        {...props}/>
);

export const Img = styled(ImgConteiner)`
    margin: ${({margin = '0'}) => margin};
    color: ${({disabled}) => disabled ? '#ccc' : '#000'};
    border-radius: ${({radius = '0'}) => radius};
        &:hover {
        cursor: ${({inactive}) => inactive ? 'default' : 'pointer'}; 
    }


`;

Img.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    inactive: PropTypes.bool,
    name: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
}