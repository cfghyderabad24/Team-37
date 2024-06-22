const grantModel = require("../models/grantModel");

const getGrantController = async (req, res) => {
  try {
    const { NGO, grant } = await grantModel.find();
    if (!grant || !NGO) {
      return res.status(404).send({
        success: false,
        message: "No user Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "User Found",
      grant,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in Get Message",
      success: false,
      error,
    });
  }
};

model.exports = getGrantController;
