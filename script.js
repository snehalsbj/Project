const questions = [
    {
        question: "What does HTML stand for?",
        answer: [
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "None", correct: false },
        ]
    },
    {
        question: "Which of the following is a CSS framework?",
        answer: [
            { text: "Django", correct: false },
            { text: "Node.js", correct: false },
            { text: "Bootstrap", correct: true },
            { text: "jQuery", correct: false },
        ]
    },
    {
        question: "What does CSS stand for?",
        answer: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Computer Style Sheets", correct: false },
            { text: "Creative Style Systems", correct: false },
            { text: "Colorful Style Sheets", correct: false },
        ]
    },
    {
        question: "What is the purpose of the <div> tag in HTML?",
        answer: [
            { text: "To create a hyperlink", correct: false },
            { text: "To create a table", correct: false },
            { text: "To insert images", correct: false },
            { text: "To define a section in a document", correct: true },
        ]
    },
    {
        question: "Which of the following is used to create a responsive web design?",
        answer: [
            { text: "PHP", correct: false },
            { text: "HTML5", correct: false },
            { text: "Media Queries", correct: true },
            { text: "JavaScript", correct: false },
        ]
    },
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-btn");
const quizContainer = document.querySelector(".quiz");

let currentQuestionIndex = 0;
let score = 0;
let playerName = "";

function startQuiz() {
    if (!playerName) {
        playerName = prompt("Enter your name:"); 
        if (!playerName) {
            playerName = "Player";
        }
    }
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    quizContainer.style.display = "block"; 
    document.getElementById("start-container").style.display = "none"; 
    document.getElementById("qr-code").style.display = "none"; 
    showQuestion();
}


function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answer.forEach(element => {
        const button = document.createElement("button");
        button.innerHTML = element.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        button.dataset.correct = element.correct; 
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }    
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true; 
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `${playerName}, you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "PLAY AGAIN";
    nextButton.style.display = "block";
}


function generateQRCode() {
    const qr = new QRious({
        element: document.getElementById('qr-canvas'),
        value: "https://quiz-game-wheat-seven.vercel.app/", 
        size: 200 
    });
}

generateQRCode();

startButton.addEventListener("click", startQuiz); 
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});