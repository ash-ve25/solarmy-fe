import {AccountPool} from "@solar/service-provider";
import {Injectable} from "@nestjs/common";
import Encryptor from "../infrastructure/Encryptor";
import {JwtService} from "@nestjs/jwt";
import {catchError, firstValueFrom} from "rxjs";
import {Config} from "../Config";
import {RpcException} from "@nestjs/microservices";

@Injectable()
export class AuthServer {

    constructor(
        private readonly accountPool: AccountPool,
        private readonly encryptor: Encryptor,
        private readonly jwtService: JwtService,
    ) {
    }

    async signIn(context) {
        const {username, signature} = context;

        const msg = 'Authorization request, id: 444555';
        const isValid = this.encryptor.verifySignedMessage(msg, signature, username);

        if (!isValid) {
            throw new RpcException('Signature is wrong.');
        }

        const {id: accountId} = await firstValueFrom(this.accountPool.findAccount({id: username}).pipe(
            catchError(e => this.accountPool.createAccount({username}))
        ));

        return this.issueTokenPair({accountId});
    }

    generateSignInCode(context) {
        const {username} = context;

        const id = '444555'//generateUuid();

        return `Authorization request, id: ${id}`;
    }

    private issueAccessToken(context) {
        return this.jwtService.signAsync(
            context,
            {
                //TODO uncomment on key migration, for production
                // algorithm: 'RS256',
                expiresIn: Config.jwt.token.expiresIn
            });
    }

    async issueTokenPair(context) {
        return {
            accessToken: await this.issueAccessToken(context)
        };
    }
}
