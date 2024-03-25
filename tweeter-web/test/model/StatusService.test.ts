import {AuthToken, User} from 'tweeter-shared';
import "@testing-library/jest-dom"
import "isomorphic-fetch"
import {StatusService} from "../../../tweeter-server/src/model/service/StatusService";


describe('StatusService', () => {

    it('client side service gets user story page', async() => {
        const service = new StatusService();

        const token = new AuthToken("test", 123);
        const user = new User("Amy", "Ames", "@amy", "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/daisy_duck.png")

        const resp = await service.loadMoreStoryItems(token, user, 10, null);
        expect(resp[1]).toBeTruthy()
        expect(resp[0].length).toBe(10)
    });
});