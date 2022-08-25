
Token = localStorage.getItem('token')
// User = localStorage.getItem('user')
let headersList = {

        "Access-Control-Allow-Origin" : "*",
        "Content-type": "Application/json",
        "Authorization": "Bearer " + Token 
}
   
   
   let reqOptions = {
     url: "http://167.99.71.116:3000/api/post/authen",
     method: "POST",
     headers: headersList,
   }
   
   axios.request(reqOptions).then(function (response) {
    
     if(response.data.status == 'ok'){
        //  alert('authen success')
        console.log("authentication :>>>>",response.data.msg);
     }else{
        // alert('authen failed')
        console.log("authentication :>>>>",response.data.msg);
        window.location.href = './login.html'
     }

   }).catch(function (error) {
        alert('authen failed')
        window.location.href = './signin-up.html'
        console.log(error);
   })

