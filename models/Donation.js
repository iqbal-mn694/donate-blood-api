const db = require("./dbConnection")

exports.insertDonation = async(getAuthID, request_user, requestID, donorID) => {
  const { data, error }  = await db
    .from('donation')
    .insert({
      donor_user: getAuthID,
      request_user: request_user, 
      request_id: requestID || null,
      donor_id: donorID
    })
    .select(`*, 
    donor:donor_id ( id, donor_name, blood_type, donor_address, phone, donated_at  ), request:request_id ( id, user_id, name, blood_type, quantity, hospital_name, request_at, recipient_address, phone, jumlah_terpenuhi, status )`);

  if(error) throw error;
  
  return data;
}

exports.countDonationByRequestID = async (requestID) => {
    const { data, error } = await db
      .from('donation')
      .select('count')
      .eq('request_id', requestID)

      
    if(error) throw error;
    return data[0].count;
}

exports.getDonation = async (getAuthID) => {
  const { data, error } = await db
    .from('donation')
    .select()
    .eq('user_id', getAuthID);

  if(error) throw error;
  
  return data;
}

exports.getDonationProcessedDetail = async (donorID) => {
  const { data, error } = await db
    .from('donation')
    .select(`*, 
      donor:donor_id ( id, donor_name, blood_type, donor_address, donated_at, phone ),
      request:request_id ( id, user_id, name, blood_type, quantity, hospital_name, request_at, recipient_address, phone, jumlah_terpenuhi, status )`)
    .eq('donor_id', donorID);

  if(!data) throw { message: "Donation Processed is empty", statusCode: 404 };
  if(error) throw error;
  
  return data;
}

exports.getDonationProgressByUserID = async (authID) => {
  const { data, error } = await db
    .from('donation')
    .select(`*, 
      donor:donor_id ( id, donor_name, blood_type, donor_address, donated_at, phone ),
      request:request_id ( id, user_id, name, blood_type, quantity, hospital_name, request_at, recipient_address, phone, jumlah_terpenuhi, status )`)
    .or(`donor_user.eq.${authID}, request_user.eq.${authID}`);

  const filteredData = data.filter((e) => {return e.progress !== "Selesai"});

  if(data.length === 0 || !data) throw { message: "Donation Progress is empty", statusCode: 404 };
  if(error) throw error;
  
  return filteredData;
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
    .eq('donor_id', donationID)
  
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