import { InUser } from "./InUser";

export interface InAuthState {
    isAuthenticated: boolean;
    dataUser: InUser;
}