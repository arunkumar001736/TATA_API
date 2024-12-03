const QRCode = require('qrcode');

const vCard = `
BEGIN:VCARD
VERSION:3.0
FN:John Doe
ORG:Example Corp
TITLE:Software Developer
TEL;WORK;VOICE:+1234567890
TEL;HOME;VOICE:+0987654321
EMAIL:john.doe@example.com
ADR;TYPE=WORK:;;123 Example Street;City;State;12345;Country
URL:https://example.com
END:VCARD`;

QRCode.toFile('contact_qr.png', vCard, function (err) {
    if (err) throw err;
    console.log('QR code saved!');
});
