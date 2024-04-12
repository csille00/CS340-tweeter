import {DataPage, Status, User} from "tweeter-shared";

export interface FeedDAO {
    postFeed(alias: string, feed: Status): Promise<void>
    getUserFeedPage(user: User, lastFeed: Status | null, limit: number): Promise<DataPage<Status>>
}