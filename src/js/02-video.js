import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);


const onPlay = function () {
};
player.on('progress', onPlay);




