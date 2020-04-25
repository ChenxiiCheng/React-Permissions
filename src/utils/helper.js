/**
 * 将查询字符串转成参数对象
 * @param {String} str 查询字符串
 * @returns {Object}
 */
export function urlParamsToObject(str) {
  // str: ?str=123&name=90
  if (!str) {
    return null;
  }
  str = str.slice(1);
  let pareArr = str.split('&');
  let result = [];
  pareArr.forEach((item) => {
    let keyValueArr = item.split('=');
    result[keyValueArr[0]] = keyValueArr[1];
  });
  return result;
}

export function formateDateToString(date) {
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
