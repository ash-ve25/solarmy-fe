import {Injectable, Logger, NestInterceptor} from '@nestjs/common';
import {RmqContext} from "@nestjs/microservices";
import {EMPTY, Observable} from "rxjs";
import {catchError, mergeMap} from "rxjs/operators";
import {APP_INTERCEPTOR} from "@nestjs/core";

@Injectable()
export class AckInterceptor implements NestInterceptor {

    private logger = new Logger('AckInterceptor');

    intercept(executionContext, next): Observable<any> {
        const [, context] = executionContext.getArgs();

        const isAmq = context instanceof RmqContext;

        return !isAmq
            ? next.handle()
            : next.handle().pipe(
                catchError((e) => {
                    context?.getChannelRef()?.ack(context.getMessage());

                    this.logger.error(e.message);

                    return EMPTY;
                }),
                mergeMap(() => {
                    context?.getChannelRef()?.ack(context.getMessage());

                    return EMPTY;
                })
            );
    }

    static provideInterceptor() {
        return {
            provide: APP_INTERCEPTOR,
            useClass: AckInterceptor
        }
    }
}
