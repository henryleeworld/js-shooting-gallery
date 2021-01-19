var totalTime = 60;
var timeRemaining = totalTime;
var targetSpot = '.target-id-' + getRandomInt(0, 2) + '-' + getRandomInt(0, 2);
var score = $('.score-count').text();
var roundSpeed = 500;
var shotUrl = 'sounds/gunshot.mp3';
var shotSound = [new Audio(shotUrl), new Audio(shotUrl), new Audio(shotUrl), new Audio(shotUrl)];
var shotIndex = 0;


$(document).ready(function() {
    var targetPicture = '<img width="100" height="90" src="images/target.png">';
    var content = '';
    for (var i = 0; i < 3; i++) {
        content += '<div class="row">';
        for (var j = 0; j < 5; j++) {
            content += '<div class="cell cell-id-' + i + '-' + j + '">';
            content += '<div class="target target-id-' + i + '-' + j + '">' + targetPicture + '</div>';
            content += '</div>';
        }
        content += '</div>';
    }
    $('.board').append(content);

    $('.time').text(timeRemaining);
    $('.start').click(function() {
        if (timeRemaining > 0) {
            $('.error').fadeOut('fast', function() {});
            var timerId = setInterval(function() {
                if ($('.target').hasClass('hit') === true) {
                    $(this).css('margin-top', '0px');
                    $(this).removeClass('hit');
                }
                timeRemaining--;
                $('.time').text(timeRemaining);
                if ($('.time').text() <= 0) {
                    clearTimeout(timerId);
                }
                while ($(targetSpot).css('margin-top') == '0px') {
                    targetSpot = '.target-id-' + getRandomInt(0, 4) + '-' + getRandomInt(0, 4);
                }
                if ($(targetSpot).css('margin-top') == '101px') {
                    $(targetSpot).animate({
                        'margin-top': '-=101px'
                    });
                }

                targetSpot = '.target-id-' + getRandomInt(0, 4) + '-' + getRandomInt(0, 4);
                $('.target').click(function() {
                    $(this).css('margin-top', '101px');
                    shotSound[shotIndex].pause();
                    shotSound[shotIndex].currentTime = 0;
                    var playPromise = shotSound[shotIndex].play();
                    if (playPromise !== undefined) {
                        playPromise.then(_ => {
                                shotSound[shotIndex].pause();
                            })
                            .catch(error => {});
                    }
                    shotIndex++;
                    shotIndex %= shotSound.length;
                    $(this).addClass('hit');
                    score++;
                    $('.score-count').text(score);
                });
            }, roundSpeed);
        } else {
            $('.error').fadeIn('slow', function() {});
        };

        $('.stop').click(function() {
            clearTimeout(timerId);
        });

        $('.reset').click(function() {
            $('.error').fadeOut('fast', function() {});
            $('.score-count').text('0');
            score = 0;
            timeRemaining = totalTime;
            $('.time').text(timeRemaining);
            $('.target').css('margin-top', '101px');
        });

    });
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}