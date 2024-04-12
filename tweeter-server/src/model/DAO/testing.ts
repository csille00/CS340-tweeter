import {DynamoAuthTokenDAO} from "./Dynamo/DynamoAuthTokenDAO";
import {AuthToken, FollowerStatusRequest, LoginRequest, Status, User, UserRequest} from "tweeter-shared";
import {DynamoUserDAO} from "./Dynamo/DynamoUserDAO";
import {UserService} from "../service/UserService";
import {FollowService} from "../service/FollowService";
import {StatusService} from "../service/StatusService";
import {DynamoS3Dao} from "./Dynamo/DynamoS3Dao";
import { handler } from "../../lambda/UpdateFeedQueueLambda"
import {PostStatusRequest, StatusItemsRequest, UserItemsRequest} from "tweeter-shared/dist/model/net/Request";
import {LoadUserItemsResponse} from "tweeter-shared/dist/model/net/Response";
import {ServerFacade} from "tweeter-web/src/model/net/ServerFacade";
import {LoginPresenter} from "tweeter-web/src/presenter/LoginPresenter";
import {AuthenticationView} from "tweeter-web/src/presenter/AuthenticationPresenter";
import {SHA256} from "crypto-js";

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

    let mainUsername = "@cat";
    let followername = "@serpent";
    let password = "password";
    let imageUrl = "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/donald_duck.png";
    let firstName = "first";
    let lastName = "last";

    var json2 = {"token":{"_token":"6ac0a1b9-44ec-4593-9e40-bc8123fee0a6","_timestamp":1712286806.803},"user":{"_firstName":"cassidellis","_lastName":"ellis","_alias":"@cassidellis","_imageUrl":"https://lambdas-csille00.s3.us-west-2.amazonaws.com/image/{fileName}"},"pageSize":10,"lastItem":null} as unknown as StatusItemsRequest
    var json3 = {"token":{"_token":"eef627fa-9690-4ecd-8b9e-6a767c72ffb2","_timestamp":1712287448.866},"status":{"_post":"@cassidellis hey","user":{"_firstName":"cassidy","_lastName":"ellis","_alias":"@cass","_imageUrl":""},"_timestamp":1712273193556,"_segments":[{"_text":"@cassidellis","_startPostion":0,"_endPosition":12,"_type":"Alias"},{"_text":" hey","_startPostion":12,"_endPosition":16,"_type":"Text"}]}} as unknown as PostStatusRequest
    var getFollowerCountJson = {"user":{"_firstName":"Cassidy","_lastName":"ellis","_alias":"@cass","_imageUrl":"https://lambdas-csille00.s3.us-west-2.amazonaws.com/image/@cass-profile-picture"},"token":{"_token":"e967f0ff-c97f-4d79-b1e4-597f62cfcbcb","_timestamp":1712289911789}} as unknown as UserRequest
    var loadMoreFollowersJson = {"token":{"_token":"72d6501b-5cf3-4b77-aede-993534a9d2e8","_timestamp":1712726056.572},"user":{"_firstName":"first","_lastName":"last","_alias":"@cat","_imageUrl":"https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/donald_duck.png"},"pageSize":10,"lastItem":null} as unknown as UserItemsRequest
    var loadMoreFeedItems = {"token":{"_token":"36747caf-52f3-43f3-8d6b-486b882b83c0","_timestamp":1712312079.005},"user":{"_firstName":"cassidy","_lastName":"ellis","_alias":"@cass","_imageUrl":"https://lambdas-csille00.s3.us-west-2.amazonaws.com/image/@cass-profile-picture"},"pageSize":10,"lastItem":null} as unknown as StatusItemsRequest
    var isFollowerStatus = {"user":{"_firstName":"cassidy","_lastName":"ellis","_alias":"@cass","_imageUrl":"https://lambdas-csille00.s3.us-west-2.amazonaws.com/image/@cass-profile-picture"},"token":{"_token":"ad5ff250-93df-4f8e-bd60-adf710b55cf3","_timestamp":1712314452.292},"selectedUser":{"_firstName":"connor","_lastName":"ellis","_alias":"@connor","_imageUrl":"https://lambdas-csille00.s3.us-west-2.amazonaws.com/image/@connor-profile-picture"}} as unknown as FollowerStatusRequest
    var loginJson = {"username":"@timmy","password":"asdf"} as unknown as LoginRequest
    var postStatusQueue = {
        Records: [
            {
                messageId: '78689fec-417e-4daa-b33a-a5e9322b5943',
                receiptHandle: 'AQEB+lGZr2hz/s5pp8smYe7A1KOfA9u9ohEYmSTjabnibHYCLeb9mxt8YN/xV0QbUWO3EI9KKi+tOrW3pW1Y5iqD1xTZdw23q43xvv+xjKDxO09gbnNHvjtcHoV8eXncvXW2klrGowMRwb6fFXuwi+uvE9Q+6I15QdaYbHuhODW8G6h6HvAIxiB8Qmxh2QPFDGaqsth5DPZ2aB+V3CrYIBjJ04oCkQJE/vTITDbvJng0mqi0VJziRmSYZwI4sSr+//VdpO+iePo26rOYFVwYfXt5DMUI16eu4qTas7DtkGSaIhTFP+eJ7XQ+7sf1Q7xmeq7xbp+yAthGmASa4osnOsEJU+vNra2IKVMBfHfpYQ8AdCKZxAXIEjo8sM75xcA/vyJvZm1YnjdO6vef8W4YhKLzGQ==',
                body: '{"_post":"post from testing","user":{"_firstName":"first","_lastName":"last","_alias":"@cat","_imageUrl":"https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/donald_duck.png"},"_timestamp":1712722477443,"_segments":[{"_text":"test for feed queue (should be gnarly)","_startPostion":0,"_endPosition":38,"_type":"Text"}]}',
                attributes: [Object],
                messageAttributes: {},
                md5OfBody: '429f1a3c4a5cbcf24724c522aaa0d937',
                eventSource: 'aws:sqs',
                eventSourceARN: 'arn:aws:sqs:us-west-2:096981444592:PostStatusQueue',
                awsRegion: 'us-west-2'
            }
        ]
    }

    var postFeedEvent = {
        Records: [
            {
                messageId: '90c132f6-2811-4ea2-b160-4c86f76fd283',
                receiptHandle: 'AQEBfOyTDlDkNhRENND3N69HULb+yLiQDXPXLhMhaUVU7W4C0vA/bo5w0jqAlhnGHg9t50WxpNlduAlpi04lTHdlvrjUObVR78VTnbLXAaQs0UAHMI/2mZSyiyRUcIhjzpj9bXiDaSU+J0JUvg6PHjjRFOzvRcfyMjblRVRK9We23yahZcFbWMg8lTjIoakk2GLZRLQ7tLufsXPKhATfgFX3hDjmxkaFysHWNDNU5iIbRMHlS5iLlsD6bzaOyLtG6ziM9Dlgn9zmDW6a0ZCR18G+BOA3scgrQl9zqw2boKq4le2/QArJzyPrCqPYycyCaPk7gI06Z/CzKsKC8UDMOIJn7zYLvkxrvhRKVaeR+3aQjWS5+8hDrqdhIc1PZeFlThmRaOnp2zJgMyl1sLrVuRFDjA==',
                body: '{"message":{"_post":"hello from 340","user":{"_firstName":"first","_lastName":"last","_alias":"@cat","_imageUrl":"https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/donald_duck.png"},"_timestamp":1712769533319,"_segments":[{"_text":"hello from 340","_startPostion":0,"_endPosition":14,"_type":"Text"}]},"user":["@serpent1269","@serpent127","@serpent1270","@serpent1271","@serpent1272","@serpent1273","@serpent1274","@serpent1275","@serpent1276","@serpent1277","@serpent1278","@serpent1279","@serpent128","@serpent1280","@serpent1281","@serpent1282","@serpent1283","@serpent1284","@serpent1285","@serpent1286","@serpent1287","@serpent1288","@serpent1289","@serpent129","@serpent1290","@serpent1291","@serpent1292","@serpent1293","@serpent1294","@serpent1295","@serpent1296","@serpent1297","@serpent1298","@serpent1299","@serpent13","@serpent130","@serpent1300","@serpent1301","@serpent1302","@serpent1303","@serpent1304","@serpent1305","@serpent1306","@serpent1307","@serpent1308","@serpent1309","@serpent131","@serpent1310","@serpent1311","@serpent1312","@serpent1313","@serpent1314","@serpent1315","@serpent1316","@serpent1317","@serpent1318","@serpent1319","@serpent132","@serpent1320","@serpent1321","@serpent1322","@serpent1323","@serpent1324","@serpent1325","@serpent1326","@serpent1327","@serpent1328","@serpent1329","@serpent133","@serpent1330","@serpent1331","@serpent1332","@serpent1333","@serpent1334","@serpent1335","@serpent1336","@serpent1337","@serpent1338","@serpent1339","@serpent134","@serpent1340","@serpent1341","@serpent1342","@serpent1343","@serpent1344","@serpent1345","@serpent1346","@serpent1347","@serpent1348","@serpent1349","@serpent135","@serpent1350","@serpent1351","@serpent1352","@serpent1353","@serpent1354","@serpent1355","@serpent1356","@serpent1357","@serpent1358"]}',
                attributes: [Object],
                messageAttributes: {},
                md5OfBody: 'ebfdd7e79785c9faa3b07a4e874d89f2',
                eventSource: 'aws:sqs',
                eventSourceARN: 'arn:aws:sqs:us-west-2:096981444592:UpdateFeedQueue',
                awsRegion: 'us-west-2'
            }
        ]
    }
    // var response = await handler(loginJson)
    var response = await handler(postFeedEvent)
    console.log(response)

    // for(let i = 0; i < 9500; i++){
    //     try {
    //         userDao.deleteUser(followername + i)
    //     } catch (e){}
    // }
    // console.log(result1, '\n', result2, '\n', result2, '\n', result3, '\n')

}
testMain()
console.log("running test")