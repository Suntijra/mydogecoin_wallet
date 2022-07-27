var qrcode = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
console.log("hello",canvasElement)
const canvas = canvasElement.getContext("2d");

const outputData = document.getElementsByClassName("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");

let scanning = false;

qrcode.callback = (res) => {
    if (res) {
        outputData.innerText = res;
        scanning = false;
    
        video.srcObject.getTracks().forEach(track => {
            track.stop();
        });

        btnScanQR.hidden = false;
        canvasElement.hidden = true;
    }
};

  btnScanQR.onclick = () => {
  $('body').addClass('activate');
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
        scanning = true;
        console.log("Start BtnScanQr =>",btnScanQR)
        $(".modalScan").css('display','flex')
        document.getElementById("btn-scan-qr").hidden = false;
        canvasElement.hidden = false;
        video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
        video.srcObject = stream;
        video.play();
        tick();
        scan();
    });
};

var i = 0;
function tick() {
    i++
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
  
    scanning && requestAnimationFrame(tick);
    if(i == 15){
        console.log("Video Height :",video.videoHeight)
        console.log("Video Width :",video.videoWidth)
    }
}

function scan() {
    try {
        qrcode.decode();
    } catch (e) {
        setTimeout(scan, 300);
    }
}