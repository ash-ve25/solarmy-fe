import {Module} from "@nestjs/common";
import {BattlefieldCron} from "./cron/BattlefieldCron";
import {Battlefield} from "@solar/service-provider";
import {Config} from "./Config";

@Module({
    providers: [
        BattlefieldCron,
        Battlefield.provideClient(Config.service.battlefield)
    ]
})
export class AppModule {}
