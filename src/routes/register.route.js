import { Router } from 'express'
import { userModel } from '../Dao/models/user.model.js'
import passport from 'passport'

const registerRouter = Router()

registerRouter.get('/', async (req, res) => {
    res.render('register',
    {
        css:'/register.css',
        js: '/register.js'
    })  
    })

registerRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await userModel.findById(id)
        if (user) {
            res.status(200).send({ respuesta: 'OK', mensaje: user })
        } else {
            res.status(404).send({ respuesta: 'Error en consultar usuario', mensaje: 'User not Found' })
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consultar usuario', mensaje: error })
    }
})

registerRouter.post('/',passport.authenticate('register'), async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).send({ mensaje: 'Usuario ya existente' })
        }

        
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
            rol:req.user.rol
        }
        
        res.redirect('/api/products',200,req.session.user)
    } catch (error) {
        res.status(500).send({ mensaje: `Error al registrar usuario ${error}` })
    }
})

registerRouter.get('/jwt', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req)
    res.send(req.user)
})
  
  
  /*  const { nombre, apellido, edad, email, password } = req.body
    try {
        const existe = await userModel.find({email})
        if(existe[0]) res.status(404).send({ respuesta: 'El email ya fue registrado' })
        else {
        const usuario = await userModel.create({ nombre, apellido, edad, email, password })
        req.session.login = usuario
        res.redirect('/api/products',200,usuario)}
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en crear usuario', mensaje: error })
    }
}) */

registerRouter.put('/:id', async (req, res) => {
    const { id } = req.params
    const { nombre, apellido, edad, email, password } = req.body
    try {
        const user = await userModel.findByIdAndUpdate(id, { nombre, apellido, edad, email, password  })
        if (user) {
            res.status(200).send({ respuesta: 'OK', mensaje: user })
        } else {
            res.status(404).send({ respuesta: 'Error en actualizar usuario', mensaje: 'User not Found' })
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en actualizar usuario', mensaje: error })
    }
})

registerRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await userModel.findByIdAndDelete(id)
        if (user) {
            res.status(200).send({ respuesta: 'OK', mensaje: user })
        } else {
            res.status(404).send({ respuesta: 'Error en eliminar usuario', mensaje: 'User not Found' })
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en eliminar usuario', mensaje: error })
    }
})

export default registerRouter