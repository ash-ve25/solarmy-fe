import {InjectConnection} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import {Injectable} from "@nestjs/common";

@Injectable()
export class AccountDAO {

    constructor(
        @InjectConnection()
        private readonly connection: Connection
    ) {
    }

    findOneByIdOrFail(id) {
        return this.connection.createQueryBuilder()
            .select('account')
            .from('account', 'account')
            .where('account.id = :id',{id})
            .getOneOrFail();
    }

    findOneByUsernameOrfail(username) {
        return this.connection.createQueryBuilder()
            .select('account')
            .from('account', 'account')
            .where('account.username = :username',{username})
            .getOneOrFail();
    }
}
