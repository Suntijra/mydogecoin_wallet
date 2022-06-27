
getPriceDOGE()
function getPriceDOGE() {
    var thb;
    var substr
    axios.get('https://api.apilayer.com/exchangerates_data/latest?symbols=THB&base=USD&apikey=pIpHtBZNr3pYY6yGydrqY1glOSBcbL6M')
        .then(function (response) {
            data = response.data.rates.THB
            // console.log(data)
            thb = data
            axios.get('https://www.binance.com/api/v3/ticker/price?symbol=DOGEUSDT').then(res => {
                result = thb * res.data.price + ''
                substr = substrfn(result)
                document.getElementById('dogePrice').innerHTML = substr + ' ฿';

            })
        }).catch(err => {
            console.log(err)
        })

    setInterval(() => {
        axios.get('https://www.binance.com/api/v3/ticker/price?symbol=DOGEUSDT').then(resp => {
            // console.log(resp.data.price)
            result = thb * resp.data.price + ''
            substr = substrfn(result)
            console.log(substr)
            document.getElementById('dogePrice').innerHTML = substr + ' ฿';
        });

    }, 60000)
}
// document.getElementById('doge_balance').innerHTML = substrfn('')
console.log('test function => ',substrfn('1000.187800'))

function substrfn(str1) {
    var index = "";
    for (i = 0; i < str1.length; i++) {
        index += str1[i]
        if (str1[i] == '.') {
            k = i+4
            for (j = i+1; j < k ;j++) {
                if(typeof(str1[j]) != 'undefined' ){
                    index += str1[j]
                }
                else{
                    index += '0'
                }
            }
            break;
        }

    }
    let substr = index
    return substr
}

var change = false
function hideHide(){
    document.getElementById('get_start_text').classList.add('animetionHide')
    document.getElementById('get_start_text').style.animationName = 'hideme'
}
function removeClass_show(){
    document.getElementById('get_start_text').classList.remove('animetionHide')
    document.getElementById('get_start_text').style.animationName = '0'
}
function slide_down() {
    if (!change) {
        change = !change
        $("#back_color").addClass('slide_background_active')
        // $('#lotatelol').addClass('lotate_b_foot_active')
        $('#lotatelol').css('transform', 'rotate(180deg)')     
        hideHide()
        setTimeout(() => {
            document.getElementById('get_start_text').style.display = 'none'
            document.getElementById('slide_page').style.display = 'block'
        }, 500)
    }
    else {
        change = !change
        $("#back_color").removeClass('slide_background_active')
        // $('lotatelol').removeClass('lotate_b_foot_activate')
        $('#lotatelol').css('transform', 'rotate(0deg)')
        removeClass_show()
        document.getElementById('get_start_text').style.display = 'block'
        document.getElementById('slide_page').style.display = 'none'
    }

}
DogeGetBalance()
function DogeGetBalance(address = 'https://chain.so/api/v2/get_address_balance/DOGETEST/2My1rbK7kgFahUYAqA61yCUMqojGgHRU9Le') {
    axios.get(address)
        .then((response, request) => {
            // response.data.confirmed_balance
            data = response.data.data.confirmed_balance
            console.log(data)
            data = substrfn(data)

            // get DogeGetBalance by id
            document.getElementById('doge_balance').innerHTML = data + ' DOGE';
        }).catch(err => {
            console.log(err)
        })
}


$(function () {
    $('#foot').load('./footer.html')
})

