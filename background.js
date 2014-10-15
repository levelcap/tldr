$('body').prepend("<div id='tldr-text'>" 
  + "<p'></p>" 
  + "<span id='tldr-control'>" 
  + "<a href='#' class='speed'>50</a> <a href='#' class='speed'>100</a> <a href='#' class='speed'>200</a> <a href='#' class='speed'>500</a>"
  + "<button id='tldr-button' style='margin-left: 10px; border: 2px outset buttonface; padding-left: 5px; padding-right: 5px;'>TLDR</button></span></div>");

var speed = 100;
var interval = null;

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

$(document).ready(function () {
   $('#tldr-button').click(function (e){
    var fullText = getSelectionText();
    //replace all unicode spaces with regular spaces
    fullText = fullText.replace(/[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g,' ');
    //replace newline characters with spaces
    fullText = fullText.replace( /\n/g, " " );
    var pageText = fullText.split(" ");
    var c = 0;
    if (null != interval) {
	clearInterval(interval);
    }
    interval = setInterval(function() { 
       $("#tldr-text p").text(pageText[c]); 
       c++; 
       if(c >= pageText.length) clearInterval(interval);
    }, speed);

   });
   
  $("body").on("click", ".speed", function(e) {
	e.preventDefault();
	speed = parseInt($(this).text());
	if (null != interval) {
	  clearInterval(interval);
	}
  });
$('#tldr-text')
    .draggable()
    .resizable();
});
