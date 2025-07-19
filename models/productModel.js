import dbConnection from "../config/database.js";
import sql from 'mssql';

export const getAllProducts = async () => {
    try {
        const pool = await dbConnection;
        const result = await pool.request().query('SELECT * FROM PRODUCTS');
        return result.recordset;
    } catch (err) {
        console.log('Error fetching all products : ', err);
        throw err;
    }
  };
  
export const getProductById = async (id) => {
    try {
      const pool = await dbConnection;
        const result = await pool
      .request()
      .input('productId', sql.Int, id)
      .query('SELECT * FROM PRODUCTS WHERE PRODUCTID = @productId');
    return result.recordset;
    } catch (err) {
        console.log(`Error fetching product with ID : ${id}`, err);
        throw err;
    }
}

export const isProductExist = async (id) => {
    try {
        const result = await dbConnection
      .request()
      .input('productId', sql.Int, id)
      .query('SELECT TOP 1 1 FROM PRODUCTS WHERE PRODUCTID = @productId');
    return result.recordset.length > 0;
    } catch (err) {
        console.log(`Error check product exist ID : ${id}`, err);
        throw err;
    }
}

export const deleteProduct = async (id) => {
    try {
        const result = await dbConnection
      .request()
      .input('productId', sql.Int, id)
      .query('DELETE FROM PRODUCTS WHERE PRODUCTID = @productId');
    return result.rowsAffected[0] > 0;
    } catch (err) {
        console.log(`Error deleting product with ID : ${id}`, err);
        throw err;
    }
}

export const createProduct = async (data) => {
    try {
        const result = await dbConnection
      .request()
      .input('productName', sql.NVarChar, data.PRODUCTNAME)
      .input('price', sql.Decimal(10, 2), data.PRICE)
      .input('stock', sql.Int, data.STOCK)
      .query(
        'INSERT INTO PRODUCTS (PRODUCTNAME, PRICE, STOCK) VALUES (@productName, @price, @stock)'
      );

    return result.rowsAffected[0] > 0;
    } catch (err) {
        console.log('Error creating product', err);
        throw err;
    }
}

export const updateProduct = async (id, data) => {
    try {
        const result = await dbConnection
      .request()
      .input('productName', sql.NVarChar, data.PRODUCTNAME)
      .input('price', sql.Decimal(10, 2), data.PRICE)
      .input('stock', sql.Int, data.STOCK)
      .input('productId', sql.Int, id)
      .query(
        'UPDATE PRODUCTS SET PRODUCTNAME = @productName, PRICE = @price, STOCK = @stock WHERE PRODUCTID = @productId'
      );

    return result.rowsAffected[0] > 0;
    } catch (err) {
        console.log(`Error updating product with ID : ${id}`, err);
        throw err;
    }
}

