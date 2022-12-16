import Vimeo from '../../node_modules/@vimeo/player/src/player';

const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on(
  'timeupdate',
  throttle(function (data) {
    // data is an object containing properties specific to that event
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.seconds));
  }, 1000)
);

const trackCurrentTime = localStorage.getItem(STORAGE_KEY);

if (trackCurrentTime) {
  player.setCurrentTime(trackCurrentTime);
}
