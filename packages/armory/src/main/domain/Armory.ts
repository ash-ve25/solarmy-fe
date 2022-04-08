import {Injectable} from "@nestjs/common";
import {UnitRepository} from "./repository/UnitRepository";
import {Unit} from "./entity/Unit";
import {EventBus} from "@nestjs/cqrs";
import {Blockchain} from "@solar/service-provider";
import {firstValueFrom, forkJoin, map} from "rxjs";
import {HowIsRare} from "../infrastructure/HowIsRare";
import {UnitRarity} from "./entity/UnitRarity";
import {UnitRarityRepository} from "./repository/UnitRarityRepository";

@Injectable()
export class Armory {

    constructor(
        private blockchain: Blockchain,
        private readonly unitRepository: UnitRepository,
        private readonly unitRarityRepository: UnitRarityRepository,
        private readonly eventBus: EventBus,
        private readonly howIsRare: HowIsRare
    ) {
    }

    async createUnit(context) {
        const {result, events} = Unit.create(context)

        await this.unitRepository.save(result);

        this.eventBus.publishAll(events);

        return result;
    }

    async collectUnits(context) {
        const {accountId} = context;

        const list = await firstValueFrom(this.blockchain.findAccountNFTs({publicAddress: accountId})) || [];

        const units = list.map(item => Unit.create({...item, accountId}));

        await this.unitRepository.save(units.map(({result}) => result));

        this.eventBus.publishAll(units.map(({events}) => events).flat());

        return list;
    }

    async collectRarity() {
        const list = await firstValueFrom(forkJoin({
            list2d: this.howIsRare.collect2dSoldiers(),
            list3d: this.howIsRare.collect3dSoldiers()
        }).pipe(
            map(({list2d, list3d}) => [
                ...list2d.map(context => UnitRarity.create2d(context).result),
                ...list3d.map(context => UnitRarity.create3d(context).result),
            ])
        ));

        await this.unitRarityRepository.save(list);

        return true;
    }
}
