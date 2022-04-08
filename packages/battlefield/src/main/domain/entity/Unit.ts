import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {
    DeployedUnitReleasedEvent,
    DomainError,
    InvalidArgumentError,
    UnitClaimedEvent,
    UnitDelistedEvent,
    UnitDeployedEvent,
    UnitEnqueuedEvent
} from "@solar/service-provider";
import {UnitStatus} from "../enum/UnitStatus";
import {Config} from "../../Config";

@Entity()
export class Unit {

    @PrimaryColumn()
    id: string;

    @Column({
        type: 'varchar',
        name: 'account_id',
        nullable: false
    })
    accountId: string;

    @Column({
        default: 1
    })
    time: number;

    @Column({
        default: UnitStatus.Pending
    })
    status: UnitStatus = UnitStatus.Pending;

    @Column({
        default: 0
    })
    reward: number

    @Column({
        type: "timestamp",
        name: 'release_at'
    })
    releaseAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    //removed manually
    delist() {
        return [
            UnitDelistedEvent.build({
                unitId: this.id
            })
        ]
    }

    //removed by time
    release() {
        DomainError.ifThrow(this.status !== UnitStatus.Pending);

        this.status = UnitStatus.ReadyToClaim;

        return [
            DeployedUnitReleasedEvent.build({
                unitId: this.id
            })
        ];
    }

    enqueueCheck() {
        return [
            UnitEnqueuedEvent.build({
                unitIds: [this.id],
                accountId: this.accountId
            })
        ];
    }

    claim() {
        DomainError.ifThrow(this.status !== UnitStatus.ReadyToClaim);

        return [
            UnitClaimedEvent.build({
                unitId: this.id
            })
        ]
    }

    isInWallet(list = []) {
        return !!list.find(item => item.address === this.id);
    }

    static create(context) {
        const {
            accountId,
            unitId,
            time
        } = context;

        InvalidArgumentError.ifThrow(!accountId, 'Account id is required for unit');

        const u = new Unit();

        u.accountId = accountId;
        u.id = unitId;
        u.releaseAt = new Date();
        u.time = time;
        u.status = UnitStatus.Pending;
        u.reward = time * Config.game.rewardPerDay;

        u.releaseAt.setDate(u.releaseAt.getDate() + time)

        return {
            result: u,
            events: [
                UnitDeployedEvent.build({
                    unitId: u.id
                })
            ]
        }
    }
}
