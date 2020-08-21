// Puerto del servidor
process.env.PORT = process.env.PORT || 3008;

//Entorno, desarrollo, produccion
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

process.env.CADUCIDAD_TOKEN = '8h';

// SEED
process.env.SEED = process.env.SEED || 'eventoSena';

// Cadena de conexion a la Base de datos
//process.env.URLDB='mongodb+srv://gortiza:k1ngk0ng@cluster0-uzpnb.mongodb.net/misena?retryWrites=true&w=majority'

process.env.URLDB='mongodb+srv://jtapiaz:tapias0414@cluster0-hxgql.mongodb.net/test?retryWrites=true&w=majority'
//process.env.URLDB='mongodb://localhost/BaseDatos'

process.env.SECRET="fabrica2020"


