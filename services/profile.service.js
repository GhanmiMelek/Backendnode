const pool = require("../database/index");

module.exports = {
    find: async() => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const fetchResult = await connection.query(
                `SELECT image,
                CONCAT('http://localhost:3000/api/cnrps/upload/',image) AS image
                FROM pictures`,
            );
            await connection.commit();
            return fetchResult[0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    create: async(data) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const queryResult = await connection.query(
                `insert into pictures
                (image)
                values(?)`, [
                    
                    data.image
                ]
            );
            const fetchResult = await connection.query(
                `SELECT image,
                CONCAT('http://localhost:3000/api/cnrps/upload/',image) AS image
                FROM pictures WHERE id = ?`, [queryResult[0].insertId]
            );
            await connection.commit();
            return fetchResult[0][0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
 
}
