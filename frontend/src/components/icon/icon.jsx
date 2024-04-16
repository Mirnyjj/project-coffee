import { styled } from "styled-components";
import PropTypes from 'prop-types';

const IconConteiner = ({ className, id, inactive, ...props}) => (
    <div className={className} {...props}>
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

Icon.propTypes = {
    id: PropTypes.string.isRequired,
    inactive: PropTypes.bool,

}