var question_count = 0;
var points = 0;
var time = 60;
var timerDisplay = document.querySelector('#timer-display')
//var startButton = document.querySelector('#timer')

var window = document.querySelector('window');
window.addEventListener("load", beginQuiz(question_count));

function beginQuiz(count) {
    startTimer()
    startQuiz(count)
}

function startQuiz(count) {
//if statement to see if count is equalk or greater than 6
//call endQuiz function
//clear Interval timer
//in endQuiz, add hide class to elemetn on page
//append new elements to show whatever you want
    var question = document.getElementById('questions');
    var [first, second, third, fourth] = questions[count].options;

    question.innerHTML = `<h2>Q${count + 1}. ${questions[count].question}</h2>
    <ul class="option_group">
    <li class="option">${first}</li>
    <li class="option">${second}</li>
    <li class="option">${third}</li>
    <li class="option">${fourth}</li>
    </ul>`;
    toggleActive();
}

function toggleActive(){
    let option = document.querySelectorAll("li.option");
    for(let i=0; i < option.length; i++){
        option[i].onclick = function(){
            for(let i=0; i < option.length; i++){
                if(option[i].classList.contains("active")){
                    option[i].classList.remove("active");
                }
            }
            option[i].classList.add("active");
        }
    }
}

function next(){

    if(question_count == questions.length -1){
        location.href = "final.html";
    }
    console.log(question_count);


let user_answer = document.querySelector("li.option.active").innerHTML;

if(user_answer == questions[question_count].answer){
    points += 10;
    sessionStorage.setItem("points",points);
}
console.log(points);

question_count++;
startQuiz(question_count);
}


function startTimer() {
    timerDisplay.innerText = '60';

    var timer = setInterval(function() {
        time--;
        timerDisplay.innerText = time;
        if (!time) {
            clearInterval(timer);
        }
    }, 1000);
   
}

//startButton.addEventListener('click', startTimer);

