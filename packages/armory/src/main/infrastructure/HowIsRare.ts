import {Injectable} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {map} from "rxjs";

@Injectable()
export class HowIsRare {

    private readonly url2d: string = 'https://howrare.is/api/v0.1/collections/solarmy2d';
    private readonly url3d: string = 'https://howrare.is/api/v0.1/collections/solarmy3d';

    constructor(
        private readonly client: HttpService
    ) {
    }

    collect2dSoldiers() {
        return this.client.get(this.url2d).pipe(
            map(({data}: any) => data?.result?.data?.items || [])
        )
    }

    collect3dSoldiers() {
        return this.client.get(this.url3d).pipe(
            map(({data}: any) => data?.result?.data?.items || [])
        )
    }
}
