/**
 * Created by jry on 17-3-1.
 */

/**
 * #define CMD "cmd"
 * #define KEY "key"
 * #define PARAMS "params"
 * #define VALUE "value"
 * #define NULL_STR "null"
 * #define CODE "code"
 */

let idIndex = Math.ceil(Math.random() * 4096);

const randId = () => {
  idIndex++;
  return "unikid_" + idIndex.toString(16);
};

const isWeb = () => {
  let REG = /^http*/gi;
  let url = location.href;
  if (REG.test(url)) {
    return true;
  }
  return false;
}

const Expo = {
  CMD: "cmd",
  KEY: "key",
  PARAMS: "params",
  VALUE: "value",
  NULL_STR: "null",
  CODE: "code",
  LABEL_LEN: 3,
  INPUT_LEN: 12 - 3,
  DEFAULT_URL: "http://192.168.1.168/cgi-bin/UVSSapi.cgi",
  DEFAULT_USER: "root",
  DEFAULT_PASSWD: "admin",
  randId: randId,
  isWeb: isWeb()
};


module.exports = Expo;
//export default Expo;