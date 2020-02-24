$(function() {


    // Select all elements

    const start = document.getElementById("start");
    const quiz = document.getElementById("quiz");
    const question = document.getElementById("question");
    const qImg = document.getElementById("qImg");
    const choiceA = document.getElementById("A");
    const choiceB = document.getElementById("B");
    const choiceC = document.getElementById("C");
    const counter = document.getElementById("counter");
    const timeGauge = document.getElementById("timeGauge");
    const progress = document.getElementById("progress");
    const scoreDiv = document.getElementById("scoreContainer");


    //create our questions

    let questions = [

        {
            question: "What does HTML stand for?",
            imgSrc: "img/html.png",
            choiceA: "Correct",
            choiceB: "Wrong",
            choiceC: "Wrong",
            correct: "Correct"
        }, {
            question: "What does CSS stand for?",
            imgSrc: "img/css.png",
            choiceA: "Wrong",
            choiceB: "Correct",
            choiceC: "Wrong",
            correct: "Correct"
        }, {
            question: "What does JS stand for?",
            imgSrc: "img/js.png",
            choiceA: "Wrong",
            choiceB: "Wrong",
            choiceC: "Correct",
            correct: "Correct"
        },

    ]

    // create some variables

    const lastQuestion = questions.length - 1
    let runningQuestion = 0;
    let count = 0;
    const questionTime = 10; //10 seconds
    const gaugeWidth = 150; //150 px
    const gaugeUnit = gaugeWidth / questionTime;
    let TIMER;
    let scoreQ = 0;

    //render a question
    function renderQuestion() {
        let q = questions[runningQuestion];
        question.innerHTML = "<p>" + q.question + "</p>";
        qImg.innerHTML = "<img src=" + q.imgSrc + ">";
        choiceA.innerHTML = q.choiceA;
        choiceB.innerHTML = q.choiceB;
        choiceC.innerHTML = q.choiceC;
    }



    start.addEventListener("click", startQuiz);

    //start quiz
    function startQuiz() {
        start.style.display = "none";
        renderQuestion();
        quiz.style.display = "block";
        renderProgress();
        renderCounter();
        TIMER = setInterval(renderCounter, 1000)
    }

    // render progress
    function renderProgress() {
        for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
            progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
        }
    }

    //counter render


    function renderCounter() {
        if (count <= questionTime) {
            counter.innerHTML = count;
            timeGauge.style.width = count * gaugeUnit + 'px';
            count++
        } else {
            count = 0;
            if (runningQuestion < lastQuestion) {
                answerIsWrong();
                runningQuestion++;

                renderQuestion();

            } else {
                // end the quiz and show score to user
                clearInterval(TIMER);
                scoreRender()
            }
        }

    }



    //check answer
    choiceA.addEventListener('click', checkAnswer)
    choiceB.addEventListener('click', checkAnswer)
    choiceC.addEventListener('click', checkAnswer)

    function checkAnswer(evt) {

        let answer = evt.target.innerText;
        if (answer == questions[runningQuestion].correct) {
            //answer is correct
            scoreQ++;
            //change progress color to green
            answerIsCorrect();
        } else {
            //answer is wrong
            //change progress color to red
            answerIsWrong();
        }
        count = 0;
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {

            // end the quiz and show score to user
            clearInterval(TIMER);
            scoreRender()
        }
    }


    //answer is correct
    function answerIsCorrect() {
        document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
    }

    //answer is wrong 
    function answerIsWrong() {
        document.getElementById(runningQuestion).style.backgroundColor = "#f00";
    }


    //score render
    function scoreRender() {
        scoreDiv.style.display = "block";

        //calculate the amount of question percent answered by user
        const scorePerCent = Math.round(100 * scoreQ / questions.length);

        //choose the image based on the scorePerCent
        let img = (scorePerCent >= 80) ? "img/5.png" :
            (scorePerCent >= 60) ? "img/4.png" :
            (scorePerCent >= 40) ? "img/3.png" :
            (scorePerCent >= 20) ? "img/2.png" :
            "img/1.png";
        scoreDiv.innerHTML = "<img src=" + img + ">";
        scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>"
    }

})