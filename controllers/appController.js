const asyncWrapper = require('../libs/asyncWrapper');

const { getBloodRequest, makeBloodRequest, getBloodRequestByID, updateRequestStatus } = require('../models/BloodRequest');
const { countDonationByRequestID, insertDonation, getDonation } = require('../models/Donation');
const { insertDonor } = require('../models/Donor');


// request blood module
exports.makeBloodRequest = asyncWrapper(async (req, res) => {
  const getAuthID = req.authId;
  const { bloodType, quantity, hospitalName, latitude, longitude } = req.body;

  const bloodRequest = await makeBloodRequest(getAuthID, bloodType, quantity, hospitalName, latitude, longitude);

  res.status(201).json(bloodRequest)
});

// show request blood module based on nearest location
exports.getBloodRequest = asyncWrapper(async (req, res) => {
    const { lat, long } = req.query;
    const bloodRequest = await getBloodRequest(lat, long);

    res.status(200).json(bloodRequest);
})

// donate blood by request ID
exports.donateBloodByRequestID = asyncWrapper(async (req, res) => {
  const getAuthID = req.authId;
  const { requestID } = req.params;

  const donationTotalByRequestID = await countDonationByRequestID(requestID)
  const bloodRequest = await getBloodRequestByID(requestID)
  const bloodRequestQuantity = bloodRequest.quantity

  // check if user's blood request is fulfiled
  if(donationTotalByRequestID <  bloodRequestQuantity) {
    const donor = await insertDonor(getAuthID);
    const donation = await insertDonation(getAuthID, requestID);

    res.status(201).json({ success: true, message: "Blood has been donated successfully" });
  }

  // if fulfiled change status to fulfiled 
  const changeRequestStatus = await updateRequestStatus(requestID);

  res.status(201).json(changeRequestStatus)
});

exports.donateBlood = asyncWrapper(async (req, res) => {
  const getAuthID = req.authId;
  const donor = await insertDonor(getAuthID);
  const donation = await insertDonation(getAuthID);

  res.status(201).json({ success: true, message: "Blood has been donated successfully" });
})

exports.donation = asyncWrapper(async (req, res) => {
  const donation = await getDonation();

  res.status(200).json(donation);
})
exports.checkEligibelity = async (req, res) => {
  const isEligible = require('../libs/isEligibel')
  // const { data: { user }, errorUser } = await supabase.auth.getUser();
  // const { data } = await supabase.rpc('nearby_request', {        
  //   lat: -7.488713054910411,  
  //   long: 108.05294789595146,ss
  // })
  // .single()

  // res.send(data)
  return isEligible(req.body) ? res.send("Anda Layak, silahkan menuju ke lokasi") : res.send("Tidak layak")
}
