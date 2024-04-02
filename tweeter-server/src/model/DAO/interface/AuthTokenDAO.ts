import {AuthToken} from "tweeter-shared/dist";

export interface AuthTokenDAO {
    getAuthToken(authToken: String): Promise<AuthToken | undefined>
    insertAuthToken(authToken: AuthToken): Promise<void>
    deleteAuthToken(authToken: string): Promise<void>
    updateAuthToken(authToken: AuthToken): Promise<void>
}