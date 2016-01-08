$(document).ready(function () {

    $(".activity").hide();
    $(".resume").hide();
    $(".pause").hide();
    $(".stop").hide();

    var workTime = 0;
    var breakTime = 0;

    var wav = "http://www.oringz.com/oringz-uploads/sounds-812-droplet.mp3";

    // Show Time
    function showTime(time) {
        var min = Math.floor(time / 60);
        var sec = Math.round(time % 60);
        if (sec < 10) {
            sec = '0' + sec;
        }
        if (min < 10) {
            min = '0' + min;
        }
        $('.minutes').text(min);
        $('.seconds').text(sec);
    }

    // Start Timer
    function startTimer() {
        $(".activity").html("Stay Focused!");
        return setInterval(function () {
            workTime--;
            top = workTime
            $(".fill").css("top", top);
            if (workTime > 0 && workTime < 4) {
                var audio = new Audio(wav);
                audio.play();
            }
            if (workTime < 0) {
                clearInterval(timer);
                timer = breakTimer();
            } else {
                $("body").css("background-color", "#7CBF00");
                showTime(workTime);
            }
        }, 1000);
    }

    // Break Plus
    $("#br-plus").on("click", function () {
        var $this = $(".breaks");
        var num = parseInt($.trim($this.html()));
        $this.html(++num);
    });

    // Break Minus
    $("#br-minus").on("click", function () {
        $this = $(".breaks");
        var num = parseInt($.trim($this.html()));
        if (num > 1) {
            $this.html(--num);
        }
    });

    // Session Plus
    $("#ss-plus").on("click", function () {
        var $this = $(".sessions");
        var num = parseInt($.trim($this.html()));
        $this.html(++num);
        if (num < 10) {
            num = "0" + num;
        }
        $(".minutes").text(num);
    });

    // Session Minus
    $("#ss-minus").on("click", function () {
        $this = $(".sessions");
        var num = parseInt($.trim($this.html()));
        if (num > 1) {
            $this.html(--num);
            if (num < 10) {
                num = "0" + num;
            }
            $(".minutes").text(num);
        }
    });

    // Session Play
    $(".play").on("click", function () {
        $(".play").hide();
        $(".activity").fadeIn();
        $(".pause").fadeIn();
        $(".stop").fadeIn();
        $(".settings i").fadeOut();
        startSession();
    });

    // Session Pause
    $(".pause").on("click", function () {
        $(".resume").fadeIn();
        $(".pause").hide();
        $(".stop").hide();
        pauseSession();
    });

    // Session Resume
    $(".resume").on("click", function () {
        $(".resume").hide();
        $(".pause").show();
        $(".stop").show();
        resumeSession();
    });

    // Session Stop
    $(".stop").on("click", function () {
        $("body").css("background-color", "#FF9800");
        $(".play").fadeIn();
        $(".activity").fadeOut();
        $(".pause").hide();
        $(".stop").hide();
        stopSession();
    });

    function startSession() {
        workTime = $(".sessions").html() * 60;
        breakTime = $(".breaks").html() * 60;
        timer = startTimer();
    }

    function pauseSession() {
        $(".activity").html("Pause!");
        $("body").css("background-color", "#039bfa");
        clearInterval(timer);
    }

    function resumeSession() {
        timer = startTimer();
    }

    function stopSession() {
        $(".settings i").fadeIn();
        workTime = 0;
        breakTime = 0;
        clearInterval(timer);
        var sessions = $(".sessions").html();
        if (sessions < 10) {
            sessions = "0" + sessions;
        }
        $(".minutes").html(sessions);
        $(".seconds").html("00");
    }

    // Break Timer
    function breakTimer() {
        $("body").css("background-color", "#850400");
        $(".activity").html("Rest...");
        return setInterval(function () {
            breakTime--;
            if (breakTime < 0) {
                clearInterval(timer);
                startSession()
            } else {
                showTime(breakTime);
            }
        }, 1000);
    }

}); // End Document Ready
