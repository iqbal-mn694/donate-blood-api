const ErrorHandler = require("../libs/errorHandler");
const db = require("./dbConnection")

exports.makeDonation = async(getAuthID, requestID) => {
    const { data, error }  = await db
    .from('donation')
    .insert({
      user_id: getAuthID,
      request_id: requestID,
    })
    .select()

    if(error) throw error
    if(!data) throw new ErrorHandler("Tidak ada di database", 404)
        return data
}

exports.countDonationByRequestID = async (requestID) => {
    const { data, error } = await db
      .from('donation')
      .select('count')
      .eq('request_id', requestID)

    if(error) throw error
    return data[0].count
}