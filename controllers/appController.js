const asyncWrapper = require('../libs/asyncWrapper');
const {
  getBloodRequest,
  getBloodRequestedList,
  makeBloodRequest,
  getBloodRequestByID,
  updateRequestStatus,
  deleteBloodRequestedByID,
  clearBloodRequested,
  updateBloodRequestedByID,
  getRecipient } = require('../models/BloodRequest');

const { 
  countDonationByRequestID,
  insertDonation,
  getDonation,
  deleteDonationByID,
  getDonationById,
  clearDonation } = require('../models/Donation');
const { insertDonor } = require('../models/Donor');


// request blood module
exports.makeBloodRequest = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const { bloodType, quantity, hospitalName, latitude, longitude } = req.body;

  const bloodRequest = await makeBloodRequest(getAuthID, bloodType, quantity, hospitalName, latitude, longitude);

  res.status(201).json({ success: true, code: 201, data: bloodRequest })
});

exports.updateBloodRequest = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const { requestID } = req.params;
  const { bloodType, quantity, hospitalName, latitude, longitude } = req.body;

  const update = await updateBloodRequestedByID(userID, requestID, bloodType, quantity, hospitalName, latitude, longitude);

  res.status(200).json({ success: true, code: 200, data: update });
})

// show request blood module based on nearest location
exports.getNearbyRecipients = asyncWrapper(async (req, res) => {
    const { lat, long } = req.query;
    const bloodRequest = await getBloodRequest(lat, long);

    res.status(200).json({ success: true, code: 200, data: bloodRequest });
});

// get blood requested byID
exports.getRecipient = asyncWrapper(async (req, res) => {
  const { requestID } = req.params;
  const bloodRequestedByID = await getRecipient(requestID);

  res.status(200).json({ success: true, code: 200, data: bloodRequestedByID });
});

// get blood requested byID
exports.getBloodRequest = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const { requestID } = req.params;
  const bloodRequestedByID = await getBloodRequestByID(userID, requestID);

  res.status(200).json({ success: true, code: 200, data: bloodRequestedByID });
});

// show blood requested
exports.getBloodRequests = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const bloodRequestedList = await getBloodRequestedList(userID);

  res.status(200).json({ success: true, code: 200, data: bloodRequestedList });
});

exports.deleteBloodRequest = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const { requestID } = req.params;
  const deleteBloodRequest = await deleteBloodRequestedByID(userID, requestID);
  
  res.status(200).json({ success: true, code: 200, data: deleteBloodRequest });
});

exports.clearBloodRequest = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const clear = await clearBloodRequested(userID);
  
  res.status(200).json({ success: true, code: 200, data: clear});
});



// donate
// donate blood by request ID
exports.donateBloodByRequestID = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const { requestID } = req.params;

  const donationTotalByRequestID = await countDonationByRequestID(requestID)
  const bloodRequest = await getBloodRequestByID(requestID)
  const bloodRequestQuantity = bloodRequest.quantity

  // check if user's blood request is fulfiled
  if(donationTotalByRequestID <  bloodRequestQuantity) {
    const donor = await insertDonor(userID);
    const donation = await insertDonation(userID, requestID);

    res.status(201).json({ success: true, message: "Blood has been donated successfully" });
  }
  // if fulfiled change status to fulfiled 
  const changeRequestStatus = await updateRequestStatus(requestID);

  res.status(201).json(changeRequestStatus)
})

exports.donateBlood = asyncWrapper(async (req, res) => {
  const { id: userID } = req.userID;
  const donor = await insertDonor(userID);
  const donation = await insertDonation(userID);

  res.status(201).json({ success: true, code: 201, message: "Blood has been donated successfully" });
})


// donation
exports.donation = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const donation = await getDonation(userID);

  res.status(200).json({ success: true, code: 200, data: donation});
});

exports.donationByID = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const { donationID } = req.params;
  const donationByID = await getDonationById(userID, donationID);

  res.status(200).json({ success: true, code: 200, data: donationByID });
})


exports.deleteDonation = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const { donationID } = req.params;
  const deleteDonation = await deleteDonationByID(userID, donationID)

  res.status(200).json({ success: true, code: 200, data: deleteDonation });

})
exports.checkEligibelity = async (req, res) => {
  const isEligible = require('../libs/isEligibel')
  // const { data: { user }, errorUser } = await supabase.auth.getUser();
  // const { data } = await supabase.rpc('nearby_request', {        
  //   lat: -7.488713054910411,  
  //   long: 108.05294789595146,ss
  // })
  // .single()

  // res.send(data)c *lef 
  return isEligible(req.body) ? res.send("Anda Layak, silahkan menuju ke lokasi") : res.send("Tidak layak")
}

exports.clearDonation = asyncWrapper(async (req, res) => {
  const { id: userID } = req.user;
  const clearDonation = await clearDonation(userID);
  
  res.status(200).json({ success: true, code: 200, data: clearDonation});
});
