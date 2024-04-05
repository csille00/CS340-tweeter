import {FactoryDAO} from "./FactoryDAO";
import {AuthTokenDAO} from "./interface/AuthTokenDAO";
import {FeedDAO} from "./interface/FeedDAO";
import {FollowsDAO} from "./interface/FollowsDAO";
import {StoryDAO} from "./interface/StoryDAO";
import {UserDAO} from "./interface/UserDAO";
import {DynamoAuthTokenDAO} from "./Dynamo/DynamoAuthTokenDAO";
import {DynamoFeedDAO} from "./Dynamo/DynamoFeedDAO";
import {DynamoFollowsDAO} from "./Dynamo/DynamoFollowsDAO";
import {DynamoStoryDAO} from "./Dynamo/DynamoStoryDAO";
import {DynamoUserDAO} from "./Dynamo/DynamoUserDAO";
import {S3Dao} from "./interface/S3Dao";
import {DynamoS3Dao} from "./Dynamo/DynamoS3Dao";

export class DynamoFactoryDAO implements FactoryDAO {
    getAuthTokenDAO(): AuthTokenDAO {
        return new DynamoAuthTokenDAO();
    }

    getFeedDAO(): FeedDAO {
        return new DynamoFeedDAO();
    }

    getFollowsDAO(): FollowsDAO {
        return new DynamoFollowsDAO();
    }

    getStoryDAO(): StoryDAO {
        return new DynamoStoryDAO();
    }

    getUserDAO(): UserDAO {
        return new DynamoUserDAO();
    }

    getS3DAO(): S3Dao {
        return new DynamoS3Dao();
    }

}