const player = document.querySelector('.player'),
    playBtn = document.querySelector('.play'),
    prevBtn = document.querySelector('.prev'),
    nextBtn = document.querySelector('.next'),
    audio = document.querySelector('.audio'),
    title = document.querySelector('.song'),
    progressContainer = document.querySelector('.progress__container'),
    progress = document.querySelector('.progress'),
    imgSrc = document.querySelector('.img__src')

//Название треков
const songs = ['Battle City', 'Bomberman', 'Chip and Dale Rescue Rangers 2', 'Contra', 'Jurasic Park', 'Lunar Ball', 'Mario', 'Mortal Kombat', 'Prince of Persia', 'Robocop 3', 'Tetris', 'Welcome Menu Screen 9999 in 1']

//Трек по умолчанию
let songIndex = 0

//Init
function loadSong(song) {
    title.innerHTML = song
    audio.src = `https://golovina-wp.github.io/retro-tales/music/${song}.mp3`
}
loadSong(songs[songIndex])

//Play
function playSong() {
    player.classList.add('play')
    imgSrc.src = 'https://golovina-wp.github.io/retro-tales/icons/pause.png'
    audio.play()
}

//Pause
function pauseSong() {
    player.classList.remove('play')
    imgSrc.src = 'https://golovina-wp.github.io/retro-tales/icons/play.png'
    audio.pause()
}

playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play')
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

//Next song
function nextSong() {
    songIndex++

    if (songIndex > songs.length -1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}
nextBtn.addEventListener('click', nextSong)

//Prev song
function prevSong() {
    songIndex--

    if(songIndex < 0) {
        songIndex = songs.length -1
    }

    loadSong(songs[songIndex])
    playSong()
}
prevBtn.addEventListener('click', prevSong)

//Progress bar
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}
audio.addEventListener('timeupdate', updateProgress)

//Set progress
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration

}
progressContainer.addEventListener('click', setProgress)

//Autoplay
audio.addEventListener('ended', nextSong)