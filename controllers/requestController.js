const asyncWrapper = require('../libs/asyncWrapper');
const {
  getBloodRequestedList,
  makeBloodRequest,
  getBloodRequestByID,
  updateRequestStatus,
  deleteBloodRequestedByID,
  clearBloodRequested,
  updateBloodRequestedByID } = require('../models/BloodRequest');
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






