import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_DATABASE:', process.env.DB_DATABASE);

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((error: any) => {
    if (error) throw error;
    console.log(`Conectado ao Banco de Dados: ${process.env.DB_DATABASE}`);
});

export default connection;