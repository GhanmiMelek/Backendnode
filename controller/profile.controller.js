const { find,create  } = require("../services/profile.service");
const pool = require("../database/index");


const profileController = {
  find: async(req, res) => {
      try {
          const result = await find();
          return res.status(200).json(result);
      } catch (e) {
          return res.status(500).json({
              "message": "Internal Server Error"
          });
      }
  },
  create: async(req, res) => {
    try {
        var data = req.body;
        if (req.file)
        data["image"] = req.file.filename;

        const result = await create(data);
        return res.status(201).json(result);
    } catch (e) {
        return res.status(500).json({
            "message": "Internal Server Error"
        });
    }
}

  

};

module.exports = profileController

