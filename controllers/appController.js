// make connection to database 
const supabase = require('../models/dbConnection')

// request blood module
exports.requestBlood =  async (req, res) => {
    try {
        // get authenticated user
        const  { data: { user }, error } = await supabase.auth.getUser()
        
        // is user authenticated?
        if(user) {
            // blood requst from user
            const { bloodType, quantity, hospitalName, latitude, longitude } = req.body
            
            // save blood request data from user to database
            const request = await supabase
                .from('blood_request')
                .insert({
                    user_id : user.id, //foreign key user id from tabel profile
                    blood_type: bloodType,
                    quantity: quantity,
                    hospital_name: hospitalName,
                    location: `POINT(${longitude} ${latitude})` // datatype for location
            }).select()
    
            res.send(request)
        } else {
            throw error 
        }
    } catch (error) {
        res.send(error)   
    }
}

// show request blood module base on nearest location
exports.showRequests = async (req, res) => {
    try {
        // get authenticated user
        const  { data: { user }, error } = await supabase.auth.getUser()
        
         // is user authenticated?
        if(user) {
            // find nearby request location with coordinate(latitude, and langitude)
            const { data, error } = await supabase.rpc('nearby_request', {
                lat: -7.488713054910411,
                long:  108.05294789595146             
            })

            // show data result
            res.send(data)
        } else {
            throw error
        }
    } catch (error) {
        res.send(error)
    }
}

// donate blood module
exports.donateBlood = async (req, res) => {
    try {
        // get authenticated user for authenticate
        const  { data: { user }, error } = await supabase.auth.getUser()
        
         // is user authenticated?
        if(user) {
            // insert donor data to databse
            const donate = await supabase.from('donor').insert({
                user_id: user.id
            })
            
            // insert donation data to database
            const donation = await supabase.from('donation').insert({
                user_id: user.id,
                request_id: req.body.requestId,
                quantity: req.body.quantity,
            })
            
            // data result
            res.send({ donate, donation })
            } else {
                throw error
        }
    } catch (error) {
        res.send(error)
    }
}