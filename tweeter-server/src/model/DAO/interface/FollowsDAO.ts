import {User, DataPage} from "tweeter-shared";

export interface FollowsDAO {
    getFollower(follower: User, followee: User): Promise<User | undefined>
    insertFollower(follower: User, followee: User): Promise<void>
    deleteFollower(follower: User, followee: User): Promise<void>
    getPageOfFollowers(followeeHandle: string, lastUser: User | null, limit: number): Promise<DataPage<User> | undefined>
    getPageOfFollowees(followerHandle: string, lastFollowee: User | null, limit: number): Promise<DataPage<User> | undefined>
}