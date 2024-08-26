const db = require("./dbConnection")

exports.insertDonor = async(getAuthID, donorName, bloodType) => {
    const { data, error } = await db
    .from('donor')
    .insert({
      user_id: getAuthID,
      donor_name: donorName,
      blood_type: bloodType,
    })
    .select()

    if(error) throw error;
    return data;
}

exports.getDetailDonorByRequestID = async(requestID) => {
  const { data, error } = await db
  .from('donation')
  .select(`*, 
    donor:donor_id ( donor_name, blood_type ), request:request_id ( name, blood_type, quantity, hospital_name, request_at, recipient_address, status )`)
  .eq('request_id', requestID);

  if(error) throw error;
  if(data.length === 0 || !data) throw { message: "RequestID not found", statusCode: 404 };

  return data;
}

exports.getDetailDonorByDonorID = async(donorID) => {
  const { data, error } = await db
  .from('donation')
  .select(`*, 
    donor:donor_id ( donor_name, blood_type ), request:request_id ( name, blood_type, quantity, hospital_name, request_at, recipient_address, status )`)
  .eq('donor_id', donorID);

  if(error) throw error;
  if(data.length === 0 || !data) throw { message: "RequestID not found", statusCode: 404 };
  
  return data;
}
