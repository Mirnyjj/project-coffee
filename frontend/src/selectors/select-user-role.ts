import { User } from "../models/models";

interface Wrapper {
    user: User
}
export const selectUserRole = ({user}: Wrapper) => user.roleId;