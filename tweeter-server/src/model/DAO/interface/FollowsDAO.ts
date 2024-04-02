import {User, DataPage} from "tweeter-shared";

export interface FollowsDAO {
    getFollower(follower: User): Promise<User | undefined>
    insertFollower(follower: User): Promise<void>
    deleteFollower(follower: User): Promise<void>
    getPageOfFollowers(followeeHandle: string, lastUser: string | undefined = undefined, limit: number = 5): Promise<DataPage<User>>
    getPageOfFollowees(followerHandle: string, lastFollowee: string | undefined = undefined, limit: number = 5): Promise<DataPage<User>>
}