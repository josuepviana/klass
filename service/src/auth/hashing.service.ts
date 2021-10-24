import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


const BCRYPT_ROUNDS = 10

@Injectable()
export class HashingService {

    async encrypt(inputText: string): Promise<string> {
        return bcrypt.hash(inputText, BCRYPT_ROUNDS);
    } 

    async validate(plainText: string, hashedText: string): Promise<boolean> {
        return bcrypt.compare(plainText, hashedText);
    }
}