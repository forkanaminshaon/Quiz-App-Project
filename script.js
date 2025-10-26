// 1. --- Define Questions ---
// An array of objects, where each object is a question
const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hypertext Markup Language", correct: true },
            { text: "Hyperlink and Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyper-Transfer Machine Language", correct: false }
        ]
    },
    {
        question: "Which property is used to change the background color in CSS?",
        answers: [
            { text: "color", correct: false },
            { text: "bgcolor", correct: false },
            { text: "background-color", correct: true },
            { text: "font-color", correct: false }
        ]
    },
    {
        question: "What symbol is used to select an ID in CSS?",
        answers: [
            { text: ".", correct: false },
            { text: "#", correct: true },
            { text: "*", correct: false },
            { text: "&", correct: false }
        ]
    },
    {
        question: "Which JavaScript method is used to write to the console?",
        answers: [
            { text: "console.write()", correct: false },
            { text: "console.output()", correct: false },
            { text: "console.print()", correct: false },
            { text: "console.log()", correct: true }
        ]
    }
];

// 2. --- Get HTML Elements ---
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// 3. --- Initialize State ---
let currentQuestionIndex = 0;
let score = 0;

// 4. --- Main Functions ---

/**
 * Starts the quiz from the beginning
 */
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

/**
 * Displays the current question and answers
 */
function showQuestion() {
    resetState(); // Clear previous question/answers

    // Get current question object
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // Create buttons for each answer
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtonsElement.appendChild(button);

        // Store the correct answer info
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        // Add click event listener to check answer
        button.addEventListener("click", selectAnswer);
    });
}

/**
 * Resets the state for the next question
 */
function resetState() {
    nextButton.style.display = "none"; // Hide "Next" button
    // Remove all previous answer buttons
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

/**
 * Handles what happens when an answer is clicked
 */
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++; // Increment score
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Show correct answer if the wrong one was selected
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; // Disable all buttons
    });

    nextButton.style.display = "block"; // Show "Next" button
}

/**
 * Shows the final score
 */
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart Quiz";
    nextButton.style.display = "block";
}

/**
 * Handles the "Next" button click
 */
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// 5. --- Event Listeners ---

// Handle "Next" or "Restart" button click
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz(); // If at the end, restart the quiz
    }
});

// 6. --- Start the Quiz ---
startQuiz();