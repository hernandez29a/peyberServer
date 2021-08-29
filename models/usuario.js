const { Schema, model } =require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required:[true, 'La constraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        //enum:['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type:Boolean,
        default:true
    }
});

// transformar el id y quitar el password de la salida

//transformar el id y quitar el password de la salida
UsuarioSchema.method('toJSON', function() {
    const { __v,_id, password, ...usuario } = this.toObject();

    usuario.uid = _id;
   return usuario;
})

module.exports = model('Usuario', UsuarioSchema);