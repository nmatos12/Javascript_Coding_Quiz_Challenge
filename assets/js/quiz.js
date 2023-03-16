var questions = [
    {
        q: 'blah blah blah?',
        a: ['blah', 'Blah', 'blah', 'blah'],
        correctIndex: 1
    } 
];

var questionWrap = document.querySelector('.question-wrap');
var awardDisplay = document.querySelector('.award-display');

function checkAnswer() {
    var index = this.dataset.index;

    if (index == questionWrap.correctIndex) {
        console.log('Correct!');
        awardDisplay.classList.add('show');
    } else {
        console.log('Wrong!');
        awardDisplay.classList.add('show');
    }
}

function displayQuestion() {

}
