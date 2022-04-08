import {RpcException} from "@nestjs/microservices";

export class DomainError extends RpcException {

    constructor(error = 'Domain exception') {
        super(error);
    }

    static throw(msg?) {
        throw new DomainError(msg);
    }

    static ifThrow(val, msg?) {
        if (val) {
            throw new DomainError(msg);
        }
    }
}
