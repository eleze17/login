const loginbtn = document.getElementById('login')
loginbtn.addEventListener('click',()=>{

    const email = document.getElementById('email').value
    const password = document.getElementById('pass').value
    
    const data = {email,
                  password,
                 }

    fetch('/api/login',{method: 'POST',
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