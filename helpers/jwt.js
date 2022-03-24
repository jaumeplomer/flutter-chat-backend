const jwt = require('jsonwebtoken');


const generarJWT = ( uid ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, ( err, token) => {

            if ( err ) {
                //no se pot crear tken
                reject('No se pogut generar el JWT');
            } else {
                //Tokenn
                resolve( token );
            }

        })

    });
    

}


module.exports = {
    generarJWT
}