const SettingGeneral = require("../../models/setting-general.model");

module.exports.settingGeneral = async (req, res, next) => { 
    const settingGeneral = await SettingGeneral.findOne({});

    res.locals.settingGeneral = settingGeneral;

  next();   
};
