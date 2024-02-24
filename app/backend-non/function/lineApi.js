const {fnCenter} = require("../../sys/center");

// function
const fnLineApi = {
    autoMessage: {
        replyMessage(accessToken, arrayPostData) {
            return new Promise((resolve, reject) => {

                const data = JSON.stringify(arrayPostData);

                // ประกาศ option api
                const apiOtion = {
                    "url": "https://api.line.me/v2/bot/message/reply",
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                    "data": data,
                }

                // เรียกใช้ api
                fnCenter.callAPI(apiOtion)
                .then((response) => {
                    console.log('Response:', response);
                    // ประมวลผลข้อมูลตามที่ต้องการ
                    resolve;
                })
                .catch((error) => {
                    console.error('Error:', error);
                    // จัดการข้อผิดพลาดตามที่ต้องการ
                    reject;
                });

            });
        },
    },
    calulateDateFormStart(req) {

        const strDate = req.params.date ? req.params.date : "2023-03-23";

        // แปลงวันที่ในรูปแบบสตริงเป็นวัตถุ Date
        const inputDate = new Date(strDate);
  
        // หาวันที่ปัจจุบัน
        const currentDate = new Date();
  
        // หาความแตกต่างของปี
        let yearsDiff = currentDate.getFullYear() - inputDate.getFullYear();
  
        // หาความแตกต่างของเดือน
        const calMonthsDiff = currentDate.getMonth() - inputDate.getMonth();
        let monthsDiff = calMonthsDiff;
        if (calMonthsDiff < 0) {
          monthsDiff += 12;
        }

        // หาความแตกต่างของวัน
        const calDaysDiff = currentDate.getDate() - inputDate.getDate();
        let daysDiff = calDaysDiff;
        if (calDaysDiff < 0) {
          // หากวันเกินในเดือนนั้น ให้ลบออกแล้วใช้ค่าเดือนก่อนหน้า
          const tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, inputDate.getDate());
          daysDiff = Math.floor((currentDate - tempDate) / (1000 * 60 * 60 * 24));
        }
  
        // ถ้าเดือนและวันที่ยังไม่ถึงกำหนดให้ลบไป 1 ปี
        if (calMonthsDiff === 0) {
          if (calDaysDiff < 0) {
            yearsDiff = yearsDiff < 0 ? 0 : yearsDiff - 1;
          }
        } else if (calMonthsDiff < 0) {
          yearsDiff = yearsDiff < 0 ? 0 : yearsDiff - 1;
        }
  
        return `${yearsDiff} ปี ${monthsDiff} เดือน ${daysDiff} วัน`;
    },
};

  module.exports = {fnLineApi};