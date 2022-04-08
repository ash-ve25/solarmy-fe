import {Injectable, Logger} from "@nestjs/common";
import {Cron, Scheduled} from 'nestjs-cron';
import {Config} from "../Config";
import {Battlefield} from "@solar/service-provider";
import {defaultIfEmpty, firstValueFrom, map} from "rxjs";

@Scheduled()
@Injectable()
export class BattlefieldCron {

    private logger = new Logger('Batllefield');

    constructor(
        private readonly battlefield: Battlefield
    ) {}

    //temporary removed
    // @Cron(Config.cron.battlefield.unitCheckPeriod)
    // async unitCheck() {
    //     try {
    //         await firstValueFrom(this.battlefield.enqueueUnitChecks().pipe(defaultIfEmpty({})));
    //     } catch (e) {
    //         console.log(e)
    //         this.logger.error(e.message);
    //     }
    //
    //     this.logger.log(`UnitCheck started at: ${(new Date().toISOString())}`)
    // }

    @Cron(Config.cron.battlefield.unitReleasePeriod)
    async releaseUnit() {
        try {
            await firstValueFrom(this.battlefield.releaseUnits().pipe(defaultIfEmpty({})));
        } catch (e) {
            console.log(e)
            this.logger.error(e.message);
        }

        this.logger.log(`UnitReleasing started at: ${(new Date().toISOString())}`)
    }
}
