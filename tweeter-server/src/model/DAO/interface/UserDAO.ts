import {User} from "tweeter-shared/dist";

export interface UserDAO {
    insertUser(user: User, passwordHash: string): Promise<void>
    deleteUser(user: string): Promise<void>
    getUserByAlias(alias: String): Promise<[User | undefined, string]>
    getFollowerCount(alias: string): Promise<number>
    getFolloweeCount(alias: string): Promise<number>
    incrementFollowerCount(alias: string): Promise<number | undefined>
    incrementFolloweeCount(alias: string): Promise<number | undefined>
    decrementFollowerCount(alias: string): Promise<number | undefined>
    decrementFolloweeCount(alias: string): Promise<number | undefined>
}