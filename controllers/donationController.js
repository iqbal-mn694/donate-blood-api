const asyncWrapper = require('../libs/asyncWrapper');

const { getDonation, getDonationById, deleteDonationByID, clearDonation, getDonationProcessedDetail } = require('../models/Donation');

// donation
exports.donation = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const donation = await getDonation(userID);

  res.status(200).json({ success: true, status: 200, data: donation});
});

exports.donationByID = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const { donationID } = req.params;
  const donationByID = await getDonationById(userID, donationID);

  res.status(200).json({ success: true, status: 200, data: donationByID });
})

exports.detailDonationProcessed = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const { processedID } = req.params;

  const donorProcessed = await getDonationProcessedDetail(userID, processedID);
  res.status(200).json({ success: true, status: 200, message: 'Success get detail donation process', data: donorProcessed })
});


exports.deleteDonation = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const { donationID } = req.params;
  const deleteDonation = await deleteDonationByID(userID, donationID)

  res.status(200).json({ success: true, status: 200, data: deleteDonation });

})

exports.clearDonation = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const clearDonation = await clearDonation(userID);
  
  res.status(200).json({ success: true, status: 200, data: clearDonation});
});
