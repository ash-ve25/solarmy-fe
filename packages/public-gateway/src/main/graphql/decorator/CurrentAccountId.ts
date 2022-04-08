import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {parseRequest} from "../utils/parseRequest";

export const CurrentAccountId = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const req = parseRequest(context);

        const {accountId} = req.user || {};

        return accountId;
    }
);
