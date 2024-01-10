const ngrok = require('ngrok');

(async function () {
    try {
        const url = await ngrok.connect({
            addr: 3000,
        });
        console.log('Ngrok Tunnel:', url);
    } catch (err) {
        console.error('Error setting up Ngrok tunnel:', err);
        process.exit(1);
    }
})();
