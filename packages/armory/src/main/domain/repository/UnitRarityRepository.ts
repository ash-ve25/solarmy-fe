import {EntityRepository, Repository} from "typeorm";
import {UnitRarity} from "../entity/UnitRarity";

@EntityRepository(UnitRarity)
export class UnitRarityRepository extends Repository<UnitRarity> {

}
