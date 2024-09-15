const asyncWrapper = require("../libs/asyncWrapper");
const db = require("../models/dbConnection")

const { getBloodRequestByID, updateRequestStatus, updateFilledRequest } = require("../models/BloodRequest");
const { countDonationByRequestID, insertDonation, getDonationProcessedDetail, deleteDonationByID } = require("../models/Donation");
const { insertDonor, getDetailDonor, getDetailDonorByRequestID, getDetailDonorByDonorID, cancelDonor } = require("../models/Donor");

// donate blood by request ID
exports.donateBloodByRequestID = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const { requestID } = req.params;
  const { donorName, bloodType, donorAddress, phone } = req.body;

  const getBloodRequest = await getBloodRequestByID(requestID)
  const donationTotal = getBloodRequest.jumlah_terpenuhi;
  const bloodRequestQuantity = getBloodRequest.quantity;

  // check if user's blood request is fulfiled

  if(donationTotal < bloodRequestQuantity) {
    const donor = await insertDonor(userID, donorName, bloodType, donorAddress, phone);
    await updateRequestStatus(requestID, "Kurang"); 

    const donation = await insertDonation(userID, requestID, donor[0].id);
    
    res.status(201).json({ success: true, status: 201, message: 'Blood has been donated successfully', data: donation });
    return;
  }

  res.status(200).json({ success: true, status: 200, message: 'Request status is fulfiled', data: getBloodRequest })
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
  const { id: userID } = req.user;
  const { donorName, bloodType, donorAddress, phone } = req.body;
      
  await insertDonor(userID, donorName, bloodType, donorAddress, phone);
  await insertDonation(userID);
  res.status(201).json({ success: true, status: 201, message: "Blood has been donated successfully" });
})

exports.cancelDonateBlood = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const { donorID } = req.params;

  await cancelDonor(userID, donorID);
  res.status(200).json({ success: true, status: 200, message: "Blood donate has been cancelled" , data: []})
})