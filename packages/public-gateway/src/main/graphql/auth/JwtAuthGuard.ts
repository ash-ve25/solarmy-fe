import {Reflector} from '@nestjs/core';
import {AuthGuard} from '@nestjs/passport';
import {ExecutionContext, Injectable} from '@nestjs/common';
import {parseRequest} from "../utils/parseRequest";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(private readonly reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext) {
        const handler = context.getHandler();

        const isPublic = this.reflector.get<boolean>('isPublic', handler);

        if (isPublic) {
            return true;
        }

        if (this.isSubscription(context)) {
            return true;
        }

        const isValid = await super.canActivate(context);

        return <boolean>isValid;
    }

    getRequest(context: ExecutionContext) {
        return parseRequest(context);
    }

    isSubscription(context: ExecutionContext) {
        return context.getArgByIndex(3)?.operation?.operation === 'subscription';
    }
}
