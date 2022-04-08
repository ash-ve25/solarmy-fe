import {EntityRepository} from "typeorm";
import {Unit} from "../entity/Unit";
import {BaseRepository} from "typeorm-transactional-cls-hooked";

@EntityRepository(Unit)
export class UnitRepository extends BaseRepository<Unit> {

    findOneByAccountIdAndIdOrFail(context) {
        const {accountId, unitId: id} = context;

        return this.findOneOrFail({
            where: {
                accountId,
                id
            }
        })
    }

    findForRelease() {
        return this.createQueryBuilder()
            .select('unit')
            .from(Unit, 'unit')
            .where('CAST (unit.release_at AS TIMESTAMP) <= now() and unit.status = \'PENDING\'')
            .limit(20)
            .getMany()
    }
}
