const asyncWrapper = require('../libs/asyncWrapper');
const {
  getBloodRequestedList,
  makeBloodRequest,
  getBloodRequestByID,
  updateRequestStatus,
  deleteBloodRequestedByID,
  clearBloodRequested,
  updateBloodRequestedByID, 
  getBloodRequestFinish,
  updateFilledRequest} = require('../models/BloodRequest');
const { requestValidation } = require('../validation/requestvalidation');


// request blood module
exports.makeBloodRequest = asyncWrapper(async (req, res, next) => {
  const validateInput = await requestValidation(req);

  if(validateInput && validateInput.length !== 0) throw { status: 422, messages: validateInput };
  const { id: userID } = req.user;
  const { name, recipientAddress, bloodType, quantity, hospitalName, longitude, latitude } = req.body;
  const bloodRequest = await makeBloodRequest(userID, name, recipientAddress, bloodType, quantity, hospitalName, longitude, latitude);
  
  res.status(201).json({ success: true, status: 201, data: bloodRequest })
});

exports.updateBloodRequest = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const { requestID } = req.params;
  const { name, bloodType, quantity, hospitalName, latitude, longitude } = req.body;
  const update = await updateBloodRequestedByID(userID, requestID, name, bloodType, quantity, hospitalName, latitude, longitude);

  res.status(200).json({ success: true, status: 200, data: update });
});


// get blood requested byID
exports.getBloodRequest = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const { requestID } = req.params;
  const bloodRequestedByID = await getBloodRequestByID(userID, requestID);

  res.status(200).json({ success: true, status: 200, data: bloodRequestedByID });
});

// show blood requested by user id
exports.getBloodRequests = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const bloodRequestedList = await getBloodRequestedList(userID);

  res.status(200).json({ success: true, status: 200, data: bloodRequestedList });
});

exports.bloodRequestFinish = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const { requestID } = req.params;
  const { jumlahTerpenuhi } = req.body;


  
  let getBloodRequest = await getBloodRequestByID(requestID);
  let donationTotal = getBloodRequest.jumlah_terpenuhi;
  let bloodRequestQuantity = getBloodRequest.quantity;

  if(jumlahTerpenuhi > bloodRequestQuantity) {
    res.status(200).json({ success: true, status: 200, message: 'Can not donate exceed quantity', data: getBloodRequest });
    return;
  }

  await updateFilledRequest(requestID, jumlahTerpenuhi);
  getBloodRequest = await getBloodRequestByID(requestID);
  donationTotal = getBloodRequest.jumlah_terpenuhi;
  bloodRequestQuantity = getBloodRequest.quantity;

  if((donationTotal === bloodRequestQuantity)) {
    const fulfilled = await updateRequestStatus(requestID, "Tercukupi"); 
    
    res.status(200).json({ success: true, status: 200, message: 'Blood Request has been fulfilled', data: fulfilled });
    return;
  }
  
  const notFulfilled = await updateRequestStatus(requestID, "Kurang"); 
  res.status(200).json({ success: true, status: 200, data: notFulfilled });
});

exports.deleteBloodRequest = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const { requestID } = req.params;
  const deleteBloodRequest = await deleteBloodRequestedByID(userID, requestID);
  
  res.status(200).json({ success: true, status: 200, data: deleteBloodRequest });
});

exports.clearBloodRequest = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const clear = await clearBloodRequested(userID);
  
  res.status(200).json({ success: true, status: 200, data: clear});
});






