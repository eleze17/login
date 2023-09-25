function validaLogin (req,res,next){

if (req.session.login) next()
else res.send({mensaje:'NO ESTAS LOGUEADO, DIRIGETE A http://localhost:4000/api/login' })

}

export default validaLogin