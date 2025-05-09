import { AuthUser } from '../user';
import { Query } from 'express-serve-static-core';

// to make the file a module and avoid the TypeScript error
export {};

declare global {
    namespace Express {
        export interface Request {
            user: AuthUser;
            type: string;
        }
    }
}
export interface RequestWithQuery<T extends Query> {
    user: AuthUser;
    type: string;
    query: T;
}