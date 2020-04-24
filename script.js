//Questions

var questions = [
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Home Tool Maximum Linux", "Hyperlink Target Maximum Level", "Hyperlink Target Maximum Level"],
        answer: [1,0,0,0]
    
    },
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["Strings", "Booleans", "Alerts", "Numbers"],
        answer: [0,0,1,0]
        
        
    },
    {
        question: "Arrays in JavaScript can be used to store:",
        choices: ["Numbers and strings", "Other arrays", "Booleans", "All of the above"],
        answer: [0,0,0,1]
        
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "Terminal", "For loops", "console.log"],
        answer: [0,0,0,1]
        
        
    },
    {
        question: "Which of the following is a style sheet language used for describing the presentation of a document written in a markup language?",
        choices: ["HTML", "CSS", "Bootstrap", "Javascript"],
        answer: [0,1,0,0]
        
        
    }
];

// DOM elements
var questionSeen = document.getElementById('questions');
var optionOne = document.getElementById('answerA');
var optionTwo = document.getElementById('answerB')
var optionThree = document.getElementById('answerC');
var optionFour = document.getElementById('answerD');
var startBtn = document.getElementById('start-btn');
var timerEl = document.getElementById('time');





var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;











//start the quiz
function startQuiz() {
    startBtn.style.display = 'none';


    // start timer
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;

    getQuestion();
}


function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    questionSeen.textContent = currentQuestion.question;

    currentQuestion.choices.forEach(function() {
        optionOne.textContent = currentQuestion.choices[0];
        optionTwo.textContent = currentQuestion.choices[1];
        optionThree.textContent = currentQuestion.choices[2];
        optionFour.textContent = currentQuestion.choices[3];

        
        optionOne.setAttribute("value", currentQuestion.answer[0]);
        optionTwo.setAttribute("value", currentQuestion.answer[1]);
        optionThree.setAttribute("value", currentQuestion.answer[2]);
        optionFour.setAttribute("value", currentQuestion.answer[3]);


      
    });

    // click event listener to each choice
    optionOne.onclick = questionClick;
    optionTwo.onclick = questionClick;
    optionThree.onclick = questionClick;
    optionFour.onclick = questionClick;
}

function questionClick() {
    if (this.value ==! 1) {
        time -= 15;
        if (time < 0) {
            time = 0;
        }
        document.body.style.backgroundColor = 'red';
     setTimeout(function(){
       document.body.style.backgroundColor = 'white';
        }, 1000);
        
    } else {
        document.body.style.backgroundColor = 'green';
     setTimeout(function(){
       document.body.style.backgroundColor = 'white';
        }, 1000);
    };
    

    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        quizEnd(); 
    } else {
        getQuestion();
    }
};

function quizEnd() {
    clearInterval(timerId);

    optionOne.style.display = 'none';
    optionTwo.style.display = 'none';
    optionThree.style.display = 'none';
    optionFour.style.display = 'none';

    document.getElementById('question').innerHTML = "All done! <br/><br/> You got " + time + "<br/> <p>Enter initials: <input type='text' id='initials' max='3'/><button id='submit'>Submit</button></p>";

    function saveHighscore() {
       var initials = document.getElementById('initials').value.trim();
         // make sure value wasn't empty
      if (initials !== "") {
        // get saved scores from localstorage, or if not any, set to empty array
        var highscores =
          JSON.parse(window.localStorage.getItem("highscores")) || [];
    
        // format new score object for current user
        var newScore = {
          score: time,
          initials: initials
        };
    
        // save to localstorage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
    
        // redirect to next page
        window.location.href = "scores.html";
      };
    };
    
    function checkForEnter(event) {
        if (event.key === "Enter") {
            saveHighscore();
        }
    };
    
    document.getElementById('submit').onclick = saveHighscore;

    document.getElementById('initials').onkeyup = checkForEnter;


};

function clockTick() {
    time--;
    timerEl.textContent = time;

    if(time <= 0) {
        quizEnd();
    }
};




startBtn.onclick = startQuiz;






