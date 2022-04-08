import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./JwtAuthGuard";

export class JwtGuard {
    
    static provideGuard(){
        return {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        }
    }
}