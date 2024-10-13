document.addEventListener('DOMContentLoaded', () => {
    // const videoContainer = document.querySelector('.video-container');
    // const video = document.getElementById('videoPlayer');
    const controls = document.querySelector('.controls');

    const videoWrapper = document.querySelector('.video-wrapper');
    const videoSelectionScreen = document.getElementById('videoSelectionScreen');
    const videoPlayerScreen = document.getElementById('videoPlayerScreen');
    const backButton = document.getElementById('backButton');
    const videoSource = document.getElementById('videoSource');
    const videoPlayer = document.getElementById('videoPlayer');
    
    // Элементы превью видео
    const videoOption1 = document.getElementById('videoOption1');
    const videoOption2 = document.getElementById('videoOption2');

    // Основные функции управления видео (воспроизведение, пауза и др.)
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseOverlay = document.getElementById('playPauseOverlay');
    const progressBar = document.getElementById('progressBar');
    const volumeBar = document.getElementById('volumeBar');
    const muteBtn = document.getElementById('muteBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');

    let isVideoStarted = false;

    // Проверка, что элементы существуют
    if (videoOption1 && videoOption2) {
        videoOption1.addEventListener('click', () => selectVideo('assets/video/video1.mp4'));
        videoOption2.addEventListener('click', () => selectVideo('assets/video/video2.mp4'));
    } else {
        console.error("none videos!");
    }

    // Кнопка возврата к выбору видео
    backButton.addEventListener('click', () => {
        videoPlayerScreen.style.display = 'none';
        videoSelectionScreen.style.display = 'flex';
        videoPlayer.pause();  // Авто STOP
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    });

    // Функция выбора видео
    function selectVideo(src) {
        videoSource.src = src;
        videoPlayer.load();
        videoSelectionScreen.style.display = 'none';
        videoPlayerScreen.style.display = 'block';
        videoPlayer.play();  // Автоматически начать воспроизведение после выбора видео
        
        playPauseOverlay.classList.remove('visible');  // Автоматически видuM
        isVideoStarted = true;
        showControls();
    }


    videoPlayer.addEventListener('click', togglePlayPause);
    playPauseBtn.addEventListener('click', togglePlayPause);
    playPauseOverlay.addEventListener('click', togglePlayPause);
    progressBar.addEventListener('input', setVideoProgress);
    volumeBar.addEventListener('input', setVolume);
    muteBtn.addEventListener('click', toggleMute);
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    videoPlayer.addEventListener('timeupdate', updateProgressBar);

    function togglePlayPause() {
        if (videoPlayer.paused) {
            videoPlayer.play();
            playPauseBtn.innerHTML = '<img src="assets/icons/pause_icon.svg" alt="" class="icon">';
            playPauseOverlay.classList.remove('visible');
        } else {
            videoPlayer.pause();
            playPauseBtn.textContent = '▶';
            playPauseOverlay.classList.add('visible');
        }
    }

    function setVideoProgress() {
        videoPlayer.currentTime = (progressBar.value / 100) * videoPlayer.duration;
    }

    function updateProgressBar() {
        progressBar.value = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    }

    function setVolume() {
        videoPlayer.volume = volumeBar.value / 100;
        updateVolumeIcon();
    }

    function toggleMute() {
        videoPlayer.muted = !videoPlayer.muted;
        updateVolumeIcon();
    }

    function updateVolumeIcon() {
        if (videoPlayer.muted || videoPlayer.volume === 0) {
            muteBtn.textContent = '🔇';
        } else if (videoPlayer.volume < 0.5) {
            muteBtn.textContent = '🔉';
        } else {
            muteBtn.textContent = '🔊';
        }
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            if (videoPlayerScreen.requestFullscreen) {
                videoPlayerScreen.requestFullscreen();
            } else if (videoPlayerScreen.mozRequestFullScreen) {
                videoPlayerScreen.mozRequestFullScreen();
            } else if (videoPlayerScreen.webkitRequestFullscreen) {
                videoPlayerScreen.webkitRequestFullscreen();
            } else if (videoPlayerScreen.msRequestFullscreen) {
                videoPlayerScreen.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    videoWrapper.addEventListener('mouseenter', showControls);
    videoWrapper.addEventListener('mouseleave', hideControls);

    function showControls() {
        if (isVideoStarted && controls) {
            controls.classList.add('visible');
        }
    }

    function hideControls() {
        if (isVideoStarted && controls) {
            controls.classList.remove('visible');
        }
    }


    // Initialisation ||||=====++
    videoPlayer.volume = 0.4;
    controls.classList.remove('visible');
    // videoPlayer.style.display = 'none';
});
