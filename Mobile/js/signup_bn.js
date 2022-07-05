axios('http://192.168.1.18:8000/api/get/register').then(res => {
    // console.log(res.data.Result);
    data = res.data.Result

    document.getElementById('sign_up').addEventListener("click", function () {
        user = document.getElementById('id_username').value
        pwd = document.getElementById('id_password').value
        pwd_cf = document.getElementById('id_password_cf').value
        if (pwd != pwd_cf) {
            console.log('worng')
            Swal2Alert(icon = 'error', title = 'Oops...', text = 'Password not match')
        } else {
            axios.post('http://192.168.1.18:8000/api/insert/register', {
                username: user,
                password: pwd
            })
                .then(function (response) {
                    console.log(response.data.status);
                    let status = response.data.status
                    let result_title = response.data.Result
                    if(status == true){
                        // Swal2Alert(title = result_title,icon = 'success')
                        document.getElementById('id_loading').style.display = 'flex'
                       setTimeout(() => {
                        window.location.href = 'login.html'
                       }, 1000);
                       
                    }else{
                        Swal2Alert(icon = 'error', title = result_title, text = 'Plase try again')
                    }
                    
                })
                .catch(function (error) {
                    console.log(error);
                    Swal2Alert(icon = 'error', title = 'Server catch!', text = 'Error')
                });
        }
    });
}).catch(err => {
    console.log(err);
});

// Swal2Alert('error','aim','aim2')
// Swal.fire({
//     title: 'Sweet!',
//     text: 'Modal with a custom image.',
//     imageUrl: 'https://unsplash.it/400/200',
//     imageWidth: 400,
//     imageHeight: 200,
//     imageAlt: 'Custom image',
//   })


function Swal2Alert(icon = 'success', title = 'Success', text = 'Success') {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        // footer: '<a href="">Why do I have this issue?</a>'
    })
}
