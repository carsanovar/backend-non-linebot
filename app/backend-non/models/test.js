module.exports = {
    async test(req, res) {
      try {
        return "success";
      } catch (err) {
        return err;
      }
    },
};