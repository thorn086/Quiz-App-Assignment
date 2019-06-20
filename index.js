
// create a STORE
const STORE = [

    {
        question: "Which bone supports the origin of the quadraceps muscle?",
        ans: ["Humerus",
            "Femur",
            "Tibia",
            "Ulna"],
        cor: "Femur"
    },

    {
        question: "What system controls the cells that supply oxygen to the body?",
        ans: ["Endocrine System",
            "Circular System",
            "Neurovascular System",
            "Lymphatic System"],
        cor: "Circular System"
    },

    /*{
        question: "How many bones are in the human body?",
        ans: ["200",
            "186",
            "206",
            "306",],
        cor: "206"
    },

    {
        question: "What muscle helps to flex the elbow joint?",
        ans: ["Hamstring Muscle Group",
            "Triceps Group",
            "Biceps Group",
            "Gluteal Muscle Group"],
        cor: "Biceps Group"
    },

    {
        question: "How many cranial nerves are in the human body?",
        ans: ["12",
            "15",
            "24",
            "36"],
        cor: "24"
    },

    {
        question: "In the Respiratory System, what is the primary role of the lungs?",
        ans: ["Remove CO2 and add O2 to the hemoglobin",
            "Remove CO2 and add H2O to the hemoglobin",
            "Add O2 to the hemoglobin only",
            "Remove H2O, CO2, Add O2 to hemoglobin"],
        cor: "Remove H2O, CO2, Add O2 to hemoglobin"
    },

    {
        question: "Which test is best for detecting an ACL tear?",
        ans: ["Bump Test",
            "Houston's Test",
            "Varus Test",
            "Lockman's"],
        cor: "Lockman's"
    },

    {
        question: "What injury is the more prevalent in Soccer?",
        ans: ["Hamstring Pulls",
            "Ankle Sprains",
            "Concussions",
            "ACL Tears"],
        cor: "Ankle Sprains"
    },

    {
        question: "What joint controls the main weight of the human body?",
        ans: ["Knee Joint",
            "Ankle Joint",
            "Shoulder joint",
            "Hip Joint"],
        cor: "Hip Joint"
    },

    {
        question: "What is the only ligament not in the Knee Joint Capsule?",
        ans: ["Medial Collateral Ligmanet",
            "Lateral Collateral Ligament",
            "Anterior Cruciate Ligament",
            "Posterior Cruciate Ligament"],
        cor: "Lateral Collateral Ligament"
    },*/

];

let humanPart = 0;
let score = 0;

// Question Format
function createForm() {
    if (humanPart < STORE.length) {
        return `<div class ="questionForm-${humanPart}">
            <h2>${STORE[humanPart].question}</h2>
            <form>
                <fieldset>
                    <label class="choices">
                        <input type="radio" value='${STORE[humanPart].ans[0]}' name="answer" required></input>
                        <span>${STORE[humanPart].ans[0]}</span>
                    </label>
                    <label class="choices">
                        <input type="radio" value="${STORE[humanPart].ans[1]}" name="answer" required></input>
                        <span>${STORE[humanPart].ans[1]}</span>
                    </label>
                    <label class="choices">
                        <input type="radio" value="${STORE[humanPart].ans[2]}" name="answer" required></input>
                        <span>${STORE[humanPart].ans[2]}</span>
                    </label>
                    <label class="choices">
                        <input type="radio" value="${STORE[humanPart].ans[3]}" name="answer" required></input>
                        <span>${STORE[humanPart].ans[3]}</span>
                    </label>
                    <button type="submit" class ="submitButton">Enter</button>
                </fieldset>
            </form>
        </div>`;
    } else {
        results();
    };

}


// select next question
function questionNum() {
    humanPart++;
    $('.humanPart').text(humanPart + 1);
}
// increase the score
function scoreIncrease() {
    score++;
}

// handle start button
function handleStartButton() {
    $('.body-parts').on('click', '.startQuiz', function (event) {
        $('.body-parts').css('display', 'none');
        $('.anatomyForm').css('display', 'block');
        $('.humanPart').text(1);
    });
}

// render question
function displayQuestion() {
    $('.anatomyForm').html(createForm());
}

//handle submit button
function handleSubmitButton() {
    $('form').on('submit', function (event) {
        event.preventDefault();
        let selected = $('input:checked');
        let choice = selected.val();
        let rightAnswer = `${STORE[humanPart].cor}`;
        if (choice === rightAnswer) {
            selected.parent().addClass('right');
            correctAnswer();
        } else {
            selected.parent().addClass('wrong');
            wrongAnswer();
        }
    });
}
function correctAnswer() {
    correctAnswerFeedback();
    addToScore();
}

function wrongAnswer() {
    wrongAnswerFeedback();
}

// feedback if answer is correct
function correctAnswerFeedback() {
    let correct = `${STORE[humanPart].cor}`;
    $('.anatomyForm').html(`<div class ="answerCorrect"><div id ="correct"><img src="pics/correct.jpeg" alt="correct image"/></div><p><b>You saved the Patient!</b></p><button class ="next">Next</button></div>`);
}
// feedback if answer is wrong
function wrongAnswerFeedback() {
    let correct = `${STORE[humanPart].cor}`;
    $('.anatomyForm').html(`<div class ="answerCorrect">
    <div id ="wrong"><img src="pics/wrong.jpeg" alt="wrong image"/></div><p><b>Careful, you're losing Patients!</b></p><button class ="next">Next</button></div>`);
}

function handleNextQuestion() {
    $('main').on('click', '.next', function (event) {
        questionNum();
        displayQuestion();
        handleSubmitButton();
    });
}

function addToScore() {
    scoreIncrease();
    $('.score').text(score);
}


//Are you as good as a Doctor Function
function results() {
    if (score > 8) {
        $('.anatomyForm').html(`<div class ="result totalcorrect"><h3>You are a top earner for the hospital and well on your way to running it!</h3><p>You saved ${score}/10 
       lives today!</p><p> A promotion is in order.</p><button class="restartQuiz">Retake Quiz</button></div>`);
        restartQuiz();
        $('.humanPart').text(10);
    } else if (score < 8 && score >= 5) {
        $('.anatomyForm').html(`<div class ="result totalcorrect"><h3>You are being watched by HR, better brush up on your knowledge!</h3><p>You saved ${score}/10 
        lives today!</p><p> You're being auditied by HR to see if your a good fit.</p><button class="restartQuiz">Retake Quiz</button></div>`);
        restartQuiz();
        $('.humanPart').text(10);
    }
    else {
        $('.anatomyForm').html(`<div class ="result totalcorrect"><h3>You are being summoned by HR!</h3><p>You saved ${score}/10 
        lives today!</p><p> The lawsuits are to high, go back to school and learn more about the human body and try again.</p><button class="restartQuiz">Retake Quiz</button></div>`);
        restartQuiz();
        $('.humanPart').text(10);
    }
}


//handle restart button
function restartQuiz() {
    $('main').on('click', '.restartQuiz', function (event) {
        humanPart = 0;
        $('.humanPart').text(1);
        score = 0;
        $('.score').text(0);
        $('.body-parts').css('display', 'block');
        $('.anatomyForm').css('display', 'none'); 
        doThisNext();
    });
    
}
function doThisNext(){
    handleStartButton();
    displayQuestion();
    handleSubmitButton();

}
// create one function to do it all
function doesItAll() {
    handleStartButton();
    displayQuestion();
    handleSubmitButton();
    handleNextQuestion();
    restartQuiz();
}

 $(doesItAll());


