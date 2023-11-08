// switch node-json-db
import { JsonDB, Config } from 'node-json-db';

export const db = new JsonDB(new Config('data', true, false, '/'));
