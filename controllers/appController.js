// make connection to database 
const supabase = require('../models/dbConnection')

const requestBlood =  async (req, res) => {
    const  { data: { user } } = await supabase.auth.getUser()
    if(user) {
        const { bloodType,quantity, hospitalName, hospitalAddress } = req.body
        const request = await supabase
                        .from('blood_request')
                        .insert({
                            user_id : user.id,
                            blood_type: bloodType,
                            quantity: quantity,
                            hospital_name: hospitalName,
                            hospital_address: hospitalAddress
        }).select()
        res.send(request)
    } else {
        res.send("Unauthorize")
    }
    

    
}

module.exports = { requestBlood }