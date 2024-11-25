const questions = [
    {
        question: "Qual é a característica de uma senha forte?",
        answers: [
            "Usar apenas o nome do usuário",
            "Ter pelo menos 12 caracteres e incluir letras, números e símbolos",
            "Usar apenas letras",
            "Não usar números"
        ],
        correctAnswer: 1,
        explanation: "Uma senha forte deve ser longa (pelo menos 12 caracteres) e incluir uma combinação de letras maiúsculas e minúsculas, números e símbolos para dificultar a quebra por ataques de força bruta."
    },
    {
        question: "O que é autenticação de dois fatores?",
        answers: [
            "Uma senha longa e complexa",
            "Uma segunda camada de segurança que exige algo que você sabe e algo que você tem",
            "A configuração do seu navegador",
            "Nenhuma das alternativas"
        ],
        correctAnswer: 1,
        explanation: "A autenticação de dois fatores (2FA) adiciona uma camada extra de segurança, exigindo que você forneça algo que você sabe (senha) e algo que você tem (como um código enviado ao seu celular)."
    },
    {
        question: "Como você pode se proteger ao usar redes Wi-Fi públicas?",
        answers: [
            "Sempre usar a rede sem senha",
            "Evitar acessar informações confidenciais e usar uma VPN",
            "Desconectar-se automaticamente de qualquer rede",
            "Nenhuma das alternativas"
        ],
        correctAnswer: 1,
        explanation: "Redes Wi-Fi públicas são vulneráveis. Usar uma VPN (Rede Privada Virtual) criptografa seu tráfego, protegendo suas informações contra possíveis interceptações."
    },
    {
        question: "Por que é importante manter o software atualizado?",
        answers: [
            "Porque as atualizações aumentam a velocidade do computador",
            "Porque elas corrigem falhas de segurança e melhoram o desempenho",
            "Porque as atualizações tornam o computador mais bonito",
            "Porque as atualizações são obrigatórias"
        ],
        correctAnswer: 1,
        explanation: "As atualizações de software frequentemente corrigem falhas de segurança que podem ser exploradas por hackers. Além disso, elas podem melhorar o desempenho e adicionar novos recursos."
    },
    {
        question: "Como você pode se proteger contra malware?",
        answers: [
            "Evitar clicar em links de fontes desconhecidas e usar um antivírus",
            "Desativar o firewall do computador",
            "Baixar arquivos apenas de sites de confiança",
            "Apenas usar redes sociais"
        ],
        correctAnswer: 0,
        explanation: "Evitar clicar em links suspeitos e manter um antivírus atualizado são maneiras importantes de se proteger contra vírus, worms e outros tipos de malware."
    },
    {
        question: "O que é navegação anônima?",
        answers: [
            "Usar uma VPN para ocultar sua identidade online",
            "Navegar sem abrir uma conta em sites",
            "Usar a internet sem usar senhas",
            "Nenhuma das alternativas"
        ],
        correctAnswer: 0,
        explanation: "A navegação anônima envolve o uso de uma VPN ou de ferramentas como o Tor para ocultar sua localização e identidade enquanto navega pela internet."
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

function displayQuestion() {
    const questionContainer = document.getElementById('question');
    const answersContainer = document.getElementById('answers');
    const question = questions[currentQuestion];

    questionContainer.innerText = question.question;
    answersContainer.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const li = document.createElement('li');
        li.textContent = answer;
        li.onclick = () => checkAnswer(index);
        answersContainer.appendChild(li);
    });
}

function checkAnswer(selectedAnswer) {
    const question = questions[currentQuestion];
    const answerElements = document.querySelectorAll('#answers li');
    const feedbackContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result');

    // Registrar a resposta do usuário
    userAnswers.push({
        question: question.question,
        selectedAnswer: selectedAnswer,
        correctAnswer: question.correctAnswer
    });

    // Exibir feedback para cada resposta
    if (selectedAnswer === question.correctAnswer) {
        score++;
        answerElements[selectedAnswer].style.backgroundColor = '#4CAF50'; // Verde para acerto
    } else {
        answerElements[selectedAnswer].style.backgroundColor = '#F44336'; // Vermelho para erro
        answerElements[question.correctAnswer].style.backgroundColor = '#4CAF50'; // Verde para a resposta certa
    }

    // Exibir a explicação da resposta
    setTimeout(() => {
        resultText.innerHTML = `
            <p><strong>${selectedAnswer === question.correctAnswer ? 'Correto!' : 'Errado!'}</strong></p>
            <p>${question.explanation}</p>
        `;

        // Avançar para a próxima pergunta após 2 segundos
        setTimeout(() => {
            currentQuestion++;

            if (currentQuestion < questions.length) {
                displayQuestion();
                feedbackContainer.style.display = 'none';
            } else {
                showResult();
            }
        }, 2000);
    }, 1000);
}

function showResult() {
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result');
    const summaryContainer = document.createElement('div');

    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    resultText.innerText = `Parabéns, você acertou ${score} de ${questions.length} questões!`;

    // Exibir todas as perguntas com as respostas do usuário
    userAnswers.forEach((userAnswer, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question-summary');

        const isCorrect = userAnswer.selectedAnswer === userAnswer.correctAnswer;
        questionElement.innerHTML = `
            <h4>${index + 1}. ${userAnswer.question}</h4>
            <p><strong>Você respondeu:</strong> ${questions[index].answers[userAnswer.selectedAnswer]}</p>
            <p><strong>Resposta correta:</strong> ${questions[index].answers[userAnswer.correctAnswer]}</p>
            <p><strong>Explicação:</strong> ${questions[index].explanation}</p>
        `;
        summaryContainer.appendChild(questionElement);
    });

    resultContainer.appendChild(summaryContainer);

    document.getElementById('restart-btn').onclick = () => location.reload();
}

// Inicializar o quiz
displayQuestion();
