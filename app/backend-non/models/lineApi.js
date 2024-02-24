module.exports = {
  async autoMessage(req, res) {
    try {

      return `ok`;

    } catch (err) {
      return err;
    }
  },
    async calulateDateFormStart(req, res) {
      try {

        const strDate = req.params.date;

        const currentDate = new Date();
        const inputDate = new Date(strDate);

        const diffTime = Math.abs(currentDate - inputDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);
        const days = (diffDays % 365) % 30;

        return `${years} ปี ${months} เดือน ${days} วัน`;

      } catch (err) {
        return err;
      }
    },
};