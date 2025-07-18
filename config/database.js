import mysql from "mysql2";
import dotenv from 'dotenv';
import sql from 'mssql';

dotenv.config();

const dbConfig = {
  user: process.env.MSSQL_USER, 
  password: process.env.MSSQL_PASSWORD, 
  server: process.env.MSSQL_SERVER, 
  database: process.env.MSSQL_DATABASE,
  options: {
    trustServerCertificate: true, // Use for local dev/self-signed certificates
  },
};


async function connectToDb() {
  try {
    let pool = await sql.connect(dbConfig);
    console.log('Connected to SQL Server');
    return pool;
  } catch (err) {
    console.error('Database connection failed:', err);
  }
}

const dbConnection = await connectToDb();


export default dbConnection;
