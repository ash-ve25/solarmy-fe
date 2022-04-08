import {Env} from "@solar/service-provider";

const Config = {
    http: {
        port: Env.getAsInt('HTTP_PORT'),
    },

    service: {
        authServer: {
            options: {
                host: Env.get('AUTH_SERVER_HOST'),
                port: Env.getAsInt('AUTH_SERVER_TCP_PORT')
            }
        },

        blockchain: {
            options: {
                host: Env.get('BLOCKCHAIN_HOST'),
                port: Env.getAsInt('BLOCKCHAIN_TCP_PORT')
            }
        },

        armory: {
            options: {
                host: Env.get('ARMORY_HOST'),
                port: Env.getAsInt('ARMORY_TCP_PORT')
            }
        },

        accountPool: {
            options: {
                host: Env.get('ACCOUNT_POOL_HOST'),
                port: Env.getAsInt('ACCOUNT_POOL_PORT')
            }
        },

        battlefield: {
            options: {
                host: Env.get('BATTLEFIELD_HOST'),
                port: Env.getAsInt('BATTLEFIELD_TCP_PORT')
            }
        }
    },

    jwt: {
        token: {
            secret: Env.get<string>('JWT_TOKEN_SECRET')
        },
    },

    isDev: Env.get('IS_DEV') === 'is_dev'
}

export {Config};
