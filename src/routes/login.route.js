import { Router } from 'express'
import passport from 'passport'
import {generateToken} from '../jwt.js'
const loginRouter = Router()

loginRouter.get('/', (req, res) => {
    res.render('login',
    {
        css:'/login.css',
        js: '/login.js'
    })    
})

loginRouter.post('/', passport.authenticate('login') ,async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send({ mensaje: 'Usuario invalido' })
        }

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
            rol:req.user.rol
        }
        const token = generateToken(req.session.user)
        res.cookie('jwtCookie', token, {
            maxAge: 43200000 // 12hs en ms
        })


        res.redirect('/api/products',200,req.session.user)}
      
        catch (error) {
        res.status(500).send({ mensaje: `Error al iniciar sesion ${error}` })
    }
})
  /*  const { email, password } = req.body

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
}) */

loginRouter.get('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy()
        res.redirect('/api/login', 200, { resultado: 'Usuario deslogueado' })
    }
    else{ res.send({ resultado: 'No habia sesion iniciada'})}
})

loginRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {

})
loginRouter.get('/githubcallback', passport.authenticate('github'), async (req, res) => {
    req.session.user = req.user
    res.status(200).send({ mensaje: 'Usuario logueado' })
})

export default loginRouter