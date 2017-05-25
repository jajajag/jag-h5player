/* Get the jQuery object from the dom tree. */
var video = $('#myVideo');

/* .play() and .pause() method. */
$('.btnPlay').on('click', function() {
    if(video[0].paused) {
        video[0].play();
    }
    else {
        video[0].pause();
    }
    return false;
});

/* Get duration from loadedmettadata. */
video.on('loadedmetadata', function() {
    $('.duration').text(video[0].duration);
});

/* Get currentTime from timeupdate. */
video.on('timeupdate', function() {
    var currentPos = video[0].currentTime; //Get currenttime
    var maxduration = video[0].duration; //Get video duration
    var percentage = 100 * currentPos / maxduration; //in %
    $('.timeBar').css('width', percentage+'%');
});

var timeDrag = false;   /* Drag status */
$('.progressBar').mousedown(function(e) {
    timeDrag = true;
    updatebar(e.pageX);
});
$(document).mouseup(function(e) {
    if(timeDrag) {
        timeDrag = false;
        updatebar(e.pageX);
    }
});
$(document).mousemove(function(e) {
    if(timeDrag) {
        updatebar(e.pageX);
    }
});

//update Progress Bar control
var updatebar = function(x) {
    var progress = $('.progressBar');
    var maxduration = video[0].duration; //Video duraiton
    var position = x - progress.offset().left; //Click pos
    var percentage = 100 * position / progress.width();

    //Check within range
    if(percentage > 100) {
        percentage = 100;
    }
    if(percentage < 0) {
        percentage = 0;
    }

    //Update progress bar and video currenttime
    $('.timeBar').css('width', percentage+'%');
    video[0].currentTime = maxduration * percentage / 100;
};

//loop to get HTML5 video buffered data
var startBuffer = function() {
    var maxduration = video[0].duration;
    var currentBuffer = video[0].buffered.end(0);
    var percentage = 100 * currentBuffer / maxduration;
    $('.bufferBar').css('width', percentage+'%');

    if(currentBuffer < maxduration) {
        setTimeout(startBuffer, 500);
    }
};
setTimeout(startBuffer, 500);

//Mute/Unmute control clicked
$('.muted').click(function() {
    video[0].muted = !video[0].muted;
    return false;
});

//Volume control clicked
$('.volumeBar').on('mousedown', function(e) {
    var position = e.pageX - volume.offset().left;
    var percentage = 100 * position / volume.width();
    $('.volumeBar').css('width', percentage+'%');
    video[0].volume = percentage / 100;
});

//Fast forward control
$('.ff').on('click', function() {
    video[0].pause();
    video[0].playbackRate = 2;
    video[0].play();
    return false;
});

//Rewind control
$('.rw').on('click', function() {
    video[0].playbackrate = -3;
    return false;
});

//Slow motion control
$('.sl').on('click', function() {
    video[0].playbackrate = 0.5;
    return false;
});