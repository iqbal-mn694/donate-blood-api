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

exports.getDonation = async (getAuthID) => {
  const { data, error } = await db
    .from('donation')
    .select()
    .eq('user_id', getAuthID);

  if(error) throw error;
  return data;
}

exports.getDonationById = async(getAuthID, donationID) => {
  const { data, error } = await db
  .from('donation')
  .select('*')
  .eq('user_id', getAuthID)
  .eq('id', donationID);
  
  if(data.length === 0) throw { message: "donationID not found", statusCode: 404 };
  if(error) throw error;
  return data[0];
}


exports.deleteDonationByID = async(getAuthID, donationID) => {
  const { data, error } = await db
    .from('donation')
    .delete()
    .eq('user_id', getAuthID)
    .eq('id', donationID)
  
  if(error) throw error;
  // if(!data) throw { message: "RequestID not found", statusCode: 404 };
  return [];
}  

exports.clearDonation = async(getAuthID) => {
  const { data, error } = await db
    .from('donation')
    .delete()
    .eq('user_id', getAuthID)
    .neq('id', -1);

  if(error) throw error;
  return [];
}