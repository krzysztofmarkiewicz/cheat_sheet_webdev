function includeHTML() {
  var z, i, elmnt, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    file = elmnt.getAttribute("include-html");
    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
}

jQuery("#search_submit").on("click", function () {
  //var search_str = jQuery("#search_text").val();console.log(search_str);
  findString('');
  return false;
});

var TRange = null;

function findString(str) {
  str = document.getElementById('search_text').value; //jQuery("#search_text").val();
  if (parseInt(navigator.appVersion) < 4) return;
  var strFound;
  if (window.find) {

    // CODE FOR BROWSERS THAT SUPPORT window.find

    var original_content = window;
    strFound = original_content.find(str);
    if (!strFound) {
      strFound = original_content.find(str, 0, 1);
      while (original_content.find(str, 0, 1)) continue;
    }
  } else if (navigator.appName.indexOf("Microsoft") != -1) {

    // EXPLORER-SPECIFIC CODE

    if (TRange != null) {
      TRange.collapse(false);
      strFound = TRange.findText(str);
      if (strFound) TRange.select();
    }
    if (TRange == null || strFound == 0) {
      TRange = self.document.body.createTextRange();
      strFound = TRange.findText(str);
      if (strFound) TRange.select();
    }
  } else if (navigator.appName == "Opera") {
    alert("Opera browsers not supported, sorry...")
    return;
  }
  if (!strFound) alert("String '" + str + "' not found!")
  return;
}