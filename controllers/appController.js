// make connection to database 
const supabase = require('../models/dbConnection')

const requestBlood =  async (req, res) => {
    const  { data: { user } } = await supabase.auth.getUser()
    if(user) {
        const { bloodType,quantity, hospitalName, hospitalAddress, latitude, longitude } = req.body
        const request = await supabase
                        .from('blood_request')
                        .insert({
                            user_id : user.id,
                            blood_type: bloodType,
                            quantity: quantity,
                            hospital_name: hospitalName,
                            hospital_address: hospitalAddress,
                            latitude: latitude,
                            longitude: longitude
        }).select()
        res.send(request)
    } else {
        res.send("Unauthorize")
    }
}

const showRequests = async (req, res) => {
    const  { data: { user } } = await supabase.auth.getUser()
    if(user) {
        const { data, error } = await supabase.rpc('nearby_request', {
            lat: -7.383023880214685, 
            long:  108.24426163886679            
        })
        res.send(data)
    } else {
        res.send("Unauthorize")
    }
}

module.exports = { requestBlood, showRequests }