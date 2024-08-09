const asyncWrapper = require("../libs/asyncWrapper");
const { getBloodRecipients, getRecipientsByNearest, getRecipient, getBloodRecipientByStatus } = require("../models/BloodRecipient");

exports.getRecipients = asyncWrapper(async (req, res) => {
  const recipients = await getBloodRecipients()

  res.status(200).json({ success: true, status: 200, data: recipients });
});

// show request blood module based on nearest location
exports.getNearbyRecipients = asyncWrapper(async (req, res) => {
  const { lat, long } = req.query;
  const { id: currentUserID } = req.user;
  const nearbyRecipient = await getRecipientsByNearest(lat, long, currentUserID);

  res.status(200).json({ success: true, status: 200, data: nearbyRecipient });
});

exports.getByFulfilledStatus = asyncWrapper(async (req, res) => {
  const { status } = req.query; 
  const bloodRecipientByStatus = await getBloodRecipientByStatus(status);

  res.status(200).json({ success: true, status: 200, data: bloodRecipientByStatus });
})

// get blood requested byID
exports.getRecipient = asyncWrapper(async (req, res) => {
  const { requestID } = req.params;
  const recipientByID = await getRecipient(requestID);

  res.status(200).json({ success: true, status: 200, data: recipientByID });
});