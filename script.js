document.addEventListener("DOMContentLoaded", function(event) {


    function getHistory() {
        return document.getElementById("history-value").innerText; //innerHTML or textContent

    }

    function printHistory(num) {
        document.getElementById('history-value').textContent = num;
    }



    function getOutput() {
        return document.getElementById("output-value").textContent;
    }


    function printOutput(num) {
        if (num == '') {
            document.getElementById("output-value").textContent = num;
        } else {
            document.getElementById('output-value').textContent = getFormattedNumber(num);
        }
    }

    function getFormattedNumber(num) {
        if (num == '-') {
            return '';
        }
        var n = Number(num);
        var value = n.toLocaleString("en");
        return value;
    }


    function reverseNumberFormat(num) {
        return Number(num.replace(/,/g, ""));
    }


    var operator = document.getElementsByClassName("operator");
    for (var i = 0; i < operator.length; i++) {
        operator[i].addEventListener('click', function() {
            if (this.id == 'clear') {
                printHistory("");
                printOutput("");
            } else if (this.id == "backspace") {
                var output = reverseNumberFormat(getOutput()).toString();
                if (output) { // if output has a value
                    output = output.substr(0, output.length - 1);
                    printOutput(output);
                }
            } else {
                var history = getHistory();
                var output = getOutput();
                if (output == "" && history != '') {
                    if (isNaN(history[history.length - 1])) {
                        history = history.substr(0, history.length - 1);
                    }
                }
                if (output != "" || history != "") {
                    output = output == "" ? '' : reverseNumberFormat(output);
                    // output = reverseNumberFormat(output);
                    history = history + output;
                    if (this.id == "=") {


                        var result = eval(history);
                        printOutput(result);
                        printHistory("");
                    } else {
                        history = history + this.id;
                        printHistory(history);
                        printOutput("");
                    }
                }
            }
        })
    }

    var microphone = document.getElementById('microphone');
    microphone.onclick = function() {
        microphone.classList.add("record");
        var recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition ||
            window.mozSpeechRecognition || window.msSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.start();
        operations = {
            "plus": "+",
            "minus": "-",
            "multiply": "*",
            "multiplied": "*",
            "divide": "/",
            "divided": "/",
            "reminder": "%"
        }

        recognition.onresult = function(event) {
            var input = event.results[0][0].transcript;
            for (property in operations) {
                input = input.replace(property, operations[property]);
            }
            document.getElementById("output-value").innerText = input;
            setTimeout(function() {
                var x = eval(input);
                printOutput(x);
            }, 2000)
            microphone.classList.remove("record");
        }
    }
    var number = document.getElementsByClassName("number");
    for (var i = 0; i < number.length; i++) {
        number[i].addEventListener('click', function() {
            var output = reverseNumberFormat(getOutput());
            if (output != NaN) { // if output is a number
                output = output + this.textContent;
                printOutput(output);
            }
        })
    }


















});