const asyncWrapper = require("../libs/asyncWrapper");
const db = require("../models/dbConnection")

const { getBloodRequestByID, updateRequestStatus } = require("../models/BloodRequest");
const { countDonationByRequestID, insertDonation } = require("../models/Donation");
const { insertDonor } = require("../models/Donor");


// donate blood by request ID
exports.donateBloodByRequestID = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const { requestID } = req.params;

  const donationTotalByRequestID = await countDonationByRequestID(requestID)
  const getBloodRequest = await getBloodRequestByID(userID, requestID)
  const bloodRequestQuantity = getBloodRequest.quantity

  // check if user's blood request is fulfiled
  if(donationTotalByRequestID <  bloodRequestQuantity) {
    const donor = await insertDonor(userID);
    const donation = await insertDonation(userID, requestID);

    res.status(201).json({ success: true, status: 201, message: 'Blood has been donated successfully', data: donor });
  }
  // if fulfiled change status to fulfiled 
  const changeRequestStatus = await updateRequestStatus(requestID);
  res.status(200).json({ success: true, status: 200, message: 'Request status is fulfiled', data: changeRequestStatus })
})

exports.donateBlood = asyncWrapper(async (req, res) => {
  const { id: userID } = req.userID;
  const donor = await insertDonor(userID);
  const donation = await insertDonation(userID);

  res.status(201).json({ success: true, status: 201, message: "Blood has been donated successfully" });
})