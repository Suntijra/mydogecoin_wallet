getlistaddr()
// document.getElementById("new_addr").addEventListener("click", () => {
//     axios.post("http://167.99.71.116:3000/api/getnewaddress", {
//         "token": localStorage.getItem("token")
//     }).then((response) => {
//         console.log(response.data)
//         getlistaddr()
//     }).catch((err) => {
//         console.log(err)
//     })
// })

function getlistaddr() {
    axios.post("http://167.99.71.116:3000/api/listaddress", {
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