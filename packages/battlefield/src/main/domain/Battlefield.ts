import {Injectable} from "@nestjs/common";
import {UnitRepository} from "./repository/UnitRepository";
import {EventBus} from "@nestjs/cqrs";
import {Blockchain, InvalidArgumentError} from "@solar/service-provider";
import {Unit} from "./entity/Unit";
import {defaultIfEmpty, firstValueFrom} from "rxjs";
import {Config} from "../Config";
import {Transactional} from "typeorm-transactional-cls-hooked";

@Injectable()
export class Battlefield {

    constructor(
        private blockchain: Blockchain,
        private readonly unitRepository: UnitRepository,
        private readonly eventBus: EventBus
    ) {
    }

    async deployUnit(context) {
        const {unitId} = context;

        const deployed = await this.unitRepository.findOne(unitId);

        InvalidArgumentError.ifThrow(!!deployed, 'Can not to deploy unit twice');

        const {result, events} = Unit.create(context);

        const list: any = await firstValueFrom(this.blockchain.findAccountNFTs({
            publicAddress: context.accountId
        }));

        // const inWallet = result.isInWallet(list);
        //
        // InvalidArgumentError.ifThrow(!inWallet, 'Can not to deploy not own unit');

        await this.unitRepository.save(result);

        this.eventBus.publishAll(events);

        return result;
    }

    async delistUnit(context) {
        const unit = await this.unitRepository.findOneByAccountIdAndIdOrFail(context)

        const list: any = await firstValueFrom(this.blockchain.findAccountNFTs({
            publicAddress: context.accountId
        }));

        InvalidArgumentError.ifThrow(!unit.isInWallet(list), 'Can not to delist not own unit');

        this.eventBus.publishAll(unit.delist());

        await this.unitRepository.delete(unit.id);

        return unit;
    }

    //temporary disabled
    async enqueueUnitChecks() {
        const list = await this.unitRepository.find();

        const events = list.map(u => u.enqueueCheck()).flat();

        this.eventBus.publishAll(events);
    }

    //temporary disabled
    async dequeueUnitCheck(context) {

        const {unitId} = context;

        const unit = await this.unitRepository.findOneOrFail(unitId);
        const {accountId} = unit;

        const list = await firstValueFrom(this.blockchain.findAccountNFTs({
            publicAddress: accountId
        }));

        if (unit.isInWallet(list)) {
            return;
        }

        const events = unit.delist();

        await this.unitRepository.delete(unitId);

        this.eventBus.publishAll(events);
    }

    //TODO make as async
    async releaseUnits() {
        try {
            const list = await this.unitRepository.findForRelease();

            const {result, events}: any = list.reduce((acc: any, unit: Unit) => {
                let events = [];

                try {
                    events = unit.release();

                    acc.result.add(unit.id)
                } catch (e) {
                }

                return {
                    result: acc.result,
                    events: [...acc.events, ...events]
                }
            }, {result: new Set(), events: []});

            const filtered = list.filter(({id}) => result.has(id));

            !!filtered.length && (await this.unitRepository.save(filtered));

            this.eventBus.publishAll(events);
        } catch (e) {
            console.log('release', e)
            // throw e;
        }

        return {};
    }

    @Transactional()
    async claimUnit(context) {
        try {
            const unit = await this.unitRepository.findOneByAccountIdAndIdOrFail(context);

            const list: any = await firstValueFrom(this.blockchain.findAccountNFTs({
                publicAddress: unit.accountId
            }));

            InvalidArgumentError.ifThrow(!unit.isInWallet(list), 'Can not to claim not own unit');

            const events = unit.claim();

            await this.unitRepository.remove(unit);

            await firstValueFrom(this.blockchain.sendAmmo({
                walletAddress: unit.accountId,
                amount: unit.reward
            }).pipe(defaultIfEmpty({})));

            this.eventBus.publishAll(events);

            return unit;
        } catch (e) {
            console.log('claim', e)
        }
    }
}
