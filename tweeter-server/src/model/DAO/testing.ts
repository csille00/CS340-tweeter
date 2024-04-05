import {DynamoAuthTokenDAO} from "./Dynamo/DynamoAuthTokenDAO";
import {AuthToken, FollowerStatusRequest, LoginRequest, Status, User, UserRequest} from "tweeter-shared";
import {DynamoUserDAO} from "./Dynamo/DynamoUserDAO";
import {UserService} from "../service/UserService";
import {FollowService} from "../service/FollowService";
import {StatusService} from "../service/StatusService";
import {DynamoS3Dao} from "./Dynamo/DynamoS3Dao";
import { handler } from "../../lambda/LoginLambda"
import {PostStatusRequest, StatusItemsRequest, UserItemsRequest} from "tweeter-shared/dist/model/net/Request";
import {LoadUserItemsResponse} from "tweeter-shared/dist/model/net/Response";
import {ServerFacade} from "tweeter-web/src/model/net/ServerFacade";
import {LoginPresenter} from "tweeter-web/src/presenter/LoginPresenter";
import {AuthenticationView} from "tweeter-web/src/presenter/AuthenticationPresenter";

const authTokenDao = new DynamoAuthTokenDAO()
const userDao = new DynamoUserDAO()
const s3Dao = new DynamoS3Dao()
const asyncFunc = async () => {
    console.log("hello")
    try{
        await userDao.incrementFollowerCount("@cass")
        const user = await userDao.getUserByAlias("@cass")
        console.log(user)
        // await authTokenDao.deleteAuthToken("asd")
    } catch (e: any) {
        console.log("loser.")
    }
}
// asyncFunc().then()

const userService = new UserService()
const followService = new FollowService()
const statusService = new StatusService()

const uintArray = [] as unknown as Uint8Array
const str = "hello";
const bytes = new Uint8Array(str.length);

for (let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
}

// const json: JSON = "{"token":{"_token":"b0542ab1-6594-42fc-94cf-8a42bf40fd76","_timestamp":1712254250011},"user":{"_firstName":"connor1","_lastName":"ellus","_alias":"conman","_imageUrl":"https://lambdas-csille00.s3.us-west-2.amazonaws.com/image/conman-profile-picture"},"pageSize":10,"lastItem":null}"

// "{"token":{"_token":"b0542ab1-6594-42fc-94cf-8a42bf40fd76","_timestamp":1712254250011},"user":{"_firstName":"connor1","_lastName":"ellus","_alias":"conman","_imageUrl":"https://lambdas-csille00.s3.us-west-2.amazonaws.com/image/conman-profile-picture"},"pageSize":10,"lastItem":null}"

async function testMain(){
    // const connorUserAndAuth = await userService.login("conman", "asd");
    // console.log(connorUserAndAuth)
    // const cassidyUserAndAuth = await userService.login( "@cass", "Password123")
    // await userService.follow(connorUserAndAuth[1], cassidyUserAndAuth[0]);
    // const status = new Status("TEST POST", connorUserAndAuth[0], Date.now())
    // await statusService.postStatus(connorUserAndAuth[1],status)
    // const result1 = await userService.getFollowersCount(connorUserAndAuth[1], connorUserAndAuth[0])
    // const result2 = await userService.getFolloweesCount(connorUserAndAuth[1], connorUserAndAuth[0])
    // const result3 = await statusService.loadMoreStoryItems(connorUserAndAuth[1], connorUserAndAuth[0], 10, null)
    var json1 = {
        "token": {"_token": "56018204-8ad1-4aff-910f-6d330950a89f", "_timestamp": 1712282297976},
        "user": {
            "_firstName": "@cassidy5",
            "_lastName": "cass",
            "_alias": "ellis",
            "_imageUrl": "https://lambdas-csille00.s3.us-west-2.amazonaws.com/image/ellis-profile-picture"
        },
        "pageSize": 10,
        "lastItem": null
    }

    var json2 = {"token":{"_token":"6ac0a1b9-44ec-4593-9e40-bc8123fee0a6","_timestamp":1712286806.803},"user":{"_firstName":"cassidellis","_lastName":"ellis","_alias":"@cassidellis","_imageUrl":"https://lambdas-csille00.s3.us-west-2.amazonaws.com/image/{fileName}"},"pageSize":10,"lastItem":null} as unknown as StatusItemsRequest
    var json3 = {"token":{"_token":"eef627fa-9690-4ecd-8b9e-6a767c72ffb2","_timestamp":1712287448.866},"status":{"_post":"@cassidellis hey","user":{"_firstName":"cassidy","_lastName":"ellis","_alias":"@cass","_imageUrl":""},"_timestamp":1712273193556,"_segments":[{"_text":"@cassidellis","_startPostion":0,"_endPosition":12,"_type":"Alias"},{"_text":" hey","_startPostion":12,"_endPosition":16,"_type":"Text"}]}} as unknown as PostStatusRequest
    var getFollowerCountJson = {"user":{"_firstName":"Cassidy","_lastName":"ellis","_alias":"@cass","_imageUrl":"https://lambdas-csille00.s3.us-west-2.amazonaws.com/image/@cass-profile-picture"},"token":{"_token":"e967f0ff-c97f-4d79-b1e4-597f62cfcbcb","_timestamp":1712289911789}} as unknown as UserRequest
    var loadMoreFollowersJson = {"token":{"_token":"e967f0ff-c97f-4d79-b1e4-597f62cfcbcb","_timestamp":1712289911789},"user":{"_firstName":"Cassidy","_lastName":"ellis","_alias":"@cass","_imageUrl":"https://lambdas-csille00.s3.us-west-2.amazonaws.com/image/@cass-profile-picture"},"pageSize":10,"lastItem":null} as unknown as UserItemsRequest
    var loadMoreFeedItems = {"token":{"_token":"36747caf-52f3-43f3-8d6b-486b882b83c0","_timestamp":1712312079.005},"user":{"_firstName":"cassidy","_lastName":"ellis","_alias":"@cass","_imageUrl":"https://lambdas-csille00.s3.us-west-2.amazonaws.com/image/@cass-profile-picture"},"pageSize":10,"lastItem":null} as unknown as StatusItemsRequest
    var isFollowerStatus = {"user":{"_firstName":"cassidy","_lastName":"ellis","_alias":"@cass","_imageUrl":"https://lambdas-csille00.s3.us-west-2.amazonaws.com/image/@cass-profile-picture"},"token":{"_token":"ad5ff250-93df-4f8e-bd60-adf710b55cf3","_timestamp":1712314452.292},"selectedUser":{"_firstName":"connor","_lastName":"ellis","_alias":"@connor","_imageUrl":"https://lambdas-csille00.s3.us-west-2.amazonaws.com/image/@connor-profile-picture"}} as unknown as FollowerStatusRequest
    var loginJson = {"username":"@timmy","password":"asdf"} as unknown as LoginRequest
    // var response = await handler(loginJson)

    // console.log(response)
    // console.log(result1, '\n', result2, '\n', result2, '\n', result3, '\n')

}
testMain()
console.log("running test")