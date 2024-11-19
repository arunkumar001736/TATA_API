// getIp.js
const os = require('os');

function getLocalIPAddress() {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        const addresses = interfaces[interfaceName];
        for (const address of addresses) {
            if (address.family === 'IPv4' && !address.internal) {
                return address.address;
            }
        }
    }
    return '127.0.0.1';  // Default to localhost if no IP is found
}

//console.log(getLocalIPAddress());
module.exports=getLocalIPAddress();
