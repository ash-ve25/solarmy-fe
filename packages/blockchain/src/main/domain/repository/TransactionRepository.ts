import {EntityRepository, Repository} from "typeorm";
import {Transaction} from "../entity/Transaction";

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {

}
