import {InjectConnection} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UnitDAO {

    constructor(
        @InjectConnection()
        private readonly connection: Connection
    ) {
    }

    findOneByIdOrFail(id) {
        return this.connection.createQueryBuilder()
            .select('unit')
            .from('unit', 'unit')
            .where('unit.id = :id',{id})
            .getOneOrFail();
    }

    findOneByAccountIdAndIdOrFail(context) {
        const {unitId: id, accountId} = context;

        return this.connection.createQueryBuilder()
            .select('unit')
            .from('unit', 'unit')
            .where('unit.id = :id and unit.accountId = :accountId',{id, accountId})
            .getOneOrFail();
    }

    findByAccountId(accountId) {
        return this.connection.createQueryBuilder()
            .select('unit')
            .from('unit', 'unit')
            .where('unit.accountId = :accountId',{accountId})
            .getMany();
    }
}
