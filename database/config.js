const moongose = require('mongoose');

const dbConnection = async() => {

    try {
        
        await moongose.connect( process.env.MONGODB_CNN , {
            useNewUrlParser: true,
            useUnifiedTopology:true,
            /*opciones generan errores 
            useCreateIndex:true,
            useFindAndModify:false*/
        });

        console.log('Base de datos de Peyber en línea');
        

    } catch (error) {
        console.log(error);
        throw new Error('Error para iniciar la base de datos');
    }


}

const dbConnectionTest = async() => {

    try {
        
        await moongose.connect( process.env.MONGODB_TEST , {
            useNewUrlParser: true,
            useUnifiedTopology:true,
            /*opciones generan errores 
            useCreateIndex:true,
            useFindAndModify:false*/
        });

        console.log('Base de datos de prueba esta en línea');
        

    } catch (error) {
        console.log(error);
        throw new Error('Error para iniciar la base de datos');
    }


}

module.exports = {
    dbConnection,
    dbConnectionTest
};