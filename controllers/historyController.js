const asyncWrapper = require('../libs/asyncWrapper');
const db = require('../models/dbConnection');

// donation
exports.history = asyncWrapper(async (req, res) => {
  const { data, error } = await db.from('history').select(`*, 
    blood_request:request_id ( id, name ), donor:donor_id ( id, donor_name )`);

    const newData = data.map(record => {
      return {
        id: record.id,
        recipientID: (record.blood_request.id),
        donorID: (record.donor.id),
        recipient_name: (record.blood_request && record.blood_request.name) || null,
        donor_name: (record.donor && record.donor.donor_name) || null,  
        created_at: record.created_at
      };
    });

  if(error) throw error;
  res.status(200).json({ success: true, status: 200, newData });
});