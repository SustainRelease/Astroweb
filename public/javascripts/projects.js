const setDivHeight = function () {
  $("div.project").each(function() {
    $(this).height($("img",this).height());
  });
}

$( document ).ready(() => {
  //Setting up links to change to new port
  $("a.portForward").each(function() {
    $(this).attr("href", window.location.protocol + '//' + window.location.hostname + ':' + $(this).attr("newPort") + $(this).attr("href"));
  });
  setDivHeight();
})

$(window).resize(function () {
  console.log("Resize");
  setDivHeight();
});
