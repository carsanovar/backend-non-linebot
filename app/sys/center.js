// declear
const https = require("https");

// function
const fnCenter = {
    callAPI(apiOtion) {
        return new Promise((resolve, reject) => {
            const options = {
                method: apiOtion.method,
                headers: apiOtion.headers
            };

            // ตรวจสอบว่ามีข้อมูลส่งไปกับคำขอหรือไม่
            if (apiOtion.data) {
                options.headers['Content-Length'] = Buffer.byteLength(apiOtion.data);
            }
    
            const req = https.request(apiOtion.url, options, (res) => {
                let responseData = '';
    
                // เก็บข้อมูลที่ได้รับจากเซิร์ฟเวอร์
                res.on('data', (chunk) => {
                    responseData += chunk;
                });
    
                // เมื่อเซิร์ฟเวอร์ส่งข้อมูลเสร็จสิ้น
                res.on('end', () => {
                    resolve(responseData);
                });
            });
    
            // ตรวจสอบข้อผิดพลาดในการเชื่อมต่อ
            req.on('error', (error) => {
                reject(error);
            });
    
            // ส่งข้อมูลถ้ามี
            if (apiOtion.data) {
                req.write(apiOtion.data);
            }
    
            req.end();
        });
    },
};

module.exports = {fnCenter};