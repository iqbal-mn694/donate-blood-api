const ErrorHandler = require("../libs/errorHandler");
const db = require("./dbConnection")


exports.getBloodRequest = async () => {
  // find nearby request location with coordinates (latitude and longitude)
  const { data, error } = await db.rpc('nearby_request', {        
      lat: -7.488713054910411,  
      long: 108.05294789595146,
    });

    if(error) throw error
    // show data result
    return data
}

exports.getBloodRequestByID = async(requestID) => {
  const { data, error } = await db
    .from('blood_request')
    .select('*')
    .eq('id', requestID)
    
    if(error) throw error
    if(data.length === 0) throw error("Request ID Not Found", 404)
    return data[0]
}

exports.makeBloodRequest = async (getAuthID, bloodType, quantity, hospitalName, longitude, latitude) => {
  // save blood request data from user to database
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

exports.updateRequestStatus = async(requestID) => {
  const { data, error } = await db
  .from('blood_request')
  .update({ status: "fulfilled"}) 
  .eq('id', requestID)  
  .select()
  
  if(error) throw error
  if(!data) throw new ErrorHandler("Tidak ada di database", 404)
  return data
}

