    function bg_closeJs() {
        document.getElementById('bg_close').style.height = '0';
        document.getElementById('account_slide').style.height = '0';
    }
    function footerNav(x) {
        if (x.id == "history") {
            window.location.href = "./transaction.html";
        } else if (x.id == "wallet") {
            window.location.href = "./home.html";
        } else {
            document.getElementById('bg_close').style.height = '100vh';
            document.getElementById('account_slide').style.height = '50vh';
        }
    }
