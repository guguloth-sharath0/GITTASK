const questions = [
    {
        question:"Which is larget city in india?",
        answers:[
            {text: "kolkata", correct: false},
            {text: "Mumbai", correct: true},
            {text: "Delhi", correct: false},
            {text: "madras", correct: false},
        ]
    },
    {
        question:"Which is smallest country in the world?",
        answers:[
            {text: "Vatican city", correct: true},
            {text: "Bhutan", correct: false},
            {text: "nepal", correct: false},
            {text: "Sri Lanka", correct: false},
        ]
    },
    {
        question:"Which is longest river of india?",
        answers:[  
            {text: "Yamuna", correct: false},
            {text: "Kosi", correct: false},
            {text: "Brahmaputra", correct: false},
            {text: "Ganga", correct: true},
        ]
    },
    {
        question:"Which is the smallest continent in the world?",
        answers:[
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "India", correct: false},
            {text: "Africa", correct: false},
        ]
    }
];

const questionELement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionELement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer)

    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn =e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
       selectedBtn.classList.add("correct");
       score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
   nextButton.style.display="block";
} 
function showScore(){
    resetState();
    questionELement.innerHTML = ' Your Response has been recorded.';
    nextButton.innerHTML= "Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
