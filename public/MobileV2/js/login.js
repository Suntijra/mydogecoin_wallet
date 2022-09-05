localStorage.clear()
document.getElementById("login_btn").addEventListener("click", function () {
    let id_user = document.getElementById("log_user").value;
    let id_pwd = document.getElementById("log_pwd").value;
    if (id_user == "" || id_pwd == "") {
        alert("Please fill in all the fields");
    }
    else {
        axios.post('https://api.hivr.app/api/post/login', {
            username: id_user,
            password: id_pwd
        }).then((result) => {
            let data = result.data
            console.log(data)
            if (data.status == "success") {
                localStorage.setItem('token', data.token),
                    localStorage.setItem('addr_count', data.addr_count),
                    Swal2Alert('success', data.Result, 'success')
                setInterval(() => {
                    window.location.href = "./main.html";
                }, 1000);

            }
            else {
                Swal2Alert('error', 'Wrong username or password', ' ')
                // alert("Wrong username or password");
            }

        }).catch((err) => {
            console.log(err)
            Swal2Alert('error', 'server catch!!', 'error')
        });
    }
});
function Swal2Alert(icon = 'success', title = 'Success', text = 'Success') {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        // footer: '<a href="">Why do I have this issue?</a>'
    })
}