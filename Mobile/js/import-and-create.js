const { default: axios } = require("axios");
JWTToken = localStorage.getItem('token')
axios.post('http://192.168.1.18:8000/api/post/authen',{
    headers: {
        Authorization: "Bearer " + JWTToken
     }
}).then(function (response) {
    console.log(response)
}).catch(function (error) {
    console.log(error)
})
$(function () {
    $('#nt_import').css('display', 'none');
    $('#nt_create').css('display', 'none');
})

// $('#select_seed1').slick({
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     fade: true,
//     asNavFor: '#tab_select_seed1'
// });
// $('#tab_select_seed1').slick({
//     slidesToShow: 2,
//     slidesToScroll: 1,
//     asNavFor: '#select_seed1',
//     dots: true,
//     // centerMode: true,
//     focusOnSelect: true
// });
function close_all(){
    // func create-wallet
    $('.modal-container').css('{display : none; transition: display 2s}');
    $('#nt_create').css('display', 'none');
    $('.modal-container').css('display', 'none');
    $('#nt_import').css('display', 'none');
    // func import-wallet

    $('#bg_close').css('display', 'none');
}
document.getElementById('btn_create').addEventListener('click', function () {
    document.getElementById('create-wallet').style.display = 'flex';
    $('#bg_close').css({
        'display': 'flex',
    })
});

document.getElementById('btn_import').addEventListener('click', function () {
    document.getElementById('import-wallet').style.display = 'flex';
    $('#bg_close').css({
        'display': 'flex',
    })
});

function modal_close(x) {
    console.log('display: none')
    $(x).css("display", "none")
    //  x.style.display = "none";
}

function next_create() {
    $('.modal-container').css('{display : none; transition: display 2s}');
    $('#nt_create').css('display', 'flex');
    $('#bg_close').css({
        'display': 'flex',
    })
}
function next_import() {
    $('.modal-container').css('display', 'none');
    $('#nt_import').css('display', 'flex');
    $('#bg_close').css({
        'display': 'flex',
    })
}


function chg_line1(id) {
    if (id == 2) {
        $("#linebg1").addClass('line_active');
        $("#1_1").addClass('active1');
        $("#1_2").addClass('active2');
    }
    else if (id == 1) {
        $("#linebg1").removeClass('line_active');
        $("#1_1").removeClass('active1');
        $("#1_2").removeClass('active2');
    }
}

function chg_line2(id) {
    if (id == 2) {
        $("#linebg2").addClass('line_active');
        $("#2_1").addClass('active1');
        $("#2_2").addClass('active2');
    }
    else if (id == 1) {
        $("#linebg2").removeClass('line_active');
        $("#2_1").removeClass('active1');
        $("#2_2").removeClass('active2');
    }
}

function CreateGo() {
    Swal.fire({
        title: 'Are you Sure?!',
        text: 'Do you remember Seed & Private?',
        showCancelButton: true,
        confirmButtonColor: '#DF7861',
        cancleButtonColor: '#94B49F',
        confirmButtontext: 'Yes, I remember already.'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Generate Private!',
                'Your private key generate already.',
                'success'
            )
            $('#nt_create').css('display', 'none');
        }
    })
}