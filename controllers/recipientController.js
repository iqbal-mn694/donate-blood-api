const asyncWrapper = require("../libs/asyncWrapper");

exports.getRecipients = asyncWrapper(async (req, res) => {
  const recipients = await getBloodRequests()

  res.status(200).json({ success: true, status: 200, data: recipients });
});

// show request blood module based on nearest location
exports.getNearbyRecipients = asyncWrapper(async (req, res) => {
  const { lat, long } = req.query;
  const { id: currentUserID } = req.user;
  const nearbyRecipient = await getRequestsByNearest(lat, long, currentUserID);

  res.status(200).json({ success: true, status: 200, data: nearbyRecipient });
});

// get blood requested byID
exports.getRecipient = asyncWrapper(async (req, res) => {
  const { requestID } = req.params;
  const recipientByID = await getRecipient(requestID);

  res.status(200).json({ success: true, status: 200, data: recipientByID });
});