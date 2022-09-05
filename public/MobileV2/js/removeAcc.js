// const { default: axios } = require("axios");

function removeAcc(){
    swal.fire({
        title: "Please, fill password",
        text: "",
        input: "password",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "red",
        confirmButtonColor: "#59CE8F",
    }).then((result) => {
        if (result.isConfirmed) {
            pwd = $('.swal2-input').val();
            console.log("pwd",pwd)
            if (!!pwd == false) {
                swal.fire({
                    title: "please input password!",
                    icon: "warning",
                    timer: 1500,
                    toast: true
                })
            }
            else {
                // console.log("================>>>>test sendFrom")
                let amount = document.getElementById("doge_balance").textContent.split(" ");
                amount = parseFloat(amount[0]);
                axios.post("https://api.hivr.app/api/removeaccount",{
                    "token": localStorage.getItem("token"),
                    "password": pwd
                }).then(res => {
                    console.log("================>>>>1")
                    console.log("res",res.data.msg)
                    window.location.href = "/../MobileV2/signin-up.html"
                }).catch(err =>{
                    console.log("================>>>>2")
                    console.log("err",err)
                })
                // axios.post("https://api.hivr.app/api/sendFrom", {
                //     "token": localStorage.getItem("token"),
                //     "address": document.getElementById("addrForSend").textContent,
                //     "amount": amount,
                //     "password": pwd
                // }).then((result) => {
                //     try {
                //         console.log("result =====>", result.data)
                //         swal.fire({
                //             title: 'Success',
                //             icon: 'success',
                //         })
                //     } catch (e) {
                //         swal.fire({
                //             title: 'Fail',
                //             icon: 'error',
                //         })
                //     }

                // }).catch((err) => {
                //     console.log("err ===>", err)
                //     swal.fire({
                //         title: 'Error',
                //         icon: 'error',
                //         text: err.data.msg,
                //         timer: 2500
                //     })
                // });
            }
        }

    });
}