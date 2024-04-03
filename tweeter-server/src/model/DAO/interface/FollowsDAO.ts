import {User, DataPage} from "tweeter-shared";

export interface FollowsDAO {
    getFollower(follower: User, followee: User): Promise<User | undefined>
    insertFollower(follower: User, followee: User): Promise<void>
    deleteFollower(follower: User, followee: User): Promise<void>
    getPageOfFollowers(followeeHandle: string, lastUser: string | undefined = undefined, limit: number = 5): Promise<DataPage<User>>
    getPageOfFollowees(followerHandle: string, lastFollowee: string | undefined = undefined, limit: number = 5): Promise<DataPage<User>>
}