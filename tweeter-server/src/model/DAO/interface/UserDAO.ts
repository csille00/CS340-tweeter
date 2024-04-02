import {User} from "tweeter-shared/dist";

export interface UserDAO {
    insertUser(user: User): Promise<void>
    deleteUser(user: User): Promise<void>
    getUserByAlias(alias: String)
}