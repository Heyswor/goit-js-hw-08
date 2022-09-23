import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function onPlay(seconds) {
  player.getCurrentTime(seconds);
  currentTime = seconds.seconds;
  localStorage.setItem('videoplayer-current-time', currentTime);
}
const storageData = localStorage.getItem('videoplayer-current-time');
player.on('timeupdate', throttle(onPlay, 1000));

function currentTime() {
  if (!storageData) {
    return player.setCurrentTime(0);
  }
  return player.setCurrentTime(storageData);
}
currentTime();