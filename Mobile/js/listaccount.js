getlistaddr()
function getlistaddr() {
    axios.post("http://167.99.71.116:3000/api/listaddress", {
        "token": localStorage.getItem("token")
    }).then((result) => {
        let listaccouunt = result.data.listaddr
        let innerhtml = ``;
        listaccouunt.forEach(element => {
            console.log(element)
            innerhtml += `<div class="scroll-inside-contant">
        <img style="height: 38px;" src="./img/profilemoon.png" alt="">
        <span class="accgen">${element}</span>
    </div>`
        })
        document.getElementById("account_list").innerHTML = innerhtml
        console.log(innerhtml)
    }).catch((err) => {
        console.log(err)
    });
}