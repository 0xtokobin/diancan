module.exports = {
  //用于查询对应表的信息
  getDate: function (format) {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = month >= 10 ? month : "0" + month;
    var day = date.getDate();
    day = day >= 10 ? day : "0" + day;
    var hour = date.getHours();
    hour = hour >= 10 ? hour : "0" + hour;
    var min = date.getMinutes();
    min = min >= 10 ? min : "0" + min;
    var sec = date.getSeconds();
    sec = sec >= 10 ? sec : "0" + sec;
    if (format === 1) {
      return "" + year + month + day + hour + min + sec;
    } else if (format === 2) {
      return (
        year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec
      );
    }
  },
};
