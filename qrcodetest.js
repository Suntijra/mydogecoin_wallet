// To use Html5QrcodeScanner (more info below)
import {Html5QrcodeScanner} from "html5-qrcode"

let html5QrcodeScanner = new Html5QrcodeScanner("reader",{ fps: 10, qrbox: {width: 250, height: 250} },/* verbose= */ false);
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);

        
        const html5QrCode = new Html5Qrcode("reader");
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {

            /* handle success */
            console.log(`Code matched = ${decodedText}`, decodedResult);
            $("#address_tx").val(decodedText)

            // Stop Scanning
            html5QrCode.stop().then((ignore) => {
                // QR Code scanning is stopped.
                $('#ScanModal').css("display", "none");
                $("#navBottom").css('z-index','5')
                console.log("======== Stop ====>",ignore)
            }).catch((err) => {
                // Stop failed, handle it.
            });

        };
        // X symbol = (close)
        document.getElementsByClassName("close")[0].onclick = function () {
            $('#ScanModal').css("display", "none");
            $("#navBottom").css('z-index','5')
            console.log("close")
            html5QrCode.stop()
        }
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };
        // If you want to prefer back camera
        html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);