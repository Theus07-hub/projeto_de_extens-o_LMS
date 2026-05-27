const quizData = [
    {
        question: "A Educação Física está diretamente ligada a:",
        options: [
            "Movimento, saúde e esporte",
            "Construção de prédios",
            "Banco de dados",
            "Transporte de cargas"
        ],
        correct: 0
    },
    {
        question: "Onde um profissional de Educação Física pode atuar?",
        options: ["Academias, escolas e clubes", "Apenas hospitais cirúrgicos", "Somente bancos", "Apenas portos"],
        correct: 0
    },
    {
        question: "Qual disciplina pode fazer parte do curso de Educação Física?",
        options: ["Anatomia e fisiologia", "Direito penal", "Cálculo estrutural avançado", "Comércio exterior"],
        correct: 0
    },
    {
        question: "A prática correta de exercícios pode ajudar a:",
        options: [
            "Melhorar saúde e condicionamento físico",
            "Aumentar lesões de propósito",
            "Evitar qualquer movimento",
            "Substituir alimentação"
        ],
        correct: 0
    },
    {
        question: "No dia a dia, a Educação Física contribui para:",
        options: [
            "Criar hábitos saudáveis",
            "Ignorar os limites do corpo",
            "Diminuir a qualidade de vida",
            "Evitar atividades físicas"
        ],
        correct: 0
    }
];

const resultMessages = {
    perfeito: "Excelente! Você entende muito bem a relação entre movimento, saúde e qualidade de vida.",
    bom: "Muito bom! Você conhece bem a importância da Educação Física.",
    medio: "Você foi razoável. Revise melhor as áreas de atuação do profissional.",
    baixo: "Continue estudando! Educação Física vai muito além do esporte."
};

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

                    <a href="../HTML/perfil_(MCS).html"> Voltar ao perfil </a>
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
