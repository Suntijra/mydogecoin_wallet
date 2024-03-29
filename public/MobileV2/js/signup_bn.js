axios('https://api.hivr.app/api/get/register').then(res => {
    // console.log(res.data.Result);
    data = res.data.Result
    document.getElementById('sign_up').addEventListener("click", function () {
        user = $('#id_username').val();
        pwd = $('#id_password').val();
        pwd_cf = $('#id_password_cf').val();
        var pattern = /^[0-9a-zA-Z]{8,}$/;
        if (user.match(pattern) && pwd.match(pattern) && pwd_cf.match(pattern)) {
            // Swal2Alert('error', 'Error', 'Please fill all field')
              Swal.fire({
                title: 'Error !',
                text: 'Please fill all field',
                 imageUrl:'./img/dogehead.png',
                 imageWidth: 200,
                 imageHeight: 200,
                 imageAlt: 'Custom image',
               })
        }
        else if (pwd != pwd_cf) {
            console.log('worng')
            // Swal2Alert(icon = 'error', title = 'Oops...', text = 'Password not match')
            Swal.fire({
                title: 'Oops..., color',
                text: 'Password not match',
                 imageUrl:'./img/moon.png',
                 imageWidth: 200,
                 imageHeight: 200,
                 imageAlt: 'Custom image',
               })
            
        } else {
            axios.post('https://api.hivr.app/api/insert/register', {
                username: user,
                password: pwd
            })
                .then(function (response) {
                    console.log(response.data.status);
                    let status = response.data.status
                    let result_title = response.data.Result
                    if (status == true) {
                        // Swal2Alert('success',result_title,'Success')
                        // document.getElementById('id_loading').style.display = 'flex'
                        setTimeout(() => {
                            window.location.href = 'login.html'
                        }, 1500);

                    } else {
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

 

function Swal2Alert(icon = 'success', title = 'Success', text = 'Success') {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        // footer: '<a href="">Why do I have this issue?</a>'
    })
}
