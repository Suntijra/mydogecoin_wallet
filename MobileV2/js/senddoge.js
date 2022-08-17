document.getElementById("send_tx").addEventListener("click", () => {

    swal.fire({
        title: 'Please input your password to confirm!',
        input: 'password',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        showLoaderOnConfirm: true,
    }).then((result) => {
        if (result.isConfirmed) {
            pwd = $('.swal2-input').val();
            console.log(!!pwd)
            if (!!pwd == false) {
                swal.fire({
                    title: "please input password!",
                    icon: "warning",
                    timer: 1500
                })
            }
            else {
                console.log("================>>>>test sendFrom")
                axios.post("http://167.99.71.116:3000/api/sendFrom", {
                    "token": localStorage.getItem("token"),
                    "address": document.getElementById("address_tx").value,
                    "amount": document.getElementById("amount_tx").value,
                    "password": pwd
                }).then((result) => {
                    try {
                        console.log("result =====>", result.data)
                        swal.fire({
                            title: 'Success',
                            icon: 'success',
                        })
                    } catch (e) {
                        swal.fire({
                            title: 'Fail',
                            icon: 'error',
                        })
                    }

                }).catch((err) => {
                    console.log("err ===>", err.data)
                    swal.fire({
                        title: 'Error',
                        icon: 'error',
                        text: err.data.msg,
                        timer: 2500
                    })
                });

            }
        }

    });



})