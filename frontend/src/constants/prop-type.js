import PropTypes from 'prop-types';
import { ROLE } from './role';

const ROLE_ID = PropTypes.oneOf(Object.values(ROLE));

export const PROP_TYPE = {
    ROLE_ID,
    ROLE: PropTypes.shape({
        ROLE_ID,
        name: PropTypes.string.isRequired,
    }),
    ERROR: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(null)]),
    PRODUCTS: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
            
    }))

}