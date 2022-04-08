import {throwError} from "rxjs";
import {
    ArgumentsHost,
    Catch,
    InternalServerErrorException,
    Logger,
    NotFoundException,
    ServiceUnavailableException
} from "@nestjs/common";
import {GqlExceptionFilter} from "@nestjs/graphql";
import {APP_FILTER} from "@nestjs/core";
import {RpcException} from "@nestjs/microservices";

@Catch()
export class ErrorFilter implements GqlExceptionFilter {

    private readonly logger: Logger = new Logger('ErrorFilter');

    catch(exception: any, host: ArgumentsHost): any {
        let code;
        let message;

        if (typeof exception === 'string') {
            message = exception
        } else {
            code = exception?.code;
            message = exception?.message;
        }

        this.logger.error(message);

        const strategy = {
            'ECONNREFUSED': () => new ServiceUnavailableException(),
            404: () => new NotFoundException(message),
            fallBack: () =>  new InternalServerErrorException(message)
        };

        return strategy[code] ? strategy[code]() : strategy.fallBack();
    }

    static provideFilter() {
        return {
            provide: APP_FILTER,
            useClass: ErrorFilter
        }
    }
}
