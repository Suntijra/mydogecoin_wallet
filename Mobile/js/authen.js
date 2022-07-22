
JWTToken = localStorage.getItem('token')

let headersList = {

        "Access-Control-Allow-Origin" : "*",
        "Content-type": "Application/json",
        "Authorization": "Bearer " + JWTToken 
}
   
   
   let reqOptions = {
     url: "http://167.99.71.116:3000/api/post/authen",
     method: "POST",
     headers: headersList,
   }
   
   axios.request(reqOptions).then(function (response) {
     console.log("authentication :>>>>",response.data.msg);
     if(response.data.status == 'ok'){
         alert('authen success')
        
     }else{
        alert('authen failed')
        // window.location.href = './login.html'
     }

   }).catch(function (error) {
        alert('authen failed')
        // window.location.href = './login.html'
        console.log(error);
   })

