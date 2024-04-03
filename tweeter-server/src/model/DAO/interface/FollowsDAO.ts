import {User, DataPage} from "tweeter-shared";

export interface FollowsDAO {
    getFollower(follower: User, followee: User): Promise<User | undefined>
    insertFollower(follower: User, followee: User): Promise<void>
    deleteFollower(follower: User, followee: User): Promise<void>
    getPageOfFollowers(followeeHandle: string, lastUser: User | undefined, limit: number): Promise<DataPage<User>>
    getPageOfFollowees(followerHandle: string, lastFollowee: User | undefined, limit: number): Promise<DataPage<User>>
}