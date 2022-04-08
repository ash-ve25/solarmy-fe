import {Env} from "@solar/service-provider";

const Config = {
    cron: {
        battlefield: {
            unitCheckPeriod: Env.get<string>('BATTLEFIELD_UNIT_CHECK_PERIOD'),
            unitReleasePeriod: Env.get<string>('BATTLEFIELD_RELEASE_PERIOD')
        }
    },
    service: {
        battlefield: {
            options: {
                host: Env.get('BATTLEFIELD_HOST'),
                port: Env.getAsInt('BATTLEFIELD_TCP_PORT')
            }
        }
    }
}

export {Config};
