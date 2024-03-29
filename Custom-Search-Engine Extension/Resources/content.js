
var URLtop = "";
var URLsuffix = "";
var avoidRedirectLoop = "1";

browser.runtime.sendMessage({
    type: "content"
},
function(response) {
    URLtop = response.top;
    URLsuffix = response.suffix;
    URLsuffix = response.suffix;
    avoidRedirectLoop = response.avoidRL;
    console.log(avoidRedirectLoop)
    if (avoidRedirectLoop == "0") {
        if (getParam('q') != null) {
            doRedirect();
            console.log("a")
        }
    }else{
        if ((getParam('q') != null) && (getParam('t') == "osx")) {
            doRedirect();
            console.log("b")
        }
    }
});

function doRedirect() {
    location.href = URLtop + getParam('q') + URLsuffix;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        //if darkmode
        document.getElementsByTagName('html')[0].innerHTML = '<body style="background:#222"></body>';
    }else{
        //if lightmode
        document.getElementsByTagName('html')[0].innerHTML = '<body style="background:#cacacf"></body>';
    }
    console.log("CSE: URL has been rewritten.")
}

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
