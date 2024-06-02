import { User } from "../models/models";

interface Wrapper {
    user: User
}
export const selectUserLogin = ({user}: Wrapper) => user.login;