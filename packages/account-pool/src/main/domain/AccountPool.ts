import {Injectable} from "@nestjs/common";
import {AccountRepository} from "./repository/AccountRepository";
import {Account} from "./entity/Account";
import {EventBus} from '@nestjs/cqrs';

@Injectable()
export class AccountPool {

    constructor(
        private accountRepository: AccountRepository,
        private eventBus: EventBus
    ) {
    }

    async createAccount(context) {
        const {
            username,
            password
        } = context;

        const {result, event} = Account.create({username, password});

        await this.accountRepository.save(result);

        this.eventBus.publish(event);

        return result;
    }

    async changeAccountUsername(context) {
        const {
            accountId,
            username
        } = context;

        const account = await this.accountRepository.findOneOrFail(accountId);

        try {
            const events = account.changeUsername(username);

            await this.accountRepository.save(account);

            this.eventBus.publishAll(events);
        } catch (e) {}

        return account;
    }
}
