import {TweeterRequest} from "tweeter-shared/dist/model/net/Request";

export class ClientCommunicator {
    private SERVER_URL: string;
    constructor(SERVER_URL: string) {
        this.SERVER_URL = SERVER_URL;
    }

    async doPost<T extends TweeterRequest>(req: T, endpoint: string): Promise<JSON> {
        const url = this.SERVER_URL + endpoint;
        const request = {
            method: "post",
            headers: new Headers({
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            }),
            body: JSON.stringify(req),
        };

        try {
            console.log("calling ", url, "with", request);
            const resp: Response = await fetch(url, request);
            if (resp.ok) {
                return await resp.json();
            } else {
                const error = await resp.json();
                throw new Error(error.errorMessage);
            }

        } catch (err) {
            throw new Error(
                "Client communicator doPost failed:\n" + (err as Error).message
            );
        }
    }
}