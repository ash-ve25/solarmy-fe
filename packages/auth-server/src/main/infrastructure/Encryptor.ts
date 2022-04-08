import {Injectable} from '@nestjs/common';
import {TextEncoder} from "util";
import {decode} from 'bs58';
import * as nacl from "tweetnacl";

@Injectable()
export default class Encryptor {

    verifySignedMessage(message, signature, publicKey) {
        message = new TextEncoder().encode(message);
        signature = this.bufferToUint(this.decode(signature));
        publicKey = this.bufferToUint(this.decode(publicKey));

        return nacl.sign.detached.verify(message, signature, publicKey);
    }

    decode(text) {
        return decode(text);
    }

    bufferToUint(buffer) {
        if (!buffer) {
            return undefined;
        }

        if (buffer.constructor.name === 'Uint8Array' || buffer.constructor === Uint8Array) {
            return buffer;
        }

        if (typeof buffer === 'string') {
            buffer = Buffer.from(buffer);
        }

        const out = new Uint8Array(buffer.length);

        for (let i = 0; i < buffer.length; i++) out[i] = buffer[i];

        return out;
    }
}
