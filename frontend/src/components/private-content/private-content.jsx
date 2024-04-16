import {checkAccess} from '../../utils'
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { selectUserRole } from "../../selectors";
import { ERROR, PROP_TYPE } from "../../constants";
import { Title } from '../title/Title';

export const PrivateContent = ({children, access, serverError = null}) => {
    const userRole = useSelector(selectUserRole);

    const accessError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENIED;

    const error = serverError || accessError;

    return error ? <Title title={error} size="50px" /> : children;

};

PrivateContent.propTypes = {
    children: PropTypes.node.isRequired,
    access: PropTypes.arrayOf(PROP_TYPE.ROLE_ID).isRequired,
    serverError: PROP_TYPE.ERROR,
}