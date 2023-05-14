const pool = require ("../database/index")
const bcrypt = require('bcrypt')

const usersController = {

    getAll: async (req, res) =>{
        try{
            const [rows,fields] = await pool.query("SELECT * FROM users WHERE Role = 'USER'");
            res.json({
                data: rows
            })
        } catch (error){
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    getById : async (req , res ) =>{
        try{
            const { id } = req.params
            const [rows,fields] = await pool.query("select * from users where id = ?", [id]);
            res.json({
                data: rows
            })
            
        } catch (error){
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },

    create: async(req, res ) =>{
        try{
          const {username, email,password,Age} = req.body
          const sql = "insert into users(username, email,password,Age) values(?,?,?,?)"
          const [rows, fields] =await pool.query(sql, [username, email,password,Age])
          res.json({
            data: rows
          })
        } catch(error){
          console.log(error)
          res.json({
            status: "error"
        })
        }
  
      },
      update: async(req, res ) =>{
        try {
            console.log(req.body)
            const { username,email} = req.body;
            const { id } = req.params;
            const sql = "UPDATE users SET username = ? , email = ? WHERE id = ?";
            const [rows, fields] = await pool.query(sql, [username,email, id]);
            res.json({
              data: rows,
              message: 'Username updated successfully'
            });
          } catch (error) {
            console.log(error);
            res.json({
              status: "error"
            });
          }
        },
          // updateEmail: async(req, res ) =>{
          //   try {
          //       console.log(req.body)
          //       const { email} = req.body;
          //       const { id } = req.params;
          //       const sql = "UPDATE users SET email=? WHERE id = ?";
          //       const [rows, fields] = await pool.query(sql, [email,id]);
          //       res.json({
          //         data: rows,
          //         message: 'Email updated successfully'
          //       });
          //     } catch (error) {
          //       console.log(error);
          //       res.json({
          //         status: "error"
          //       });
          //     }
          // },
          //   updatePassword: async(req, res ) =>{
          //     try {
          //         console.log(req.body)
          //         const { password} = req.body;
          //         const { id } = req.params;
          //         // Hash the password
          //       const hashedPassword = await bcrypt.hash(password, 10);

          //       // Update the hashed password in the database
          //         const sql = "UPDATE users SET password = ? WHERE id = ?";
          //         const [rows, fields] = await pool.query(sql, [hashedPassword,id]);
          //         res.json({
          //           data: rows,
          //           message: 'Password updated successfully'
          //         });
          //       } catch (error) {
          //         console.log(error);
          //         res.json({
          //           status: "error"
          //         });
          //       }
          //   },
updateprofilpicture: async(req, res ) =>{
  try {
      
      const { profile_picture} = req.body;
      const { id } = req.params;
      const sql = "UPDATE users SET  profile_picture=? WHERE id = ?";
      const [rows, fields] = await pool.query(sql, [profile_picture,id]);
      res.json({
        data: rows,
        message: 'Profile updated successfully'
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error"
      });
    }
},
updateadmin: async(req, res ) =>{
  try {
      const { username,email,Age} = req.body;
      const { id } = req.params;
      const sql = "UPDATE users SET username = ?, email=? , Age=? WHERE id = ?";
      const [rows, fields] = await pool.query(sql, [username,email,Age, id]);
      res.json({
        data: rows,
        message: 'Profile updated successfully'
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error"
      });
    }
},

delete: async(req, res ) =>{
    try{
        const { id } = req.params
        const [rows, fields] =await pool.query("delete from users where id = ?", [id])
         res.json({
            data: rows
         })
        }catch(error){
            console.log(error)
            res.json({
                status: "error"
            })
         }
    }
}


module.exports = usersController