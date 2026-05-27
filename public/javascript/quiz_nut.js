const quizData = [
    {
        question: "Qual macronutriente é a principal fonte de energia rápida para o corpo?",
        options: [
            "Proteínas",
            "Carboidratos",
            "Gorduras (Lipídios)",
            "Fibras"
        ],
        correct: 1
    },
    {
        question: "Qual vitamina é sintetizada pela pele quando exposta à luz solar?",
        options: [
            "Vitamina C",
            "Vitamina A",
            "Vitamina D",
            "Vitamina B12"
        ],
        correct: 2
    },
    {
        question: "Qual é a principal função das proteínas no organismo?",
        options: [
            "Reserva de energia a longo prazo",
            "Construção e reparação de tecidos (músculos)",
            "Transporte de oxigênio apenas",
            "Hidratação das células"
        ],
        correct: 1
    },
    {
        question: "Onde ocorre a maior parte da absorção de nutrientes no sistema digestório?",
        options: [
            "Estômago",
            "Intestino Delgado",
            "Intestino Grosso",
            "Esôfago"
        ],
        correct: 1
    },
    {
        question: "Qual mineral é essencial para o transporte de oxigênio no sangue e prevenção da anemia?",
        options: [
            "Cálcio",
            "Potássio",
            "Ferro",
            "Magnésio"
        ],
        correct: 2
    }
];

// Permite que o quiz seja iniciado apenas quando o usuário clicar em "Começar".
let started = false;

let currentQuestion = 0;
let score = 0;
let timer = 30;
let timeLeft = 30;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const timerEl = document.getElementById('timer');
const progressBar = document.querySelector('.progress-bar');
const quizContainer = document.getElementById('quiz');

function loadQuestion() {
    const question = quizData[currentQuestion];
    questionEl.textContent = question.question;
    optionsEl.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectOption(button, index));
        optionsEl.appendChild(button);
    });

    nextBtn.style.display = 'none';
    timeLeft = 30;

    if (timer) clearInterval(timer);
    startTimer();
    updateProgress();
}


function selectOption(selectedButton, optionIndex) {
    const buttons = optionsEl.getElementsByClassName('option');
    Array.from(buttons).forEach(button => button.classList.remove('selected'));
    selectedButton.classList.add('selected');
    nextBtn.style.display = 'block';
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            checkAnswer();
        }
    }, 1000);
}

function checkAnswer() {
    const selectedOption = document.querySelector('.option.selected');
    if (!selectedOption) return;

    const selectedAnswer = Array.from(optionsEl.children).indexOf(selectedOption);
    const question = quizData[currentQuestion];

    if (selectedAnswer === question.correct) {
        score++;
        selectedOption.classList.add('correct');
    } else {
        selectedOption.classList.add('incorrect');
        optionsEl.children[question.correct].classList.add('correct');
    }

    Array.from(optionsEl.children).forEach(button => button.disabled = true);
    clearInterval(timer);
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
}

function showResults() {
    quizContainer.innerHTML = `
                <div class="results">
                    <div class="result-icon">
                        <i class="fas ${score > quizData.length / 2 ? 'fa-trophy text-success' : 'fa-times-circle text-danger'}"></i>
                    </div>
                    <div class="score">Your score: ${score}/${quizData.length}</div>
                    <p>${score > quizData.length / 2 ? 'Great job!' : 'Better luck next time!'}</p>
                    <button class="btn btn-primary" onclick="location.reload()">Restart Quiz</button>

                    <a href="../HTML/perfil_(G).html"> Voltar ao perfil </a>
                </div>
            `;
}

nextBtn.addEventListener('click', () => {
    checkAnswer();
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

// Tela inicial: mostra "Começar" e só inicia o cronômetro ao clicar.
const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const questionContainer = document.getElementById('question-container');
const quizFooter = document.getElementById('quiz-footer');

if (startBtn) {
    startBtn.addEventListener('click', () => {
        started = true;
        startScreen.style.display = 'none';
        questionContainer.style.display = 'block';
        quizFooter.style.display = 'flex';
        // garante que comece do início
        currentQuestion = 0;
        score = 0;
        // o loadQuestion() já inicializa o timer e o primeiro enunciado
        loadQuestion();
    });
} else {
    // fallback: se não existir o botão, começa imediatamente (compatibilidade)
    loadQuestion();
}

