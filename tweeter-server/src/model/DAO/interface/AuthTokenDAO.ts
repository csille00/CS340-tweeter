import {AuthToken} from "tweeter-shared/dist";

export interface AuthTokenDAO {
    getAuthToken(authToken: String): Promise<string | undefined>
    insertAuthToken(authToken: AuthToken, alias: string): Promise<void>
    deleteAuthToken(authToken: string): Promise<void>
    updateAuthToken(authToken: AuthToken, alias: string): Promise<void>
}