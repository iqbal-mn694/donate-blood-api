const db = require("./dbConnection");


// find nearby request location with coordinates (latitude and longitude)
exports.getBloodRequest = async (lat, long, currentUserID) => {
  const { data, error } = await db.rpc('nearby_request', {        
      lat: lat,  
      long: long,
      current_user_id: currentUserID
    });

    

    if(error) throw error;
    return data;
}

// find nearby request location with coordinates (latitude and longitude) in detail
exports.getRecipient = async (requestID) => {
  const { data, error } = await db
    .from('blood_request')
    .select('*')
    .eq('id', requestID);

    if(error) throw error;
    return data;
}




// get blood requested by detail
exports.getBloodRequestByID = async(getAuthID, requestID) => {
  const { data, error } = await db
  .from('blood_request')
  .select('*')
  // .eq('user_id', getAuthID)
  .eq('id', requestID)
  // .single()

  console.log(data[0])
  
  // if(data.length === 0) throw { message: "RequestID not found", statusCode: 404 };
  if(error) throw error;
  return data[0];
}

// get blood requested list
exports.getBloodRequestedList = async(getAuthID) => {
  const { data, error } = await db
    .from('blood_request')
    .select()
    .eq('user_id', getAuthID);

  if(error) throw error;
  if(data.length === 0) throw { message: "Request list not found", statusCode: 404 };
  return data;
}

exports.deleteBloodRequestedByID = async(getAuthID, requestID) => {
  const { data, error } = await db
    .from('blood_request')
    .delete()
    .eq('user_id', getAuthID)
    .eq('id', requestID);

  if(error) throw error;
  // if(!data) throw { message: "RequestID not found", statusCode: 404 };
  return [];
}

exports.clearBloodRequested = async(getAuthID) => {
  const { data, error } = await db
    .from('blood_request')
    .delete()
    .eq('user_id', getAuthID)
    .neq('id', -1);

  if(error) throw error;
  return [];
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

exports.updateBloodRequestedByID = async(getAuthID, requestID, bloodType, quantity, hospitalName, longitude, latitude) => {
  const { data, error } = await db
    .from('blood_request')
    .update({
      blood_type: bloodType,
      quantity: quantity,
      hospital_name: hospitalName,
      location: `POINT(${longitude} ${latitude})` // datatype for location
    })
    .eq('id', requestID)
    .eq('user_id', getAuthID)
    .select();
    
    if(error) throw error;
    if(data.length === 0 || !data) throw { message: "RequestID not found", statusCode: 404 };
    return data;
}

// update blood requst status to fulfilled
exports.updateRequestStatus = async(requestID) => {
  const { data, error } = await db
  .from('blood_request')
  .update({ status: "fulfilled"}) 
  .eq('id', requestID)  
  .select()
  
  if(error) throw error
  if(!data) throw { message: "RequestID tidak ditemukan", code: 404 };
  // if(data.status === 'Fulfiled') throw { message: 'Recipient blood has been fulfiled'}
  return data;
}



