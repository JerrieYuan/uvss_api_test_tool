function appendNode(child) {
  var parent = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0];
  console.log(parent);
  parent.appendChild(child);
}

function addJs(js) {
  var script = document.createElement("script");
  script.src = js;
  script.type = "text/javascript";
  appendNode(script);
}

function addCss(css) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = css;
  appendNode(link);
}


function run(config) {
  if (typeof config.js === "undefined" || typeof config.css === "undefined") {
    return;
  }
  addCss(config.css);
  addJs(config.js);
}

(function setup() {
  var timeNow = new Date().getTime();
  var timeStr = timeNow.toString(36);
  var randNum = Math.ceil(Math.random() * 4096).toString(36);
  var randId = `${timeStr}${randNum}`;
  var url = `./config?refresh=${randId}`;
  var request = new XMLHttpRequest();

  request.onloadend = function() {
    var responseData = this.responseText.split('||', -1);
    if (responseData.length < 2) {
      return;
    }
    var config = {
      js: responseData[0],
      css: responseData[1]
    };
    run(config);
  }.bind(request);
  request.open("GET", url, true);
  request.send();
})();