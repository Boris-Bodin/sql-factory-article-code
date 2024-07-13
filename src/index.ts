import {SqlFactory} from "./sql-factory";


function main(){
    SqlFactory.registerRemote("R1", {
        host: 'localhost',
        port: 5432,
        user: 'user',
        password: 'password',
        database: 'database'
    });
    let queryFactory = (queryOpts) => `SELECT * FROM table WHERE id = ${queryOpts.id}`;
    let result1 = SqlFactory.query("R1", queryFactory, {id: 1});
    let result2 = SqlFactory.query("R1", queryFactory, {id: 2});
}
