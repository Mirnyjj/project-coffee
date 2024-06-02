import { User } from "../models/models";

interface Wrapper {
    user: User
}
export const selectUserSession = ({user}: Wrapper) => user.session;
