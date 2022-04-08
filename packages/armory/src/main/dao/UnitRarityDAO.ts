import {InjectConnection} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UnitRarityDAO {

    constructor(
        @InjectConnection()
        private readonly connection: Connection
    ) {
    }

    findOneByIdOrFail(id) {
        return this.connection.createQueryBuilder()
            .select('unit_rarity')
            .from('unit_rarity', 'unit_rarity')
            .where('unit_rarity.id = :id',{id})
            .getOneOrFail();
    }
}
