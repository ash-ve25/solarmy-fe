import {RpcException} from "@nestjs/microservices";

export class InvalidArgumentError extends RpcException {

    constructor(error = 'Invalid argument exception') {
        super(error);
    }

    static throw(msg?) {
        throw new InvalidArgumentError(msg);
    }

    static ifThrow(val, msg?) {
        if (val) {
            throw new InvalidArgumentError(msg);
        }
    }
}
