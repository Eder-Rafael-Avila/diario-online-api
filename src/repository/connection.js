import mysql from 'mysql2/promise';
import 'dotenv/config';

let con;

try {
    con = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        database: process.env.DATABASE,
        password: process.env.PASSWORD
    });

    console.log('Conexão com o MySQL foi um sucesso!')
} catch (e) {
    console.log(`Ocorreu um erro ao conectar no MySQL: ${e}`);
}

export { con };