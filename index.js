
// Получаем объекты

// Плеер
const videoContainer = document.querySelector('.video-container')
const videoPlayer = document.getElementById('video-player')
// Время
const progressBar = document.getElementById('video-controls__progress-bar')
const currTime = document.getElementById('video-controls__curr-time')
const durationTime = document.getElementById('video-controls__duration')
// Кнопки
const actionButtons = document.querySelectorAll('.video-controls__action')
const muteButton = document.getElementById('video-controls__mute')
const volumeScale = document.getElementById('video-controls__volume')
const speedSelect = document.getElementById('video-controls__speed')
const fullScreenButton = document.getElementById('video-controls__full-screen')
let isFullScreenVideo = false

function videoAct () { // Запускаем или ставим на паузу
  if (videoPlayer.paused) {
    videoPlayer.play()
    actionButtons.forEach(x => {
      x.classList.add('pause')
      x.classList.remove('play')
    })
  } else {
    videoPlayer.pause()
    actionButtons.forEach(x => {
      x.classList.add('play')
      x.classList.remove('pause')
    })
  }
  if (durationTime.innerHTML === '00:00') {
    durationTime.innerHTML = videoTime(videoPlayer.duration) // Об этой функции чуть ниже
  }
}

// Запуск, пауза
actionButtons.forEach(x => x.addEventListener('click', videoAct))
videoPlayer.addEventListener('click', videoAct)

function videoTime (time) { // Рассчитываем время в секундах и минутах
  time = Math.floor(time)
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time - minutes * 60)
  let minutesVal = minutes
  let secondsVal = seconds
  if (minutes < 10) {
    minutesVal = '0' + minutes
  }
  if (seconds < 10) {
    secondsVal = '0' + seconds
  }
  return minutesVal + ':' + secondsVal
}
function videoProgress () { // Отображаем время воспроизведения
  const progress = (Math.floor(videoPlayer.currentTime) / (Math.floor(videoPlayer.duration) / 100))
  progressBar.value = progress
  currTime.innerHTML = videoTime(videoPlayer.currentTime)
}
function videoChangeTime (e) { // Перематываем
  const mouseX = Math.floor(e.pageX - progressBar.offsetLeft)
  const progress = mouseX / (progressBar.offsetWidth / 100)
  videoPlayer.currentTime = videoPlayer.duration * (progress / 100)
}

// Отображение времени
videoPlayer.addEventListener('timeupdate', videoProgress)
// Перемотка
progressBar.addEventListener('click', videoChangeTime)

function videoChangeVolume () { // Меняем громкость
  const volume = volumeScale.value / 100
  videoPlayer.volume = volume
  if (videoPlayer.volume === 0) {
    muteButton.setAttribute('class', 'video-controls__element video-controls__mute video-controls__mute_true')
  } else {
    muteButton.setAttribute('class', 'video-controls__element video-controls__mute video-controls__mute_false')
  }
}
function videoMute () { // Убираем звук
  if (videoPlayer.volume === 0) {
    videoPlayer.volume = volumeScale.value / 100
    muteButton.setAttribute('class', 'video-controls__element video-controls__mute video-controls__mute_false')
  } else {
    videoPlayer.volume = 0
    muteButton.setAttribute('class', 'video-controls__element video-controls__mute video-controls__mute_true')
  }
}
function videoChangeSpeed () { // Меняем скорость
  const speed = speedSelect.value / 100
  videoPlayer.playbackRate = speed
}
function videoChangeScreen () {
  if (isFullScreenVideo) {
    videoContainer.classList.remove('video-container__full-screen')
    fullScreenButton.classList.remove('small-screen')
  } else {
    videoContainer.classList.add('video-container__full-screen')
    fullScreenButton.classList.add('small-screen')
  }
  isFullScreenVideo = !isFullScreenVideo
}

// Звук
muteButton.addEventListener('click', videoMute)
volumeScale.addEventListener('change', videoChangeVolume)
// Работа со скоростью
speedSelect.addEventListener('change', videoChangeSpeed)
fullScreenButton.addEventListener('click', videoChangeScreen)

// Работа с качеством видео
// const videoQuality = 720;
// const p = new Promise((resolve, reject) => {
//     getVideo;
//     resolve()
// })
// const timer = setTimeout(videoQuality = 360, 1000)
// p.then(() => clearTimeout(timer))
