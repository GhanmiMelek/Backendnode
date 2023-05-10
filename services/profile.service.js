const pool = require("../database/index");

module.exports = {
    find: async() => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const fetchResult = await connection.query(
                `SELECT username, email, password,Age,profile_picture,Role,
                CONCAT('http://localhost:3000/upload/',profile_picture) AS profile_picture
                FROM users`,
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
                `insert into users
                (username, email, password,Age,profile_picture,Role)
                values(?,?,?,?,?,?)`, [
                    data.username,
                    data.email,
                    data.password,
                    data.Age,
                    data.profile_picture,
                    data.Role
                ]
            );
            const fetchResult = await connection.query(
                `SELECT username, email, password,Age,profile_picture,Role,
                CONCAT('http://localhost:3000/upload/',profile_picture) AS profile_picture
                FROM users WHERE id = ?`, [queryResult[0].insertId]
            );
            await connection.commit();
            return fetchResult[0][0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    // update: async(req, res ) =>{
    //     try {
    //         const { username,email,Age,profile_picture} = req.body;
    //         const { id } = req.params;
    //         const sql = "UPDATE users SET username = ?, email=?, Age=?, profile_picture=? WHERE id = ?";
    //         const [rows, fields] = await pool.query(sql, [username,email,Age,profile_picture, id]);
    //         res.json({
    //           data: rows,
    //           message: 'Profile updated successfully'
    //         });
    //       } catch (error) {
    //         console.log(error);
    //         res.json({
    //           status: "error"
    //         });
    //       }
    //   }
       
      
 
}
