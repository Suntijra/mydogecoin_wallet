getlistaddr()
// document.getElementById("new_addr").addEventListener("click", () => {
//     axios.post("https://api.hivr.app/api/getnewaddress", {
//         "token": localStorage.getItem("token")
//     }).then((response) => {
//         console.log(response.data)
//         getlistaddr()
//     }).catch((err) => {
//         console.log(err)
//     })
// })
var addressbyuser

function getlistaddr() {
    axios.post("https://api.hivr.app/api/listaddress", {
        "token": localStorage.getItem("token")
    }).then((result) => {
        let listaccouunt = result.data.listaddr
        let innerhtml = ``;
        listaccouunt.forEach(element => {
            innerhtml += `<div class="scroll-inside-contant">
        <img style="height: 38px;" src="./img/profilemoon.png" alt="">
        <span class="accgen">${element}</span>
    </div>`
        })
        if(listaccouunt[0].lenght != 0){
            $("#addrForSend").append(listaccouunt[0])
            // document.getElementById("addrForSend").value = listaccouunt[0]
            console.log("address :",listaccouunt[0])
            addressbyuser = listaccouunt[0]
        }else{
            $("#addrForSend").append("NaN")
            alert("Error")
            console.error("Error")
            window.location.href("./login.html")
        }
    }).catch((err) => {
        console.log(err)
    });
}