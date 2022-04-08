import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from "@nestjs/common";
import {Config} from "../../Config";

@Injectable()
export class JwtPassport extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: Config.jwt.token.secret,
        });
    }

    async validate(payload = {}) {
        const {accountId}: any = payload

        return {
            accountId
        };
    }
}
