const captainmodel = require('../models/caption.model');

module.exports.createCaption = async ({
    firstname, lastname, email, password,color,plate,capacity,vehicleType
})=>{ 
    if (!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }
    const caption = await captainmodel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });

}

