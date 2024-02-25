const {fnLineApi} = require("../function/lineApi");

module.exports = {
  async autoMessage(req, res) {
    try {

      // copy Channel access token ตอนที่ตั้งค่ามาใส่
      const accessToken = process.env.LINE_MANON_TOKEN; 

      // input
      const arrayJson = req.body;
      const message = arrayJson.events[0].message.text;
      const replyToken = arrayJson.events[0].replyToken;

      //set data
      let arrayPostData = {};

      // ตัวอย่าง Message Type "Text"
      if (message === "คำนวณวันครบรอบ") {

        // เรียกฟังก์ชั่นคำนวณวันครบรอบ
        const calDate = fnLineApi.calulateDateFormStart(req);

        arrayPostData = {
          "replyToken": replyToken,
          "messages": [
            {
              "type": "text",
              "text": calDate
            }
          ]
        }
      } else {

        // เรียกฟังก์ชั่น ai
        const text = await fnLineApi.GenerativeAIChat(message);

        arrayPostData = {
          "replyToken": replyToken,
          "messages": [
            {
              "type": "text",
              "text": text
            },
          ]
        }
      }

      // replyMessage
      fnLineApi.autoMessage.replyMessage(accessToken, arrayPostData);

    } catch (err) {
      console.error(err);
      return err;
    }
  },
  async calulateDateFormStart(req, res) {
    try {

      const calDate = fnLineApi.calulateDateFormStart(req);

      return calDate;

    } catch (err) {
      return err;
    }
  },
};
