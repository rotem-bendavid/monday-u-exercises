import { Console } from 'console';
import { createWriteStream } from 'fs';

export const myLogger = new Console({
    stdout: createWriteStream('log.txt', { flags: 'a' }),
}); 