import { Router } from 'express'
import { userModel } from '../Dao/models/user.model.js'

const loginRouter = Router()

loginRouter.get('/', (req, res) => {
    res.render('login',
    {
        css:'/login.css',
        js: '/login.js'
    })    
})

loginRouter.post('/', async (req, res) => {
    const { email, password } = req.body

    try {
        if (req.session.login) {
            res.status(401).send({ resultado: 'Login ya existente' })
        }
        else{
        const user = await userModel.findOne({ email })

        if (user) {
            if (user.password === password) {
                req.session.login = user
                res.redirect('/api/products',200,user)}
              
                else {res.status(401).send({ resultado: 'Contaseña no valida', message: password })}
        } else {
            res.status(404).send({ resultado: 'Not Found', message: user })
        }
    }
    } catch (error) {
        res.status(400).send({ error: `Error en Login: ${error}` })
    }
})

loginRouter.get('/logout', (req, res) => {
    if (req.session.login) {
        req.session.destroy()
        res.redirect('/api/login', 200, { resultado: 'Usuario deslogueado' })
    }
    else{ res.send({ resultado: 'No habia sesion iniciada'})}
})




export default loginRouter