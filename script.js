const questions = [
    { question: "מי קיבל את התורה מסיני?", answers: ["משה", "אברהם", "יהושע", "הלל"], correct: "משה" },
    { question: "כמה נביאים וחכמים היו בכנסת הגדולה?", answers: ["80", "100", "120", "150"], correct: "120" },
    { question: "מהי אחת מתקנות אנשי כנסת הגדולה?", answers: ["כתיבת התלמוד", "נוסח תפילת שמונה עשרה", "בניית בית שני", "חלוקת התנ\"ך"], correct: "נוסח תפילת שמונה עשרה" },
    { question: "מי ערך את המשנה?", answers: ["רבי עקיבא", "רבן גמליאל", "רבי יהודה הנשיא", "רבי יוחנן בן זכאי"], correct: "רבי יהודה הנשיא" },
    { question: "מה כולל התלמוד?", answers: ["רק פירוש למשנה", "פסקי דין ומנהגים", "אגדות ודרשות", "כל התשובות נכונות"], correct: "כל התשובות נכונות" },
    { question: "מהו ספר הפסיקה של הרמב\"ם?", answers: ["שולחן ערוך", "משנה תורה", "ספרי", "ברייתא"], correct: "משנה תורה" },
    { question: "איזה ספר הוא חלק מספרות השו\"ת?", answers: ["אגרות משה", "משנה תורה", "ספרי", "ספרא"], correct: "אגרות משה" },
    { question: "מהו מכון צומת?", answers: ["מכון מדעי טכנולוגי להלכה", "בית מדרש לישיבות", "ארגון צדקה", "מכון למחקרי תלמוד"], correct: "מכון צומת" },
    { question: "איזה מאגר מידע תורני כולל עשרות אלפי ספרים?", answers: ["פרויקט השו\"ת", "מדרש רבה", "סדר קדשים", "תוספתא"], correct: "פרויקט השו\"ת" }
];

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreElement = document.getElementById("score-value");
const feedbackElement = document.getElementById("feedback");

function startGame() {
    score = 0;
    scoreElement.innerText = score;
    shuffledQuestions = shuffleArray([...questions]); // ערבוב שאלות
    currentQuestionIndex = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    let shuffledAnswers = shuffleArray([...question.answers]); // ערבוב תשובות
    shuffledAnswers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(answer, question.correct));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    feedbackElement.innerText = "";
    feedbackElement.className = "";
}

function selectAnswer(selected, correct) {
    if (selected === correct) {
        score++;
        scoreElement.innerText = score;
        showFeedback("✔", "correct");
    } else {
        showFeedback("❌", "wrong");
    }
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < shuffledQuestions.length) {
            setNextQuestion();
        } else {
            alert("החידון הסתיים! קיבלת " + score + " נקודות.");
            startGame();
        }
    }, 1000);
}

function showFeedback(symbol, className) {
    feedbackElement.innerText = symbol;
    feedbackElement.className = className;
}

// פונקציה לערבוב מערך
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

startGame();
