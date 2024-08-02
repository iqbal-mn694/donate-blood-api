const db = require("./dbConnection");

exports.getBloodRecipients = async () => {
  const { data, error } = await db
    .from('blood_request')
    .select('*')

    if(error) throw error;
    return data;
}

exports.getBloodRecipientByStatus = async (status) => {
  const { data, error } = await db
    .from('blood_request')
    .select('*')
    .eq('status', status)

    if(error) throw error;
    return data;
}

// find nearby request location with coordinates (latitude and longitude)
exports.getRecipientsByNearest = async (lat, long, currentUserID) => {
  const { data, error } = await db.rpc('nearby_request', {        
      lat: lat,  
      long: long,
      current_user_id: currentUserID
    });

    if(error) throw error;
    return data;
}

exports.getRecipient = async (requestID) => {
  const { data, error } = await db
    .from('blood_request')
    .select('*')
    .eq('id', requestID)
    .single();

    if(data == null) throw { message: "RequestID not found", statusCode: 404 };
    if(error) throw error;
    return data;
}


