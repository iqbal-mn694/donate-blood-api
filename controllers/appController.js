// make connection to database
const supabase = require('../models/dbConnection');

// request blood module
exports.requestBlood = async (req, res) => {
  try {
    // blood request from user
    const { bloodType, quantity, hospitalName, latitude, longitude } = req.body;

    // save blood request data from user to database
    const request = await supabase
      .from('blood_request')
      .insert({
        user_id: req.authId, // foreign key user id from table profile
        blood_type: bloodType,
        quantity: quantity,
        hospital_name: hospitalName,
        location: `POINT(${longitude} ${latitude})`, // datatype for location
      })
      .select();

    res.send(request);
  } catch (error) {
    res.send(error);
  }
};

// show request blood module based on nearest location
exports.showRequests = async (req, res) => {
  try {
    // find nearby request location with coordinates (latitude and longitude)
    const { data, error } = await supabase.rpc('nearby_request', {        
      lat: -7.488713054910411,  
      long: 108.05294789595146,
    });

    // show data result
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

// donate blood module
exports.donateBlood = async (req, res) => {
  try {
    // menghitung total donasi berdasarkan request id
    const { data: totalDonasi, error } = await supabase
      .from('donation')
      .select('count')
      .eq('request_id', req.body.requestId)
      
    // mendapatkan detail blood request
    const { data: bloodRequest, err } = await supabase
      .from('blood_request')
      .select('*')
      .eq('id', req.body.requestId)
      .single()
        
    // jika sudah memenuhi kuantitas maka ubah status
    if(totalDonasi[0].count <=  bloodRequest.quantity) {
      // insert donor data to database
      const donate = await supabase
      .from('donor')
      .insert({
        user_id: req.authId,
      })

      // insert donation data to database
      const donation = await supabase
        .from('donation')
        .insert({
          user_id: req.authId,
          request_id: req.body.requestId,
        })

        res.send({ donate, donation });
      } else {
        const { error } = await supabase
          .from('blood_request')
          .update({ status: "fulfilled"}) 
          .eq('id', req.body.requestId)  

        res.send(bloodRequest)
      }
  } catch (error) {
    res.send(error);
  }
}

exports.checkEligibelity = async (req, res) => {
  const isEligible = require('../libs/isEligibel')
  // const { data: { user }, errorUser } = await supabase.auth.getUser();
  // const { data } = await supabase.rpc('nearby_request', {        
  //   lat: -7.488713054910411,  
  //   long: 108.05294789595146,
  // })
  // .single()

  // res.send(data)
  return isEligible(req.body) ? res.send("Anda Layak, silahkan menuju ke lokasi") : res.send("Tidak layak")
}
