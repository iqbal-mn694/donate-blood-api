const asyncWrapper = require('../libs/asyncWrapper');
const db = require('../models/dbConnection');

// donation
exports.history = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const { data, error } = await db
  .from('history')
    .select(`*, 
      blood_request:request_id (name ), donor:donor_id (donor_name )`)
      .eq('user_id', userID);

    if(data.length === 0) throw { message: "History is empty", statusCode: 404 };
 
    
    // console.log(data)
  // const newData = data.map(record => {
  //   return {
  //     id: record.id, 
  //     recipientID: (record.blood_request && record.request.id) || null,
  //     donorID: (record.donor && record.donor_id || null), 
  //     recipient_name: (record.blood_request && record.blood_request.name) || null,
  //     donor_name: (record.donor && record.donor.donor_name) || null,  
  //     option: (record.option),
  //     created_at: record.created_at
  //   };
  // });

  
  if(error) throw error;
  res.status(200).json({ success: true, status: 200, data });
});

exports.historyDetail = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const { historyID } = req.params;
  const { data, error } = await db
  .from('history')
  .select(`*, 
      blood_request:request_id ( id, name ), donor:donor_id ( id, donor_name )`)
    .eq('user_id', userID)
    .eq('id', historyID);

    if(data.length === 0) throw { message: "History detail not found", statusCode: 404 };

    // const newData = data.map(record => {
    //   return {
    //     id: record.id, 
    //     recipientID: (record.blood_request && record.blood_request.id) || null,
    //     donorID: (record.donor && record.donor.id || null), 
    //     recipient_name: (record.blood_request && record.blood_request.name) || null,
    //     donor_name: (record.donor && record.donor.donor_name) || null,  
    //     created_at: record.created_at
    //   };
    // });

  
  if(error) throw error;
  res.status(200).json({ success: true, status: 200, data });
});

