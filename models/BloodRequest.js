const db = require("./dbConnection");


// find nearby request location with coordinates (latitude and longitude)
exports.getBloodRequest = async () => {
  const { data, error } = await db.rpc('nearby_request', {        
      lat: -7.488713054910411,  
      long: 108.05294789595146,
    });

    if(error) throw error;
    return data;
}

// get blood request by detail
exports.getBloodRequestByID = async(requestID) => {
  const { data, error } = await db
    .from('blood_request')
    .select('*')
    .eq('id', requestID)
    
    if(error) throw error
    if(data.length === 0) throw { message: "RequestID not found", statusCode: 404 }
    return data[0]
}

// make blood request
exports.makeBloodRequest = async (getAuthID, bloodType, quantity, hospitalName, longitude, latitude) => {
  const { data, error } = await db
    .from('blood_request')
    .insert({
      user_id: getAuthID, // foreign key user id from table profile
      blood_type: bloodType,
      quantity: quantity,
      hospital_name: hospitalName,
      location: `POINT(${longitude} ${latitude})`, // datatype for location
    })
    .select();
  
  if(error) throw error
  return data
}

// update blood requst status to fulfilled
exports.updateRequestStatus = async(requestID) => {
  const { data, error } = await db
  .from('blood_request')
  .update({ status: "fulfilled"}) 
  .eq('id', requestID)  
  .select()
  
  if(error) throw error
  if(!data) throw { message: "RequestID tidak ditemukan", error: 404 };
  return data
}

