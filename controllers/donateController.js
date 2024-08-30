const asyncWrapper = require("../libs/asyncWrapper");
const db = require("../models/dbConnection")

const { getBloodRequestByID, updateRequestStatus, updateFilledRequest } = require("../models/BloodRequest");
const { countDonationByRequestID, insertDonation, getDonationProcessedDetail } = require("../models/Donation");
const { insertDonor, getDetailDonor, getDetailDonorByRequestID, getDetailDonorByDonorID } = require("../models/Donor");

// donate blood by request ID
exports.donateBloodByRequestID = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const { requestID } = req.params;
  const { donorName, bloodType } = req.body;

  const donationTotalByRequestID = await countDonationByRequestID(requestID)
  const getBloodRequest = await getBloodRequestByID(userID, requestID)
  const bloodRequestQuantity = getBloodRequest.quantity

  // check if user's blood request is fulfiled
  if(donationTotalByRequestID <  bloodRequestQuantity) {
    const donor = await insertDonor(userID, donorName, bloodType);
      await updateFilledRequest(requestID);
      await updateRequestStatus(requestID, "Kurang"); 

    const donation = await insertDonation(userID, requestID, donor[0].id);
    
    res.status(201).json({ success: true, status: 201, message: 'Blood has been donated successfully', data: donation });
  }

  if(donationTotalByRequestID === getBloodRequest.jumlah_terpenuhi) {
    // if fulfiled change status to fulfiled 
    const changeRequestStatus = await updateRequestStatus(requestID, "Tercukupi");
    res.status(200).json({ success: true, status: 200, message: 'Request status is fulfiled', data: changeRequestStatus })
  }
});

exports.detailDonorByRequestID = asyncWrapper(async (req, res) => {
  const { requestID } = req.params;
  const detailDonor = await getDetailDonorByRequestID(requestID);

  res.status(200).json({ success: true, status: 200, message: 'Success get detail donor', data: detailDonor })
});

exports.detailDonorByDonorID = asyncWrapper(async (req, res) => {
  const { donorID } = req.params;
  const detailDonor = await getDetailDonorByDonorID(donorID);

  res.status(200).json({ success: true, status: 200, message: 'Success get detail donor', data: detailDonor })
});

exports.donateBlood = asyncWrapper(async (req, res) => {
  const { id: userID } = req.userID;
  const { donorName, bloodType } = req.body;
  const donor = await insertDonor(userID, donorName, bloodType);
  const donation = await insertDonation(userID);

  res.status(201).json({ success: true, status: 201, message: "Blood has been donated successfully" });
})