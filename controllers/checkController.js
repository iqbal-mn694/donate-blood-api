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