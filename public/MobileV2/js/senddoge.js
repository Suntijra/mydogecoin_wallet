document.getElementById("send_tx").addEventListener("click", () => {

    Swal.fire({
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
                Swal.fire({
                    title: "please input password!",
                    icon: "warning",
                    timer: 1500
                })
            }
            else {
                console.log("================>>>>test sendFrom")
                axios.post("https://api.hivr.app/api/sendFrom", {
                    "token": localStorage.getItem("token"),
                    "address": document.getElementById("address_tx").value,
                    "amount": document.getElementById("amount_tx").value,
                    "password": pwd
                }).then((result) => {
                    try {
                        console.log("result =====>", result.data)
                        let data = result.data
                        let msg = data.msg
                        if (data.status === "failed"){
                            Swal.fire({
                                icon: 'error',
                                title: msg
                            })
                        }else{
                            Swal.fire({
                                imageUrl:"./img/dogehead.png",
                                imageWidth:"200",
                                imageHeight:"200",
                                title: msg
                            }) 
                        }
                        
                    } catch (e) {
                        Swal.fire({
                            title: 'Fail',
                            icon: 'error',
                        })
                    }

                }).catch((err) => {
                    // console.log("err ===>", err)
                    Swal.fire({
                        title: 'Error',
                        icon: 'error',
                        text: 'err',
                        timer: 2500
                    })
                });

            }
        }

    });



})