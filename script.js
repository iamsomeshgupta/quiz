document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz');
    const submitButton = document.getElementById('submit');
    const resultsContainer = document.getElementById('results');
    const timerDisplay = document.getElementById('time');
    let timeLeft = 60; 
  
    const quizData = [
      {
        question: "What is the capital of France?",
        answers: {
          a: "Berlin",
          b: "Madrid",
          c: "Paris",
          d: "Lisbon"
        },
        correctAnswer: "c",
        explanation: "Paris is the capital of France."
      },
      {
        question: "Which planet is known as the Red Planet?",
        answers: {
          a: "Earth",
          b: "Mars",
          c: "Jupiter",
          d: "Saturn"
        },
        correctAnswer: "b",
        explanation: "Mars is known as the Red Planet because of its reddish appearance."
      },
      {
        question: "What is the largest ocean on Earth?",
        answers: {
          a: "Atlantic Ocean",
          b: "Indian Ocean",
          c: "Arctic Ocean",
          d: "Pacific Ocean"
        },
        correctAnswer: "d",
        explanation: "The Pacific Ocean is the largest and deepest ocean on Earth."
      },
      {
        question: "Which country is known as the Land of the Rising Sun?",
        answers: {
          a: "China",
          b: "Japan",
          c: "Thailand",
          d: "Vietnam"
        },
        correctAnswer: "b",
        explanation: "Japan is known as the Land of the Rising Sun."
      },
      {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: {
          a: "Harper Lee",
          b: "Mark Twain",
          c: "F. Scott Fitzgerald",
          d: "Ernest Hemingway"
        },
        correctAnswer: "a",
        explanation: "'To Kill a Mockingbird' was written by Harper Lee."
      }
    ];
  
    function buildQuiz() {
      const output = [];
  
      quizData.forEach((currentQuestion, questionNumber) => {
        const answers = [];
        for (letter in currentQuestion.answers) {
          answers.push(
            `<li data-number="${questionNumber}" data-answer="${letter}">
              ${letter} : ${currentQuestion.answers[letter]}
            </li>`
          );
        }
  
        output.push(
          `<div class="quiz-question">
            <h2>${currentQuestion.question}</h2>
            <ul class="answers">${answers.join('')}</ul>
          </div>`
        );
      });
  
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults() {
      const answerContainers = quizContainer.querySelectorAll('.answers li');
      let numCorrect = 0;
  
      quizData.forEach((currentQuestion, questionNumber) => {
        const selector = `li[data-number="${questionNumber}"]`;
        const userAnswer = (quizContainer.querySelector(`${selector}.selected`) || {}).dataset.answer;
  
        if (userAnswer === currentQuestion.correctAnswer) {
          numCorrect++;
          quizContainer.querySelector(`${selector}.selected`).classList.add('correct');
        } else {
          quizContainer.querySelector(`${selector}.selected`).classList.add('incorrect');
        }
      });
  
      resultsContainer.innerHTML = `
        <h3>You scored ${numCorrect} out of ${quizData.length}</h3>
        ${quizData.map((question, index) => {
          return `
            <div class="question-result">
              <h4>${question.question}</h4>
              <p>Correct answer: ${question.answers[question.correctAnswer]}</p>
              <p>${question.explanation}</p>
            </div>
          `;
        }).join('')}
      `;
    }
  
    function handleAnswerClick(e) {
      if (!e.target.matches('li')) return;
  
      const answerContainers = e.target.parentElement.querySelectorAll('li');
      answerContainers.forEach(answer => answer.classList.remove('selected'));
  
      e.target.classList.add('selected');
    }
  
    function startTimer() {
      const timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          showResults();
          submitButton.disabled = true;
        } else {
          timeLeft--;
          timerDisplay.textContent = timeLeft;
        }
      }, 1000);
    }
  
    quizContainer.addEventListener('click', handleAnswerClick);
    submitButton.addEventListener('click', showResults);
  
    buildQuiz();
    startTimer();
  });
  