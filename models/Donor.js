const asyncWrapper = require("../libs/asyncWrapper");
const db = require("./dbConnection")

exports.insertDonor = async(getAuthID, donorName, bloodType, donorAddress, phone) => {
    const { data, error } = await db
    .from('donor')
    .insert({
      user_id: getAuthID,
      donor_name: donorName,
      blood_type: bloodType,
      donor_address: donorAddress,
      phone: phone
    })
    .select()

    if(error) throw error;
    return data;
}
// cobaan

exports.cancelDonor = async(getAuthID, donorID) => {
  const { data, error } = await db
    .from('donor')
    .delete()
    // .eq('user_id', getAuthID)
    .eq('id', donorID)

    if(error) throw error;
    return data;
}

exports.getDetailDonorByRequestID = async(requestID) => {
  const { data, error } = await db
  .from('donation')
  .select(`*, 
    donor:donor_id ( donor_name, blood_type, quantity, donor_address, phone ), request:request_id ( name, blood_type, quantity, hospital_name, request_at, recipient_address, phone, status )`)
  .eq('request_id', requestID);

  if(error) throw error;
  if(data.length === 0 || !data) throw { message: "RequestID not found", statusCode: 404 };

  return data;
}

exports.getDetailDonorByDonorID = async(donorID) => {
  const { data, error } = await db
  .from('donation')
  .select(`*, 
    donor:donor_id ( donor_name, blood_type, donor_address, phone ), request:request_id ( name, blood_type, quantity, hospital_name, request_at, recipient_address, phone, status )`)
  .eq('donor_id', donorID);

  if(error) throw error;
  if(data.length === 0 || !data) throw { message: "RequestID not found", statusCode: 404 };
  
  return data;
}
