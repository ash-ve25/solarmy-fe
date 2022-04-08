import {Env} from "@solar/service-provider";
import {join} from 'path';

const Config = {
    http: {
        port: Env.getAsInt('HTTP_PORT'),
    },

    tcp: {
        port: Env.getAsInt('TCP_PORT'),
        host: Env.get<string>('TCP_HOST')
    },

    db: {
        type: 'postgres',
        host: Env.get<string>('DB_HOST'),
        port: Env.getAsInt('DB_PORT'),
        username: Env.get<string>('DB_USERNAME'),
        password: Env.get<string>('DB_PASSWORD'),
        database: Env.get<string>('DB_DATABASE'),
        schema: Env.get<string>('DB_SCHEMA'),
        autoLoadEntities: true,
        synchronize: false,
        entities: [join(__dirname, 'domain/entity/*.{ts,js}')],
        migrationsRun: false,
        migrations: [join(__dirname, '../migrations/*.{ts,js}')],
        cli: {
            migrationsDir: './src/migrations'
        }
    },

    amq: {
        host: Env.get<string>('AMQ_HOST'),
        username: Env.get<string>('AMQ_USERNAME'),
        password: Env.get<string>('AMQ_PASSWORD'),
        vhost: Env.get<string>('AMQ_VHOST'),
        port: Env.getAsInt('AMQ_PORT'),
        protocol: Env.get<string>('AMQ_PROTOCOL'),
        eventExchange: Env.get<string>('AMQ_EVENT_EXCHANGE'),
        serviceQueue: Env.get<string>('AMQ_SERVICE_QUEUE'),
        prefetchCount: Env.getAsInt('AMQ_PREFETCH_COUNT')
    }
}

export {Config};
