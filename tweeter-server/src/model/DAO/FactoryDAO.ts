import {AuthTokenDAO} from "./interface/AuthTokenDAO";
import {FeedDAO} from "./interface/FeedDAO";
import {FollowsDAO} from "./interface/FollowsDAO";
import {StoryDAO} from "./interface/StoryDAO";
import {UserDAO} from "./interface/UserDAO";

export interface FactoryDAO {
    getAuthTokenDAO(): AuthTokenDAO
    getFeedDAO(): FeedDAO
    getFollowsDAO(): FollowsDAO
    getStoryDAO(): StoryDAO
    getUserDAO(): UserDAO
}