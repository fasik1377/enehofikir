(function () {
  "use strict";

  var videoUrl = "https://www.youtube.com/watch?v=KNlQ7d5u5-I";
  var fourMinutes = 4 * 60 * 1000;
  var status = document.getElementById("videoLimitStatus");

  document.querySelectorAll(".limited-youtube-link").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      var videoWindow = window.open("about:blank", "enehoFikirActivityVideo");
      if (!videoWindow) {
        if (status) {
          status.textContent = "Please allow pop-ups for this site to open the four-minute video.";
        }
        return;
      }

      try { videoWindow.opener = null; } catch (error) { /* Browser-managed security. */ }
      videoWindow.location.replace(videoUrl);

      if (status) {
        status.textContent = "The video opened on YouTube. Its viewing window will close after four minutes.";
      }

      window.setTimeout(function () {
        if (!videoWindow.closed) videoWindow.close();
        if (status) status.textContent = "The four-minute video viewing window has ended.";
      }, fourMinutes);
    });
  });
})();
