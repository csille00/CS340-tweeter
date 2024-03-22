import {User} from "../domain/User";
import {PostSegment} from "../domain/PostSegment";

export interface StatusDto {
    readonly _post: string;
    readonly _user: User;
    readonly _timestamp: number;
    readonly _segments: PostSegment[];
}