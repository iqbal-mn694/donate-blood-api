// make connection to database 
const supabase = require('../models/dbConnection')

exports.requestBlood =  async (req, res) => {
    const  { data: { user } } = await supabase.auth.getUser()

    if(user) {
        const { bloodType, quantity, hospitalName, latitude, longitude } = req.body

        const request = await supabase
            .from('blood_request')
            .insert({
                user_id : user.id,
                blood_type: bloodType,
                quantity: quantity,
                hospital_name: hospitalName,
                location: `POINT(${longitude} ${latitude})`
        }).select()

        res.send(request)
    } else {
        res.send("Unauthorize")
    }
}

exports.showRequests = async (req, res) => {
    const  { data: { user } } = await supabase.auth.getUser()

    if(user) {
        const { data, error } = await supabase.rpc('nearby_request', {
            lat: -7.488713054910411,
            long:  108.05294789595146             
        })
        res.send(data)
    } else {
        res.send("Unauthorize")
    }
}

exports.donateBlood = async (req, res) => {
    const  { data: { user } } = await supabase.auth.getUser()

    if(user) {
        const donate = await supabase.from('donor').insert({
            user_id: user.id
        })

        const donation = await supabase.from('donation').insert({
            user_id: user.id,
            request_id: req.body.requestId,
            quantity: req.body.quantity,
        })

        res.send({ donate, donation })
        } else {
            res.send("Unauthorize")
    }
}