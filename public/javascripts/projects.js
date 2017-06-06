$(window).load(function () {
  //Setting up links to change to new port
  console.log("pageLoaded");
  let protoHost = window.location.protocol + '//' + window.location.hostname + ':';
  $("a.portForward").each(function() {
    $(this).attr("href",protoHost + $(this).attr("newPort") + $(this).attr("href"));
  });
});
