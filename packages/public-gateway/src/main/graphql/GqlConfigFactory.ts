import {GqlModuleOptions, GqlOptionsFactory} from "@nestjs/graphql";
import {Injectable} from "@nestjs/common";
import GraphQLUUID from 'graphql-type-uuid';
import GraphQLJSON, {GraphQLJSONObject} from 'graphql-type-json';
import {Config} from "../Config";

@Injectable()
export class GqlConfigFactory implements GqlOptionsFactory {

    createGqlOptions(): GqlModuleOptions {
        return {
            debug: Config.isDev,
            playground: Config.isDev,
            installSubscriptionHandlers: true,
            typePaths: ['./**/schema.graphql'],
            resolvers: {
                JSON: GraphQLJSON,
                JSONObject: GraphQLJSONObject,
                UUID: GraphQLUUID
            },
        };
    }
}
