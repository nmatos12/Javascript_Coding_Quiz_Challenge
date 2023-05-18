//variables and querySelector elements
var startBtn = document.querySelector('#startBtn')
var startSection = document.querySelector('#startSection');
var questionEl = document.querySelector('#question');
var choicesEl = document.querySelector('#choices')
var timerEl = document.querySelector('#timer')
var questionSection = document.querySelector('#questionSection')
var endSection = document.querySelector('#endSection')
var correctOrWrong = document.querySelector('#correctorwrong')
var timerDiv = document.querySelector('.timerDiv')
var scorecard = document.querySelector('#scorecard')
var scoreEl = document.querySelector('#score')
var finalScore = document.querySelector('#final-score')
var initialsBtn = document.querySelector('#submitInitials')
var highScores = document.querySelector('#highscores')
var highScoreButton = document.querySelector('#highScoreBtn')
var returnHomeButton = document.querySelector('#returnHomeBtn')
var questionUserIsOn = 0;
var timer;
var seconds = 60;
var interval;
var score = -1;

//function to hide welcome page and show timer and question
function startQuiz() {
    startSection.classList.add('d-none');

    showQuestion()
    onScreenTimer()
    keepScore()
}

//function that creates both the question and choices to screen
function showQuestion() {
    questionEl.innerText = questions[questionUserIsOn].question;
    for (choice = 0; choice < 4; choice++) {
        var choiceBtn = document.createElement('button');
        choiceBtn.innerHTML = questions[questionUserIsOn].choices[choice];
        //adding styles
        choiceBtn.classList.add('me-3')
        choiceBtn.classList.add('mt-3')
        choiceBtn.classList.add('pe-3')
        choiceBtn.classList.add('ps-3')
        //pushing the created button elements to the screen
        //listening for a button click and running check Answer function
        choiceBtn.addEventListener('click', checkAnswer)
        choicesEl.append(choiceBtn);
        
    }
}

//function that checks users answer and returns wrong or correct to screen!
function checkAnswer(event) {
    //compare the users selection with the actual answer from the question
    var userChoice = event.srcElement.innerText;

    if (userChoice === questions[questionUserIsOn].answer) {
        choicesEl.innerHTML = '';
        //prints correct to screen
        correctOrWrong.innerText = 'Correct!'
        questionUserIsOn = questionUserIsOn + 1;
        questionsLeft(questionUserIsOn);
        //if user gets the question right I call keepScore
        keepScore();
    } else {
        choicesEl.innerHTML = '';
        //prints wrong to screen
        correctOrWrong.innerText = 'Wrong!'
        questionUserIsOn = questionUserIsOn + 1;
        questionsLeft(questionUserIsOn);
        //deducts 10 sec from timer
        timeDeduction();
    }
}

//function that checks if there are any questions left, if not it will call end quiz!
function questionsLeft (questionUserIsOn){
    if(questionUserIsOn < 8){
        showQuestion();
    }else{
        clearInterval(timer);
        timerDiv.classList.add('hide');
        endQuiz();
    }
}

//a function that ads a point when the user answers the question right, also displays the current score to the screen!
function keepScore(){
    scorecard.classList.remove('hide')
    score = score + 1;
    scoreEl.innerHTML = score;
}

//a function that runs when the user submits his/her initials on the end screen
function submitUserInitialsAndScore(e) {
    //stops button from refreshing screen
    e.preventDefault();
    var textBox = document.querySelector('#textBox');
    finalScore = score;
    var initials = textBox.value;
    var userScore = finalScore;
    var hiScoreObj = {
        initials: initials,
        userScore: userScore,
    };
    
    var currentHiScores = JSON.parse(localStorage.getItem('hiScores')) || [];

    currentHiScores.push(hiScoreObj);

    localStorage.setItem('hiScores', JSON.stringify(currentHiScores)) || [];

    displayHighScoresWithName();
}

//create a function that sends user to the highscores screen from end of quiz!
function displayHighScoresWithName(){
    startSection.classList.add('d-none')
    endSection.classList.add('d-none');
    highScores.classList.remove('hide');
    returnHomeButton.classList.remove('hide');
    highScoreButton.classList.add('hide')


    var hiScoreArr = JSON.parse(localStorage.getItem('hiScores'));
    console.log(hiScoreArr)

    for(i = 0; i < hiScoreArr.length; i++){
        var currentObj = hiScoreArr[i]
        console.log(currentObj)
        var displayHiScore = document.querySelector('#hiScores');
        var hiScore = document.createElement('li')
        hiScore.classList.add('text-center')
        hiScore.innerHTML = currentObj.initials + ' - ' + currentObj.userScore;
        displayHiScore.appendChild(hiScore)
    }
}

//function that sends user to the end screen
function endQuiz(){
    questionSection.classList.add('d-none')
    endSection.classList.remove('hide')
    returnHomeButton.classList.remove('hide')
    scorecard.classList.add('white-text')
    //prints final score
    finalScore.innerHTML = score + 1;
    
}

//function that displays the timer when start button is hit! 
function onScreenTimer(){
    timerDiv.classList.remove('hide')
    timer = setInterval(() =>{
        timerEl.innerHTML = seconds;
        seconds --;

        //if user runs out of time I want to stop timer and send user to end screen!
        if(seconds < 0){
            clearInterval(timer);
            endQuiz();
        }

    }, 1000)
}

//function that deducts time from user (called in checkAnswer)
function timeDeduction (){
    //runs if user gets question wrong!
    seconds = seconds - 10;
}

//event listeners - 
startBtn.addEventListener('click', startQuiz);
initialsBtn.addEventListener('click', submitUserInitialsAndScore);
highScoreButton.addEventListener('click', displayHighScoresWithName)
returnHomeButton.addEventListener('click', function() {
    location.reload(); 
});
