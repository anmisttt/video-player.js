
window.onload = function () {
  const userVideoPlayers = document.querySelectorAll('.video-player')

  function createCustomVideoPlayer (userVideoPlayer) {
    const parentElement = userVideoPlayer.parentElement
    const sources = userVideoPlayer.querySelectorAll('source')
    const qualityObject = {}
    sources.forEach(x => {
      const splitedString = x.attributes.src.value.split('/')
      const quality = splitedString[splitedString.length - 2]
      if (quality in qualityObject) {
        qualityObject[quality].push(x)
      } else {
        qualityObject[quality] = [x]
      }
    })

    let videoQuality = Object.keys(qualityObject).sort((a, b) => a - b).pop()
    let isFullScreenVideo = false
    const speedConstants = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

    const createSoundTemplate = function () {
      return (
      `    <?xml version="1.0" encoding="iso-8859-1"?>
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 480 480" style="enable-background:new 0 0 480 480;" xml:space="preserve">
      <g>
          <g>
              <path d="M278.944,17.577c-5.568-2.656-12.128-1.952-16.928,1.92L106.368,144.009H32c-17.632,0-32,14.368-32,32v128
                  c0,17.632,14.368,32,32,32h74.368l155.616,124.512c2.912,2.304,6.464,3.488,10.016,3.488c2.368,0,4.736-0.512,6.944-1.568
                  c5.536-2.688,9.056-8.288,9.056-14.432v-416C288,25.865,284.48,20.265,278.944,17.577z M96,304.009H32v-128h64V304.009z
                  M256,414.697l-128-102.4V167.721l128-102.4V414.697z" fill="#fefefe"/>
          </g>
      </g>
      <g>
          <g>
              <path d="M369.024,126.857c-6.304-6.24-16.416-6.144-22.624,0.128c-6.208,6.304-6.144,16.416,0.128,22.624
                  c24.16,23.904,37.472,56,37.472,90.4c0,34.4-13.312,66.496-37.472,90.4c-6.304,6.208-6.368,16.32-0.128,22.624
                  c3.136,3.168,7.264,4.736,11.36,4.736c4.064,0,8.128-1.536,11.264-4.64c30.304-29.92,46.976-70.08,46.976-113.12
                  C416,196.969,399.328,156.809,369.024,126.857z" fill="#fefefe"/>
          </g>
      </g>
      <g>
          <g>
              <path d="M414.144,81.769c-6.272-6.208-16.416-6.176-22.624,0.096c-6.208,6.272-6.176,16.416,0.096,22.624
                  C427.968,140.553,448,188.681,448,240.009s-20.032,99.456-56.384,135.52c-6.272,6.208-6.304,16.352-0.096,22.624
                  c3.136,3.168,7.232,4.736,11.36,4.736c4.064,0,8.128-1.536,11.264-4.64C456.608,356.137,480,299.945,480,240.009
                  C480,180.073,456.608,123.881,414.144,81.769z" fill="#fefefe"/>
          </g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      </svg>`
      )
    }

    const createDownloadTemplate = function () {
      return (
        '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#fefefe"><g id="Solid"><path d="m239.029 384.97a24 24 0 0 0 33.942 0l90.509-90.509a24 24 0 0 0 0-33.941 24 24 0 0 0 -33.941 0l-49.539 49.539v-262.059a24 24 0 0 0 -48 0v262.059l-49.539-49.539a24 24 0 0 0 -33.941 0 24 24 0 0 0 0 33.941z"/><path d="m464 232a24 24 0 0 0 -24 24v184h-368v-184a24 24 0 0 0 -48 0v192a40 40 0 0 0 40 40h384a40 40 0 0 0 40-40v-192a24 24 0 0 0 -24-24z" fill="#fefefe"/></g></svg>'
      )
    }

    const createSourcesTemplate = function () {
      return (
      `${qualityObject[videoQuality].length > 0
        ? qualityObject[videoQuality].map(x =>
        `<source src="${x.attributes.src.value}" type="${x.attributes.type.value}"></source>`
       ).join('')
      : ''}`
      )
    }

    const createVideoPlayerTemplate = function () {
      return (
    `<video id='video-player' poster='${userVideoPlayer.poster}' ${userVideoPlayer.muted ? 'muted' : ''} ${userVideoPlayer.loop ? 'loop' : ''}>
       ${createSourcesTemplate()}
        </video>
    <div class='video-controls__element video-controls__action play main' id='video-controls__action'></div>
      <div class='video-controls'>
        <div class='video-controls__element video-controls__action play' id='video-controls__action'></div>
        <div class='video-controls__element video-controls__curr-time' id='video-controls__curr-time'>00:00</div>
        <progress value='0' max='100' class='video-controls__element video-controls__progress-bar' id='video-controls__progress-bar'></progress>
        <div class='video-controls__element video-controls__duration' id='video-controls__duration'>00:00</div>
        <div class='video-controls__element video-controls__mute video-controls__mute_false' id='video-controls__mute'>
        ${createSoundTemplate()}
        </div>
        <input type='range' value='100' max='100' title='Громкость' class='video-controls__element video-controls__volume' id='video-controls__volume'>
        <select title='Скорость' class='video-controls__element video-controls__speed' id='video-controls__speed'>
        ${speedConstants.map(x =>
          `<option value='${x * 100}' ${x === 1 && 'selected'}>x${(x + '').length === 3 ? x + '0' : (x + '').length === 1 ? x + '.00' : x}</option>`
        )}
        </select>
        <select title='Качество' class='video-controls__element video-controls__quality' id='video-controls__quality'>
        ${Object.keys(qualityObject).map(x =>
          `<option value='${x}' ${x === videoQuality && 'selected'}>${x}p</option>`
          )}
        </select>
        <a class='video-controls__element video-controls__download' title='Скачать' href='video.mp4' download>
        ${createDownloadTemplate()}
        </a>
        <div class="video-controls__element video-controls__full-screen" id="video-controls__full-screen">
        ${new Array(4).fill('<div class="arrow"></div>').join('')}
        </div>
      </div>`
      )
    }

    const videoContainer = document.createElement('div')
    videoContainer.innerHTML = createVideoPlayerTemplate()
    videoContainer.classList.add('video-container')
    if (userVideoPlayer.width > 0) {
      videoContainer.style.width = userVideoPlayer.width + 'px'
    }
    if (userVideoPlayer.height > 0) {
      videoContainer.style.height = userVideoPlayer.height + 'px'
    }
    userVideoPlayer.insertAdjacentElement('beforebegin', videoContainer)
    parentElement.removeChild(userVideoPlayer)

    const videoPlayer = document.getElementsByTagName('video')[0]
    const progressBar = document.getElementById('video-controls__progress-bar')
    const currTime = document.getElementById('video-controls__curr-time')
    const durationTime = document.getElementById('video-controls__duration')
    const actionButtons = document.querySelectorAll('.video-controls__action')
    const muteButton = document.getElementById('video-controls__mute')
    const volumeScale = document.getElementById('video-controls__volume')
    const speedSelect = document.getElementById('video-controls__speed')
    const qualitySelect = document.getElementById('video-controls__quality')
    const fullScreenButton = document.getElementById('video-controls__full-screen')

    function videoAct () {
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
        durationTime.innerHTML = videoTime(videoPlayer.duration)
      }
    }

    actionButtons.forEach(x => x.addEventListener('click', videoAct))
    videoPlayer.addEventListener('click', videoAct)

    function videoTime (time) {
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

    function videoProgress () {
      const progress = (Math.floor(videoPlayer.currentTime) / (Math.floor(videoPlayer.duration) / 100))
      progressBar.value = progress
      currTime.innerHTML = videoTime(videoPlayer.currentTime)
    }
    function videoChangeTime (e) {
      const mouseX = Math.floor(e.pageX - progressBar.offsetLeft)
      const progress = mouseX / (progressBar.offsetWidth / 100)
      videoPlayer.currentTime = videoPlayer.duration * (progress / 100)
    }

    videoPlayer.addEventListener('timeupdate', videoProgress)
    progressBar.addEventListener('click', videoChangeTime)

    function videoChangeVolume () {
      const volume = volumeScale.value / 100
      videoPlayer.volume = volume
      if (videoPlayer.volume === 0) {
        muteButton.setAttribute('class', 'video-controls__element video-controls__mute video-controls__mute_true')
      } else {
        muteButton.setAttribute('class', 'video-controls__element video-controls__mute video-controls__mute_false')
      }
    }

    function videoMute () {
      if (videoPlayer.volume === 0) {
        videoPlayer.volume = volumeScale.value / 100
        muteButton.setAttribute('class', 'video-controls__element video-controls__mute video-controls__mute_false')
      } else {
        videoPlayer.volume = 0
        muteButton.setAttribute('class', 'video-controls__element video-controls__mute video-controls__mute_true')
      }
    }

    function videoChangeSpeed () {
      const speed = speedSelect.value / 100
      videoPlayer.playbackRate = speed
    }

    function videoChangeQuality () {
      videoQuality = qualitySelect.value
      videoPlayer.innerHTML = createSourcesTemplate()
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

    muteButton.addEventListener('click', videoMute)
    volumeScale.addEventListener('change', videoChangeVolume)
    speedSelect.addEventListener('change', videoChangeSpeed)
    qualitySelect.addEventListener('change', videoChangeQuality)
    fullScreenButton.addEventListener('click', videoChangeScreen)
  }

  userVideoPlayers.forEach(player => createCustomVideoPlayer(player))
}
