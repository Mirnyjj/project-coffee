import {checkAccess} from '../../utils'
import { selectUserRole } from "../../selectors";
import { ERROR } from "../../constants";
import { Title } from '../title/Title';
import { useAppSelector } from '../../reducers/hooks/hooks';

type Props = {
    access: number[]
  }

export const PrivateContent = ({access}: Props) => {
    const userRole = useAppSelector(selectUserRole);

    const accessError = checkAccess(access, userRole) ? undefined : ERROR.ACCESS_DENIED;

    return <Title title={accessError}/>
};
