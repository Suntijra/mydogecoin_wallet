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
        document.getElementById("account_list").innerHTML = innerhtml
        document.getElementById("addrForSend").value = listaccouunt[0]
        // console.log(innerhtml)
    }).catch((err) => {
        console.log(err)
    });
}