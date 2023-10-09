const data = {
    "questions": [
        {
            "question": "What is the capital of France?",
            "options": ["Berlin", "Madrid", "Rome", "Paris"],
            "correctAnswer": "Paris",
            "category": "Geography"
        },
        {
            "question": "Which continent is known as the 'Land Down Under'?",
            "options": ["Asia", "Europe", "Australia", "Africa"],
            "correctAnswer": "Australia",
            "category": "Geography"
        },
        {
            "question": "Who was the first President of the United States?",
            "options": ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
            "correctAnswer": "George Washington",
            "category": "History"
        },
        {
            "question": "Which ancient civilization built the Great Wall of China?",
            "options": ["Roman Empire", "Ancient Egypt", "Inca Empire", "Chinese Empire"],
            "correctAnswer": "Chinese Empire",
            "category": "History"
        }
    ]
}

const body = document.querySelector('body')
const questionNumberDiv = document.querySelector(".question-number")
let liveScore = document.querySelector("[data-score]")
let score = 0;
const question = document.querySelector(".question")
const choices = document.querySelectorAll(".choice-container")
const answerOrder = document.querySelectorAll(".answer-order");
const questReference = data.questions
let answerValue;
let result = document.getElementById("result")

// Get references to the progress bar and label
const progressBar = document.getElementById("progress-bar");
const progressLabel = document.getElementById("progress-label");
let progress = 0;

// Update the progress bar and label
function updateProgress() {
    progressBar.style.width = progress + "%";
    progressLabel.textContent = progress + "%";
}

// Simulate answering questions and updating progress
function answerQuestion() {
    if (progress < 100) {
        // Increment progress by 25% for each question
        progress += 25;
        updateProgress();
    }

    if (progress === 100) {
        // All questions answered, you can perform any necessary actions here
        alert("Quiz completed!");
    }
}


document.addEventListener('DOMContentLoaded', function () {
    let questionNumber = 1;
    let questionIndex = 0;

    let qText = document.createElement("h1")
    qText.textContent = questReference[0].question
    question.appendChild(qText)

    function displayNextQuestion(){
        if (questionIndex < questReference.length) {
            nOutOf.innerText = "question " + questionNumber + " out of " + questReference.length;
            qText.textContent = questReference[questionIndex].question;
            

            for (let i = 0; i < answerOrder.length; i++) {
                answerOrder[i].textContent = questReference[questionIndex].options[i]
                
            }
        } else {
            // Quiz finished, display score 
            localStorage.setItem("score", score)
            window.location.assign("result.html")
        }
    }

    for (const blocks of choices) {
        blocks.addEventListener('click', (e) => {
            e.preventDefault()
            questionNumber++;
            questionIndex++;
            answerValue = e.currentTarget.querySelector('[data-answer]').textContent;

            const correctAnswer = questReference[questionIndex - 1].correctAnswer;

            if (answerValue === correctAnswer) {
                score++;
                liveScore.textContent = score.toString()
                blocks.classList.add("correct")

                setTimeout(() => {
                    blocks.classList.remove("correct"); // Remove the "correct" class
                    displayNextQuestion(); // Proceed to the next question
                    answerQuestion();
                }, 1000);
            } else {
                blocks.classList.add("wrong")
                setTimeout(() => {
                    blocks.classList.remove("wrong"); // Remove the "correct" class
                    displayNextQuestion(); // Proceed to the next question
                    answerQuestion();
                }, 1000);
            }


        })
    }

    let nOutOf = document.createElement("h3")
    nOutOf.innerText = "question " + questionNumber + " out of " + questReference.length;
    questionNumberDiv.appendChild(nOutOf)
    displayNextQuestion();
    
})
