const asyncWrapper = require('../libs/asyncWrapper');
const ErrorHandler = require('../libs/errorHandler');
const { getBloodRequest, makeBloodRequest, getBloodRequestByID, updateRequestStatus } = require('../models/BloodRequest');
const { countDonationByRequestID, insertDonation } = require('../models/Donation');
const { insertDonor } = require('../models/Donor');


// request blood module
exports.makeBloodRequest = asyncWrapper(async (req, res) => {
    const getAuthID = req.authId
    const { bloodType, quantity, hospitalName, latitude, longitude } = req.body;

    const bloodRequest = await makeBloodRequest(getAuthID, bloodType, quantity, hospitalName, latitude, longitude)
    res.status(201).json(bloodRequest)
});

// show request blood module based on nearest location
exports.getBloodRequest = asyncWrapper(async (req, res) => {
    const bloodRequest = await getBloodRequest()
    res.status(200).json(bloodRequest);
})

// donate blood
exports.donateBlood = asyncWrapper(async (req, res) => {
  const getAuthID = req.authId
  const { requestID } = req.body

  const donationTotalByRequestID = await countDonationByRequestID(requestID)
  const bloodRequest = await getBloodRequestByID(requestID)
  const bloodRequestQuantity = bloodRequest.quantity

  // check if user's blood request is fulfiled
  if(donationTotalByRequestID <=  bloodRequestQuantity) {
    const donor = await insertDonor(getAuthID)
    const donation = await insertDonation(getAuthID, requestID)

    res.send({ donor, donation });
  }

  // if fulfiled change status to fulfiled 
  const changeRequestStatus = await updateRequestStatus(requestID)
  res.status(200).json(changeRequestStatus)
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
