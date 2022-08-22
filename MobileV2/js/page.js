// wallet_page()
document.getElementById("senddoge_page").style.display = "none";
document.querySelector('#history_page_id').classList.add("d-none");
document.querySelector('#history_page2_id').classList.add("d-none");
btn_send.onclick = () => {
    document.getElementById("senddoge_page").style.display = "block";
}
btn_back_arrow.onclick = function () {
    document.getElementById("senddoge_page").style.display = "none";
    history_page()
}
const hide_setting = () => { document.querySelector("#setting_main_id").style.display = "none"; }
function setting_about() {
    console.log("About")
    document.querySelector("#setting_id").textContent = "About us"
    document.querySelector("#settingimg").src = "./img/settingv2.svg"
    document.querySelector("#setting_contentid").classList.add("d-none");
}




function settingPage() {
    document.querySelector("#setting_contentid").classList.remove("d-none");
    document.querySelector("#setting_id").textContent = "Setting"
    document.querySelector("#settingimg").src = "./img/setting1.svg"
    document.querySelector("#setting_main_id").style.display = "block"
}
async function switch_toggle() {
    let btn_qr = document.querySelector("#qr_btn")
    // console.log("ok", document.querySelector("#home_slide_top").style.height)
    let slide = document.querySelector("#home_slide_top")

    // console.log("check",slide.style.height)
    if (slide.style.height == '') {
        document.querySelector("#home_slide_top").style.height = "30vh";
    }
    if (slide.style.height == '30vh') {
        document.querySelector("#home_slide_top").style.height = "70vh";
        document.querySelector("#optionqr").classList.remove("d-none");
    } else if (slide.style.height == '70vh') {
        document.querySelector("#home_slide_top").style.height = "30vh";
        document.querySelector("#optionqr").classList.add("d-none");
    }

}
function history_page() {
    const removeClass = () => {
        document.querySelector('#history_page_id').classList.remove("d-none");
        document.querySelector('#history_page2_id').classList.remove("d-none");
    }
    const open_history = () => {
        document.querySelector('body').style.background = "#F5F5F5"
        document.querySelector('#home_bg_doge').classList.add("d-none");
        document.querySelector('#home_slide_top').classList.add("d-none");
    }
    document.getElementById("senddoge_page").style.display = "none";
    document.querySelector("#row_top_id").classList.add("bg-body")
    removeClass()
    open_history()
    hide_setting()
    listtxid_history()
}
wallet_page()
function wallet_page() {
    const removeClass = () => {
        document.querySelector('#history_page_id').classList.add("d-none");
        document.querySelector('#history_page2_id').classList.add("d-none");
        document.querySelector('#home_bg_doge').classList.remove("d-none");
        document.querySelector('body').style.background = "black"
    }
    const open_wallet = () => {
        document.querySelector('#home_slide_top').classList.remove("d-none");
    }
    document.querySelector("#row_top_id").classList.remove("bg-body")
    document.getElementById("senddoge_page").style.display = "none";
    removeClass()
    open_wallet()
    hide_setting()
    getPriceDOGE()
}