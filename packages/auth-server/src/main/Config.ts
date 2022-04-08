import {Env} from "@solar/service-provider";

const Config = {
    http: {
        port: Env.getAsInt('HTTP_PORT'),
    },

    tcp: {
        port: Env.getAsInt('TCP_PORT'),
        host: Env.get<string>('TCP_HOST')
    },

    jwt: {
        token: {
            expiresIn: Env.getAsInt('JWT_TOKEN_EXPIRES_IN'),
            secret: Env.get<string>('JWT_TOKEN_SECRET')
        },
    },

    service: {
        accountPool: {
            host: Env.get<string>('ACCOUNT_POOL_HOST'),
            port: Env.getAsInt('ACCOUNT_POOL_PORT')
        }
    }
}

export {Config};
