const quizConfig = {
    nome: "Nutrição",
    tempo: 30,
    frases: {
        perfeito: "Excelente! Você mostrou que entende muito bem a importância da alimentação e da saúde.",
        bom: "Muito bom! Você tem uma boa noção sobre Nutrição, mas ainda pode revisar alguns pontos.",
        medio: "Você foi bem, mas ainda precisa estudar um pouco mais sobre o papel do nutricionista.",
        baixo: "Continue estudando! A Nutrição é uma área rica e cheia de detalhes importantes."
    }
};

document.addEventListener("DOMContentLoaded", function () {
    const quiz = document.querySelector(".quiz-box");
    if (!quiz) return;

    const questions = Array.from(quiz.querySelectorAll(".question"));
    const oldButton = quiz.querySelector(".quiz-btn");

    if (oldButton) {
        oldButton.remove();
    }

    let currentQuestion = 0;
    let score = 0;
    let timeLeft = quizConfig.tempo;
    let timerInterval = null;
    let quizFinished = false;

    questions.forEach(function (question) {
        question.style.display = "none";
    });

    const startScreen = document.createElement("div");
    startScreen.className = "start-screen";
    startScreen.innerHTML = `
        <p class="start-text">
            Você está prestes a iniciar o quiz de ${quizConfig.nome}. O tempo começa quando clicar em <b>Começar</b>.
        </p>
        <button class="btn btn-primary" id="start-btn">Começar</button>
    `;

    const footer = document.createElement("div");
    footer.className = "quiz-footer";
    footer.style.display = "none";
    footer.innerHTML = `
        <div class="timer" id="timer">Tempo: ${timeLeft}s</div>
        <button class="btn btn-primary" id="next-btn">Próxima</button>
    `;

    const result = document.createElement("div");
    result.className = "quiz-result";
    result.style.display = "none";

    const title = quiz.querySelector("h2");
    title.insertAdjacentElement("afterend", startScreen);
    quiz.appendChild(footer);
    quiz.appendChild(result);

    const startBtn = quiz.querySelector("#start-btn");
    const nextBtn = quiz.querySelector("#next-btn");
    const timer = quiz.querySelector("#timer");

    startBtn.addEventListener("click", startQuiz);
    nextBtn.addEventListener("click", nextQuestion);

    function startQuiz() {
        startScreen.style.display = "none";
        footer.style.display = "flex";
        showQuestion();
        startTimer();
    }

    function startTimer() {
        timerInterval = setInterval(function () {
            timeLeft--;
            timer.textContent = `Tempo: ${timeLeft}s`;

            if (timeLeft <= 0) {
                finishQuiz();
            }
        }, 1000);
    }

    function showQuestion() {
        questions.forEach(function (question) {
            question.style.display = "none";
        });

        questions[currentQuestion].style.display = "block";

        if (currentQuestion === questions.length - 1) {
            nextBtn.textContent = "Finalizar";
        }
    }

    function nextQuestion() {
        if (quizFinished) return;

        const selected = questions[currentQuestion].querySelector("input[type='radio']:checked");

        if (!selected) {
            result.style.display = "block";
            result.textContent = "Escolha uma alternativa antes de continuar.";
            result.style.background = "rgba(255, 180, 60, 0.22)";
            result.style.border = "1px solid rgba(255, 180, 60, 0.45)";
            return;
        }

        result.style.display = "none";

        if (selected.dataset.correct === "true") {
            score++;
        }

        currentQuestion++;

        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            finishQuiz();
        }
    }

    function finishQuiz() {
        if (quizFinished) return;

        quizFinished = true;
        clearInterval(timerInterval);

        questions.forEach(function (question) {
            question.style.display = "none";
        });

        footer.style.display = "none";
        result.style.display = "block";

        const total = questions.length;
        let frase = "";

        if (score === total) {
            frase = quizConfig.frases.perfeito;
        } else if (score >= total * 0.7) {
            frase = quizConfig.frases.bom;
        } else if (score >= total * 0.4) {
            frase = quizConfig.frases.medio;
        } else {
            frase = quizConfig.frases.baixo;
        }

        result.innerHTML = `
            <strong>Resultado do quiz de ${quizConfig.nome}</strong><br>
            Você acertou ${score} de ${total} perguntas.<br>
            ${frase}
        `;

        result.style.background = score === total
            ? "rgba(39, 201, 103, 0.22)"
            : "rgba(255, 70, 70, 0.22)";

        result.style.border = score === total
            ? "1px solid rgba(39, 201, 103, 0.45)"
            : "1px solid rgba(255, 70, 70, 0.45)";
    }
});