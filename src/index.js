require("./Configs/config");
console.clear();

// ---------------------------------- //
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan')
var cors = require('cors')


mongoose.set('useCreateIndex', true);

// Database Connection
mongoose.connect(process.env.URLDB, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true})
    .then(() => {
        console.log('¡Connection Successfully!')
    });


// Initialize the application
const app = express();


// Middlewares
app.use('/static', express.static(__dirname + '/reportes'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'))
app.set('trust proxy', true);

// Cors
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


// Habilitar cors (DE MANERA LIMITADA)
// En esta ocasion sera abierta para mi
const whitelist=['http://senamecuida.sertec-csge.com.co'];
const corsOptions={
    origin: (origin,callback) => {
        
        const existe = whitelist.some(dominio => dominio=== origin);

        if (existe) {
            callback(null,true)
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}

// Esta limita el acceso
app.use(cors(corsOptions));

// Esta es abierta para todo el mundo.
// app.use(cors());




//Routes
app.use("/api/visitante", require('./Routes/visitanteRoutes'));
app.use("/api/funcionario", require('./Routes/funcionarioRoutes'));
app.use("/api/aprendiz", require('./Routes/aprendizRoutes'));
app.use("/api/administrador", require('./Routes/administradorRoutes'))
app.use("/api/seguridad", require('./Routes/seguridadRoutes'))
app.use("/api/ingresoDia", require('./Routes/ingresoDiaRoutes'))
app.use("/api/salidaDia", require('./Routes/salidaDiaRoutes'))
app.use("/api/estado", require('./Routes/estadoRoutes'))
app.use("/api/estadoAprendiz", require('./Routes/estadoAprendizRoutes'))
app.use("/api/estadoFuncionario", require('./Routes/estadoFuncionarioRoutes'))
app.use("/api/estadoVisitante", require('./Routes/estadoVisitanteRoutes'))
app.use("/api/noIngresoDia", require('./Routes/noIngresoDiaRoutes'))
app.use("/api/saludEstado", require('./Routes/EstadoSaludRoutes'))
app.use("/api/reporteSaludDia", require('./Routes/reporteSaludDiaRoutes'))
app.use("/api/reporteSalud", require('./Routes/reporteSaludRoutes'))
app.use("/api/reporteInsumo", require('./Routes/repInsumoRoutes'))
app.use("/api/reporteLimpieza", require('./Routes/repLimpiezaRoutes'))
app.use("/api/ingresoSuspendido", require('./Routes/ingresoSuspendidoRoutes'))
app.use("/api/soporte", require('./Routes/soporteRoute'))


// Run the server
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
