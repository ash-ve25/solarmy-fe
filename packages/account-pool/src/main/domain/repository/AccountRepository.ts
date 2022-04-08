import {EntityRepository, Repository} from "typeorm";
import {Account} from "../entity/Account";

@EntityRepository(Account)
export class AccountRepository extends  Repository<Account> {

}
