import {ArgumentsHost, Catch, RpcExceptionFilter} from "@nestjs/common";
import {throwError} from "rxjs";
import {APP_FILTER} from "@nestjs/core";
import {RpcException} from "@nestjs/microservices";
import {EntityNotFoundError} from "typeorm";

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements RpcExceptionFilter {

    catch(exception: any, host: ArgumentsHost): any {
        const e = new RpcException('Entity not found');
        e['code'] = 404;

        return throwError(e);
    }

    static provideFilter() {
        return {
            provide: APP_FILTER,
            useClass: EntityNotFoundFilter
        }
    }
}
