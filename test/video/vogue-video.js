var html5Video = function () {
  
  var video,
    container;
  
  function _exitFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
  
  function _fullScreen() {
    var vid = video;
    if (vid.requestFullscreen) {
      vid.requestFullscreen();
    } else if (vid.msRequestFullscreen) {
      vid.msRequestFullscreen();
    } else if (vid.mozRequestFullScreen) {
      vid.mozRequestFullScreen();
    } else if (vid.webkitRequestFullscreen) {
      vid.webkitRequestFullscreen();
    }
  }
  
  function _endVideo() {
    var vid = video;
    $(container).hide();
    video.load();
    _exitFullScreen();
  }
  function _pauseVideo() {
    var vid = video;
    if (!vid.webkitDisplayingFullscreen)
    _endVideo();
  }
  
  
  function _fullScreen() {
    var vid = video;
    if (vid.requestFullscreen) {
      vid.requestFullscreen();
    } else if (vid.msRequestFullscreen) {
      vid.msRequestFullscreen();
    } else if (vid.mozRequestFullScreen) {
      vid.mozRequestFullScreen();
    } else if (vid.webkitRequestFullscreen) {
      vid.webkitRequestFullscreen();
    }
  }
  
  function init(videoId) {
    
    video = document.getElementById(videoId);
    container = document.getElementById('container-' + videoId);
    var closeBtn = document.getElementById('close-'+videoId);
    
    video.addEventListener('ended', _endVideo, false);
    video.addEventListener('pause', _pauseVideo, false);
    closeBtn.addEventListener('click', _endVideo, false);
    
    $(container).show();
    video.play();
    _fullScreen();
    
    
    
  }
  return {
    init: init
  };
}();



$('.lnk-video').click(function (evt) {
  evt.preventDefault();
  var videoId = this.getAttribute('data-video');
  var vid = html5Video.init(videoId);
});
