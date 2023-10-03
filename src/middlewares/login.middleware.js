function validaLogin (req,res,next){

if (req.session.user) next()
else res.send({mensaje:'NO ESTAS LOGUEADO, DIRIGETE A http://localhost:4000/api/login' })

}

export default validaLogin