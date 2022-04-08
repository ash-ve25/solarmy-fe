import {ExecutionContext} from "@nestjs/common";
import {GqlExecutionContext} from "@nestjs/graphql";

export function parseRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const grahpqlReq = ctx.getContext().req;

    return grahpqlReq || context.switchToHttp().getRequest();
}
