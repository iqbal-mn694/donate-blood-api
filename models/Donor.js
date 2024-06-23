const ErrorHandler = require("../libs/errorHandler");
const db = require("./dbConnection")

exports.insertDonor = async(getAuthID) => {
    const { data, error } = await db
    .from('donor')
    .insert({
      user_id: getAuthID,
    })
    .select()

    if(error) throw error
    return data
}
