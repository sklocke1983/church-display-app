
import QRCode from 'qrcode';

const url = window.location.origin + '/controller.html';
const qrCanvas = document.getElementById('qr-canvas');

QRCode.toCanvas(qrCanvas, url, function (error) {
    if (error) console.error(error);
    console.log('QR Code generated!');
});
