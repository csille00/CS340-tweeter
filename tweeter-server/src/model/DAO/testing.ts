import {DynamoAuthTokenDAO} from "./Dynamo/DynamoAuthTokenDAO";
import {AuthToken, User} from "tweeter-shared";
import {DynamoUserDAO} from "./Dynamo/DynamoUserDAO";

const authTokenDao = new DynamoAuthTokenDAO()
const userDao = new DynamoUserDAO()
// const authTokenDao = new DynamoAuthTokenDAO()
// const authTokenDao = new DynamoAuthTokenDAO()
// const authTokenDao = new DynamoAuthTokenDAO()
const asyncFunc = async () => {
    console.log("hello")
    try{
        await userDao.deleteUser(new User("hi", "hey", "@hey", "234"));
        // await authTokenDao.deleteAuthToken("asd")
    } catch (e: any) {
        console.log("loser.")
    }
}
asyncFunc().then()