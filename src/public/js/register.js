const registerbtn = document.getElementById('register')
registerbtn.addEventListener('click',()=>{

    const email = document.getElementById('email').value
    const password = document.getElementById('pass').value
    const nombre = document.getElementById('nombre').value
    const apellido = document.getElementById('apellido').value
    const edad = document.getElementById('edad').value
    
    const data = {email,
                  password,
                  nombre,
                  apellido,
                  edad  }

    fetch('/api/register',{method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-type': 'application/json; charset=UTF-8'}
    
})
.then(res=>{
    if(res.status === 200){
    const {url} = res
    window.location.href = url}
    else{
        res.json()
        .then(resp =>alert(JSON.stringify(resp)))
    }
})

})