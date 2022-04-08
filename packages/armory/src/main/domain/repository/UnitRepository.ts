import {EntityRepository, Repository} from "typeorm";
import {Unit} from "../entity/Unit";

@EntityRepository(Unit)
export class UnitRepository extends Repository<Unit> {

}
