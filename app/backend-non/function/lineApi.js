const {fnCenter} = require("../../sys/center");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// function
const fnLineApi = {
  autoMessage: {
    replyMessage(accessToken, arrayPostData) {
      return new Promise((resolve, reject) => {
        const data = JSON.stringify(arrayPostData);

        // ประกาศ option api
        const apiOtion = {
          url: `${process.env.LINE_API_URL}/v2/bot/message/reply`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
          data: data,
        };

        // เรียกใช้ api
        fnCenter
          .callAPI(apiOtion)
          .then((response) => {
            console.log("Response:", response);
            // ประมวลผลข้อมูลตามที่ต้องการ
            resolve(response);
          })
          .catch((error) => {
            console.error("Error:", error);
            // จัดการข้อผิดพลาดตามที่ต้องการ
            reject(error);
          });

      });
    },
  },
  calulateDateFormStart(req) {
    const strDate = req.params.date ? req.params.date : "2017-03-23";

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
      const tempDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        inputDate.getDate()
      );
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
  async GenerativeAIChat(inputText) {
    return new Promise((resolve, reject) => {
      (async () => {
        // Access your API key as an environment variable (see "Set up your API key" above)
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = inputText;

        try {
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = await response.text();
          resolve(text);
        } catch (error) {
          const err = error.response.candidates[0].safetyRatings[0].category ? error.response.candidates[0].safetyRatings[0].category : "error prompt";
          resolve(err);
        }
      })();
    });
  },
};

  module.exports = {fnLineApi};