$(function() {

    const startButton = document.getElementById('start-btn')
    const nextButton = document.getElementById('next-btn')
    const questionContainerElement = document.getElementById('question-container')

    let shuffledQuestions, currentQuestionIndex

    const questionElement = document.getElementById('question')
    const answerButtonElement = document.getElementById('answer-button')
    const resultsBlock = document.getElementById('results')
    let questionAnswered = false


    clearSessionStorage();
    startButton.addEventListener('click', startGame)
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++
        setNextQuestion()
    })

    function startGame() {
        startButton.classList.add('hide');
        shuffledQuestions = questions.sort(() => Math.random() - .5)
        currentQuestionIndex = 0;
        questionContainerElement.classList.remove('hide');
        setNextQuestion()
        setDefaultSessionValues()
        resultsBlock.classList.remove("hide")
        resultsBlock.classList.add("results")
        setResultsBlockValue();
    }



    function setNextQuestion() {
        resetState()
        showQuestion(shuffledQuestions[currentQuestionIndex])
    }

    function showQuestion(question) {
        questionElement.innerText = question.question
        question.answers.forEach(answer => {
            const button = document.createElement('button')
            button.innerText = answer.text
            button.classList.add('btn')
            if (answer.correct) {
                button.dataset.correct = answer.correct
            }
            button.addEventListener('click', selectAnswer)
            answerButtonElement.appendChild(button)
        })

    }

    function resetState() {
        clearStatusClass(document.body)
        nextButton.classList.add('hide')
        startButton.classList.add('hide')
        while (answerButtonElement.firstChild) {
            answerButtonElement.removeChild(answerButtonElement.firstChild)
        }
        questionAnswered = false
    }

    function selectAnswer(e) {
        if (questionAnswered) {

        } else {
            questionAnswered = true;
            const selectedButton = e.target
            const correct = selectedButton.dataset.correct
            if (correct) {
                window.sessionStorage.setItem("correctAnswered", parseInt(window.sessionStorage.getItem("correctAnswered")) + 1)
                window.sessionStorage.setItem("totalAnswered", parseInt(window.sessionStorage.getItem("totalAnswered")) + 1)
            } else {
                window.sessionStorage.setItem("wrongAnswered", parseInt(window.sessionStorage.getItem("wrongAnswered")) + 1)
                window.sessionStorage.setItem("totalAnswered", parseInt(window.sessionStorage.getItem("totalAnswered")) + 1)
            }
            setStatusClass(document.body, correct)
            Array.from(answerButtonElement.children).forEach(button => {
                setStatusClass(button, button.dataset.correct)
            })
            if (shuffledQuestions.length > currentQuestionIndex + 1) {
                nextButton.classList.remove('hide')
            }
            startButton.innerText = 'Restart Quiz'
            startButton.classList.remove('hide')
            setResultsBlockValue();

        }

    }

    function setStatusClass(element, correct) {
        clearStatusClass(element)

        if (correct) {
            element.classList.add('correct')

        } else {
            element.classList.add('wrong')
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct')
        element.classList.remove('wrong')
    }

    function setSessionStorageValue(key, value) {

        window.sessionStorage.setItem(key, parseInt(window.sessionStorage.getItem(key)) + 1)

    }

    function clearSessionStorage() {
        window.sessionStorage.clear();
    }

    function setDefaultSessionValues() {
        window.sessionStorage.setItem('correctAnswered', '0');
        window.sessionStorage.setItem('wrongAnswered', '0');
        window.sessionStorage.setItem('totalAnswered', '0');
    }

    function setResultsBlockValue() {
        Object.keys(window.sessionStorage).forEach(function(keyp) {
            document.getElementById(keyp).textContent = window.sessionStorage.getItem(keyp)
        })

        if (sessionStorage.getItem("correctAnswered") == sessionStorage.getItem("wrongAnswered")) {
            document.getElementById("results").style.backgroundColor = "lightgray"
        } else if (parseInt(sessionStorage.getItem("correctAnswered")) > parseInt(sessionStorage.getItem("wrongAnswered"))) {
            document.getElementById("results").style.backgroundColor = "lightgreen"
        } else {
            document.getElementById("results").style.backgroundColor = "lightcoral"
        }
    }
    const questions = [{

            question: 'what is 2 + 2',
            answers: [
                { text: '4', correct: true },
                { text: '22', correct: false },
                { text: '2', correct: false },
                { text: '42', correct: false }
            ]
        },
        {

            question: 'what is 11 + 11',
            answers: [
                { text: '4', correct: false },
                { text: '22', correct: true },
                { text: '2', correct: false },
                { text: '42', correct: false }
            ]
        },
        {

            question: 'what is 1 + 1',
            answers: [
                { text: '4', correct: false },
                { text: '22', correct: false },
                { text: '2', correct: true },
                { text: '42', correct: false }
            ]
        }
    ]


});