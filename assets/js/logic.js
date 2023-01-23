//Elements that linked with HTML file class/id for making the javascript logics
const timer = document.getElementById("time");
const start_btn = document.getElementById('start');
const question_screen = document.getElementById("questions");
const question_title = document.getElementById("question-title");
const each_choice = document.getElementById("choices");
const feedback = document.getElementById("feedback");
const end_screen = document.getElementById("end-screen");
const final_score = document.getElementById("final-score");
const initials = document.getElementById("initials");
const submit = document.getElementById("submit");
//Audios for correct/wrong choices
const correct_audio = new Audio("./assets/sfx/correct.wav");
const wrong_audio = new Audio("./assets/sfx/incorrect.wav");
let currentQuestionIndex;
let result = 0;
//Start time
let count = 60;

// Quiz timer will start when the start button is pressed 
const timerDisplay = () => {
    countdown = setInterval(() => {
      count--;
      timer.innerHTML = `${count}`;
      if (count == 0) {
        clearInterval(countdown);
        currentQuestionIndex = questions.length + 1;
        nextQuestion();
      }
    }, 1000);
  };

// Start button activity that start the quiz 
start_btn.addEventListener('click', startQuiz);


// Starting the Quiz hidhing first page of HTML and shows questions
function startQuiz() {
    const start_screen = document.getElementById('start-screen');
    start_screen.classList.add('hide');
    question_screen.classList.remove('hide');
    currentQuestionIndex = 0;
    nextQuestion();
    timerDisplay();
}

// Generate the questions one by one
function nextQuestion(){
    resetState();
    if(currentQuestionIndex < questions.length){
        displayQuestions(questions[currentQuestionIndex]);
    }
    else{
        question_screen.classList.add('hide');
        end_screen.classList.remove("hide");
        final_score.innerHTML = result;
        localStorage.setItem('result', result);
    }
}


function displayQuestions(question) {
    question_title.innerHTML = question.question;
    for (let i of question.choices) {
        const button = document.createElement('button');
        button.innerText = i;
        button.addEventListener('click', selectChoice);
        each_choice.appendChild(button);
    }
}

// Remove previous choices
function resetState() {
    while(each_choice.firstChild) {
        each_choice.removeChild(each_choice.firstChild)
    }
}

// Select the choice
function selectChoice(event) {
    const selectedButton = event.target.innerText;
    const option_chosen = selectedButton;
    setStatusClass(option_chosen);    
}
//If the user choice is right then will play correct audio if user choice is wrong then will play wrong audio
//right choices will increase result points , wrong choices will reduce the timer value and also reduce result points
function setStatusClass(option_chosen) {
    const solution = questions[currentQuestionIndex].correct;
    if(option_chosen === solution) {
        correct_audio.play();
        feedback.classList.remove("hide");
        feedback.innerHTML = "Correct!";
        result+=50;
    }
    else {
        wrong_audio.play();
        feedback.classList.remove("hide"); 
        feedback.innerHTML = "Wrong!";
        result-=20;
        count-=5;
    }
    currentQuestionIndex++;
    nextQuestion();
}
//Save the values in local storage by submitting button 

submit.addEventListener("click", function () {
    console.log(initials.value);
    const initial_value = initials.value;
    localStorage.setItem('initials', initial_value);
    location.href = "./highscores.html";
});