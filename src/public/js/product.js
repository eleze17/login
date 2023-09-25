const btnenviar = document.getElementById('enviar')
if (btnenviar){
btnenviar.addEventListener('click',()=>{


    const title = document.getElementById('title').value
    const descripcion = document.getElementById('descripcion').value
    const categoria = document.getElementById('categoria').value
    const precio = document.getElementById('precio').value
    const codigo = document.getElementById('codigo').value
    const stock = document.getElementById('stock').value
    
    const data = {  title,
                    description:  descripcion,
                    category: categoria,
                    price:      precio,
                    code:     codigo,
                    stock
                }



    fetch('/api/products',{method: 'POST',
                      body: JSON.stringify(data),
                      headers: {'Content-type': 'application/json; charset=UTF-8'}
}  )
.then(res=>res.json()  )
    .then(resjson => {
        alert(JSON.stringify(resjson))
})


})
}
const btnadd = document.getElementsByName('addcart')

btnadd.forEach(element=>{

    const id = element.className
    const data = {id}
    
    element.addEventListener('click',()=>{
    
    fetch('/api/carts',{method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-type': 'application/json; charset=UTF-8'}
    
})
.then(res=>res.json()  )
    .then(resjson => {
        alert(JSON.stringify(resjson))})

})

})


const logoutbtn = document.getElementById('logout')
logoutbtn.addEventListener('click',()=>{

     fetch('/api/login/logout')
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