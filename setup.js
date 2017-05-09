(function() {

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

  const isWeb = () => {
    var REG = /^http*/gi;
    var url = location.href;
    if (REG.test(url)) {
      return true;
    }
    return false;
  }

  function run(config) {
    if (typeof config.js === "undefined" || typeof config.css === "undefined") {
      return;
    }
    addCss(config.css);
    addJs(config.js);
  }

  (function setup() {
    var url = './config';
    if (isWeb()) {
      url = 'https://raw.githubusercontent.com/JerrieYuan/uvss_api_test_tool/gh-pages/config';
    }
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
})();