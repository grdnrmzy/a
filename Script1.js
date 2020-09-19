// JavaScript source code

    window.onload = function () {
    var canvas = document.getElementById('canvas');
    var video = document.getElementById('video');
    var button = document.getElementById('button');
    var allow = document.getElementById('allow');
    var context = canvas.getContext('2d');
    var videoStreamUrl = false;

    // функция которая будет выполнена при нажатии на кнопку захвата кадра
    var captureMe = function () {
        if (!videoStreamUrl) alert('Проблемы со стримом или не был разрешен доступ')

      context.translate(canvas.width, 0);
      context.scale(-1, 1);
     
      context.drawImage(video, 0, 0, video.width, video.height);
      
      var base64dataUrl = canvas.toDataURL();
        context.setTransform(1, 0, 0, 1, 0, 0); 

      var img = new Image();
      img.src = base64dataUrl;
      window.document.body.appendChild(img);
    }

    button.addEventListener('click', captureMe);

    
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL.createObjectURL = window.URL.createObjectURL || window.URL.webkitCreateObjectURL || window.URL.mozCreateObjectURL || window.URL.msCreateObjectURL;

    // запрашиваем разрешение на доступ к поточному видео камеры
    navigator.getUserMedia({video: true}, function (stream) {
        
        allow.style.display = "none";
      
      videoStreamUrl = window.URL.createObjectURL(stream);
      
      video.src = videoStreamUrl;
    }, function () {
        console.log('Возникли проблемы или пользователь запретил его использовать стрим');
    });
  };
