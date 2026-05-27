const quizData = [
    {
        question: "Qual é uma das principais funções da Engenharia?",
        options: [
            "Criar soluções técnicas para problemas reais",
            "Apenas decorar fórmulas matemáticas",
            "Trabalhar somente com alimentação",
            "Atuar apenas em hospitais"
        ],
        correct: 0
    },
    {
        question: "Qual disciplina costuma ser muito importante na formação de um engenheiro?",
        options: ["História da arte", "Cálculo e física", "Culinária", "Literatura infantil"],
        correct: 1
    },
    {
        question: "A Engenharia Civil está mais relacionada a:",
        options: ["Construções e infraestrutura", "Treinamento esportivo", "Dietas alimentares", "Atendimento médico"],
        correct: 0
    },
    {
        question: "Qual característica é essencial para um engenheiro?",
        options: ["Falta de planejamento", "Raciocínio lógico", "Evitar testes", "Ignorar segurança"],
        correct: 1
    },
    {
        question: "No dia a dia, a Engenharia aparece em:",
        options: ["Pontes, prédios, máquinas e sistemas", "Somente em academias", "Apenas em receitas", "Somente em consultas médicas"],
        correct: 0
    }
];

const resultMessages = {
    perfeito: "Excelente! Você mostrou domínio sobre Engenharia e sua importância na criação de soluções.",
    bom: "Muito bom! Você entende bem o papel da Engenharia no mundo real.",
    medio: "Você foi razoável. Revise melhor as áreas e aplicações da Engenharia.",
    baixo: "Continue estudando! Engenharia exige lógica, planejamento e atenção aos detalhes."
};