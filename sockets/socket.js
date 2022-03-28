const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', (client) => {
    const [ valido, uid ] = comprobarJWT( client.handshake.headers['x-token'] );

    //Verificar autenticacio
    if ( !valido ) { return client.disconnect(); }

    //Client autenticat
    usuarioConectado( uid );

    //Posar un client a la sala
    //Sala global, client.id, uid_mongo
    client.join( uid );

    //escoltar mensaje-personal
    client.on('mensaje-personal', async( payload ) => {

        await grabarMensaje( payload );
        io.to( payload.para ).emit('mensaje-personal', payload );
    });


    client.on('disconnect', () => {
        usuarioDesconectado( uid );
    });


});
