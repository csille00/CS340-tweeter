import {Status} from "tweeter-shared";
import {StatusService} from "../model/service/StatusService";

export const handler = async function (event: any) {
    console.log(event);
    for (let i = 0; i < event.Records.length; ++i) {
        const { body } = event.Records[i];
        console.log(body)
        const status = Status.fromJson(body)
        if(status !== null){
            const statusService = new StatusService()
            await statusService.postStatusQueue(status);
        }
    }
    return null;
};