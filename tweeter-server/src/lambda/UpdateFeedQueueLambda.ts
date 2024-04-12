import {Status} from "tweeter-shared";
import {StatusService} from "../model/service/StatusService";

export const handler = async function (event: any) {
    console.log("ignore; just for baad debugging",event);
    for (let i = 0; i < event.Records.length; ++i) {
        const { body } = event.Records[i];
        const parsedBody = JSON.parse(body);
        const status = Status.fromJson(JSON.stringify(parsedBody.message))
        const aliasArray: string[] = parsedBody.user
        // console.log(body)
        // const status = Status.fromJson(status)
        if(status !== null){
            const statusService = new StatusService()

            await statusService.postFeedQueue(status, aliasArray);
        }
    }
    return null;
};