import {Controller, Get} from "@nestjs/common";
import {HealthCheck, HealthCheckService, MicroserviceHealthIndicator} from "@nestjs/terminus";
import {Transport} from "@nestjs/microservices";

@Controller()
export class HealthController {

    constructor(
        private healthService: HealthCheckService,
        private indicator: MicroserviceHealthIndicator
    ) {
    }

    @Get('/health')
    @HealthCheck()
    health() {
        return this.healthService.check([
            async () => this.indicator.pingCheck('tcp', {
                transport: Transport.TCP,
                options: { host: '127.0.0.1', port: 1001 }
            })
        ]);
    }
}

