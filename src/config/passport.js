import local from 'passport-local' // Importo la estrategia
import passport from 'passport'
import GithubStrategy from 'passport-github2'
import { createHash, validatePassword } from '../utils.js'
import { userModel } from '../Dao/models/user.model.js'

// Defino la estregia a utilizar
const LocalStrategy = local.Strategy

const initializePassport = () => {

    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
        
        const { nombre, apellido, edad } = req.body
        try {
        const existe = await userModel.find({email:username})
        if(existe[0])  return done(null, false)
        else {
        const passwordHash = createHash(password)     
        const user = await userModel.create({ nombre, apellido, edad, email:username, password: passwordHash })
        return done(null, user)
    } 
    }
    catch (error) {
        return done(error)
    }   }
    ))

passport.use('login', new LocalStrategy(
        { usernameField: 'email' }, async (username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username })
                if (!user) {
                    return done(null, false)
                }

                if (validatePassword(password, user.password)) {
                    return done(null, user)
                }

                return done(null, false)

            } catch (error) {
                return done(error)
            }
        }))
        passport.use('github', new GithubStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.SECRET_CLIENT,
            callbackURL: process.env.CALLBACK_URL
        }, async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await userModel.findOne({ email: profile._json.email })
                if (user) {
                    done(null, false)
                } else {
                    console.log(profile)
                    console.log(profile._json.email)
                    console.log(profile._json.name)

                    const userCreated = await userModel.create({
                        nombre: profile._json.name,
                        apellido: ' ',
                        email: profile._json.email,
                        edad: 18, // Edad por defecto
                        password: createHash(profile._json.email + profile._json.name)
                    })
                    done(null, userCreated)
                }
    
    
            } catch (error) {
                done(error)
            }
        }))



    // Inicializar la session del user
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    // Eliminar la session del user
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })

}

export default initializePassport