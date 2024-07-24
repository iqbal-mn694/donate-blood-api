const asyncWrapper = require('../libs/asyncWrapper');
const db = require('../models/dbConnection');

// donation
exports.history = asyncWrapper(async (req, res) => {
  const { data, error } = await db.from('history').select(`*, 
    blood_request:request_id ( id, name )`);

    const newData = data.map(record => {
      return {
        id: record.id,
        name: record.blood_request?.name || record.donors?.name,
        status: record.status,
        created_at: record.created_at
      };
    });
    
  res.status(200).json({ success: true, status: 200, newData });
});