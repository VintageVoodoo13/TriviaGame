var panel = $('#quiz-area');
var countStartNumber = 30;


///////////////////////////////////////////////////////////////////////////////

//CLICK EVENTS

///////////////////////////////////////////////////////////////////////////////

$(document).on('click', '#start-over', function(e) {
    game.reset();
});

$(document).on('click', '.answer-button', function(e) {
    game.clicked(e);
});

$(document).on('click', '#start', function(e) {
    $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
    game.loadQuestion();
});

///////////////////////////////////////////////////////////////////////////////


//Question set


///////////////////////////////////////////////////////////////////////////////

var questions = [{
    question: "Who was the lead singer of Motorhead?",
    answers: ["Kurt Cobain", "Peter Steele", "Lemmy Kilmister", "Tobias Forge"],
    correctAnswer: "Lemmy Kilmister",
    image: "images/lemmy-kilmister.jpg"
}, {
    question: "Which of these bands come from Sweden?",
    answers: ["Ghost", "Blind Melon", "The Scorpions", "Iron Maiden"],
    correctAnswer: "Ghost",
    image: "images/ghost.jpg"
}, {
    question: "Of Pink Floyd's four most popular albums, which one came out first?",
    answers: ["Animals", "Dark Side of the Moon", "The wall", "Wish You Were Here"],
    correctAnswer: "Dark Side of the Moon",
    image: "images/pink.jpg"
}, {
    question: 'Which group released the hit song, "Smells Like Teen Spirit"?',
    answers: ["Nirvana", "Backstreet Boys", "The Offspring", "No Doubt"],
    correctAnswer: "Nirvana",
    image: "images/Nirvana.jpg"
}, {
    question: 'Which Beatles song was never a number one hit?',
    answers: ["Lady Madonna", "Hello Goodbye", "I am the Walrus", "Ticket to Ride"],
    correctAnswer: "I am the Walrus",
    image: "images/beatles.gif"
}, {
    question: 'Which guitarist asked if you were "experienced"?',
    answers: ["Stevie Ray Vaughn", "Van Halen", "Jimmy Page", "Jimi Hendrix"],
    correctAnswer: "Jimi Hendrix",
    image: "images/jimi.jpg"
}, {
    question: "Which band has a song named 2012 Overture?",
    answers: ["Rush", "Aerosmith", "Poison", "Mayhem"],
    correctAnswer: "Rush",
    image: "images/rush.jpg"
}, {
    question: "Which Band was the first to release a punk album in the UK?",
    answers: ["The Sex Pistols", "The Damned", "G.B.H.", "The Briefs"],
    correctAnswer: "The Damned",
    image: "images/damned.jpg"
}];




var game = {
    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,
    countdown: function() {
        game.counter--;
        $('#counter-number').html(game.counter);

        if (game.counter === 0) {
            console.log('TIME UP');
            game.timeUp();
        }
    },
    loadQuestion: function() {
        timer = setInterval(game.countdown, 1000);
        panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>');
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i] + '</button>');
        }
    },
    nextQuestion: function() {
        game.counter = countStartNumber;
        $('#counter-number').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function() {
        clearInterval(timer);
        $('#counter-number').html(game.counter);

        panel.html('<h2>Out of Time!</h2>');
        panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
        panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    results: function() {
        clearInterval(timer);

        panel.html('<h2>All done, heres how you did!</h2>');
        $('#counter-number').html(game.counter);
        panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
        panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
        panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
        panel.append('<br><button id="start-over">Start Over?</button>');
    },
    clicked: function(e) {
        clearInterval(timer);

        if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer) {
            this.answeredCorrectly();
        } else {
            this.answeredIncorrectly();
        }
    },
    answeredIncorrectly: function() {
        game.incorrect++;
        clearInterval(timer);
        panel.html('<h2>No!</h2>');
        panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    answeredCorrectly: function() {
        clearInterval(timer);
        game.correct++;
        panel.html('<h2>Right!</h2>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    reset: function() {
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }

};
$(function() {

    causeRepaintsOn = $("h1, h2, h3, p");

    $(window).resize(function() {
        causeRepaintsOn.css("z-index", 1);
    });

});