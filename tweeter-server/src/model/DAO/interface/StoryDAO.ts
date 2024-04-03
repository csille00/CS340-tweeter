import {DataPage, Status, User} from "tweeter-shared/dist";

export interface StoryDAO {
    postStory(user: User, story: Status): Promise<void>
    getUserStoryPage(user: User, lastStatus: Status | null, limit: number): Promise<DataPage<Status>>
    deleteStory(story: Status, user: User)
}