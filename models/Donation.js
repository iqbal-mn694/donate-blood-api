const db = require("./dbConnection")

exports.insertDonation = async(getAuthID, requestID) => {
  const { data, error }  = await db
    .from('donation')
    .insert({
      user_id: getAuthID,
      request_id: requestID || null,
    })
    .select();

  if(error) throw error;
  return data;
}

exports.countDonationByRequestID = async (requestID) => {
    const { data, error } = await db
      .from('donation')
      .select('count')
      .eq('request_id', requestID)

    if(error) throw error
    return data[0].count
}

exports.getDonation = async () => {
  const { data, error } = await db
    .from('donation')
    .select();

  if(error) throw error;
  return data;
}