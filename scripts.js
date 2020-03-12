const DATA = [ 

    { 
        question: `What is the name of Lord Eddard Stark's sword?`, 
        answers: ['Oathkeeper', `Widow's Wail`, 'Ice', 'Longclaw'], 
        correctAnswer: 'Ice', 
    }, 
    
    { 
        question: 'Which of these are the words of House Lannister?', 
        answers: [`'A Lannister Always Pays his Debts'`, `'Hear Me Roar'`, `'Family, Duty, Honor'`, `'Ours is the Fury'`], 
        correctAnswer: `'Hear Me Roar'`, 
    }, 
    
    { 
        question: `Which of these is NOT the name of one of the Stark children's direwolves?`, 
        answers: ['Shaggydog', 'Ghost', 'Grey Wind', 'Ser Pounce'], 
        correctAnswer: 'Ser Pounce', 
    }, 
    
    { 
        question: `What is the name of the dragon that is resurrected by the Night King?`, 
        answers: ['Viserion', 'Drogon', 'Rhaegal', 'Viserys'], 
        correctAnswer: 'Viserion', 
    }, 
    
    { 
        question: 'What gemstone is the island of Tarth famous for?', 
        answers: ['Rubies', 'Sapphires', 'Diamonds', 'Emeralds'], 
        correctAnswer: 'Sapphires', 
    }, 
    
    { 
        question: `Jaqen H'ghar is a member of which group?`, 
        answers: [`The Night's Watch`, 'The Golden Company', 'The Faceless Men', 'The Iron Bank'], 
        correctAnswer: 'The Faceless Men', 
    }, 
    
    { 
        question: 'What do we say to the God of Death?', 
        answers: ['Winter is Coming', 'Not Today', 'The Night is Dark and Full of Terrors', 'You Win or You Die'], 
        correctAnswer: 'Not Today', 
    }, 
    
    { 
        question: 'Which dragon forged the Iron Throne?', 
        answers: ['Balerion', 'Drogon', 'Vermithrax', 'Smaug'], 
        correctAnswer: 'Balerion', 
    }, 
    
    { 
        question: `What is the Hound's first name?`, 
        answers: ['Gregor', 'Berric', 'Qhorin', 'Sandor'], 
        correctAnswer: 'Sandor', 
    }, 
    
    { 
        question: `What is Jon Snow's true name?`, 
        answers: ['Aemon Targaryen', 'Aegon Targaryen', 'Jon Stark', 'Jon Targaryen'], 
        correctAnswer: 'Aegon Targaryen', 
    }, 
    
    ];


var questionNum = 0;
var score = 0;


//when start button is clicked, remove starting
//content

function quizStart(){
    $('.startButton').on('click', 'button.start', function(event){
        $(this).parent().parent('.startContent').remove();
        changeQuestionNum();
        renderQuestion();
        
    })
}

//increments question number by 1
function changeQuestionNum(){
    if(questionNum != 10) {
    questionNum++
    $('.questionNum').text(questionNum);
    }
}

//increments score by 1
function changeScore(){
    score++
    $('.scoreNum').text(score);
}

// generates question HTML to insert into DOM
function generateQuestion(){

 return `<form class="questionForm" ><legend class="question">Question ${questionNum}: ${DATA[questionNum-1].question}</legend>
        
 <label class="radioInput">
    
        <input type="radio" class="radioInput" name="answer" value="${DATA[questionNum-1].answers[0]}" required>
        <div class="answer"> 
        ${DATA[questionNum-1].answers[0]}
        </div>
</label>

 <label>
    
        <input type="radio"   name="answer" value="${DATA[questionNum-1].answers[1]}" required>
        <div class="answer">
        ${DATA[questionNum-1].answers[1]}
        </div>
</label>

<label>
    
        <input type="radio" class="radioInput"  name="answer" value="${DATA[questionNum-1].answers[2]}" required>
        <div class="answer">
        ${DATA[questionNum-1].answers[2]}
        </div>
</label>

<label>
    
        <input type="radio" class="radioInput"  name="answer" value="${DATA[questionNum-1].answers[3]}" required>
        <div class="answer">
        ${DATA[questionNum-1].answers[3]}
        </div>
</label>

<div class="submitButton">
<input type="submit" value="Submit" class='submit'>
</div>

</form>`       
}

//inserts question into DOM
function renderQuestion(){
   
        $('.questionContainer').html(generateQuestion()); 
    
}

// determines if submitted answer is correct
function readAnswer(){
    $(document).on('submit', function(event){
        event.preventDefault();
        let userAnswer = $('input:checked').val();
        if (userAnswer === DATA[questionNum-1].correctAnswer){
            changeScore();
            $('.questionContainer').html(generateCorrectFeedback());
        }
        else{
            
            $('.questionContainer').html(generateWrongFeedback());
        }
        
    })
}



//generates feedback for correct answer
function generateCorrectFeedback(){
    return `<h1 class="question">Question ${questionNum}: ${DATA[questionNum-1].question}</h1>
    
    <div class="feedback">
        <h2>"Knowledge is power."</h2>
        <img class="feedbackImage" src="resources/large53596d69806c0@2x.jpg" alt="picture of Littlefinger from Game of Thrones">
        <h2>Excellent job, you got it right.</h2>
        <div class="nextButton">
            <button type="button" class="next ">Next</button>
        </div>
    </div>`

  
    
}

//generates feedback for wrong answer
function generateWrongFeedback(){
    return `<h1 class="question">Question ${questionNum}: ${DATA[questionNum-1].question}</h1>
    
    <div class="feedback">
        <h2>"You know nothing."</h2>
        <img class="feedbackImage" src="resources/Ygritte-Wildling-Virsa6R5R-b.jpg" alt="picture of Ygritte from Game of Thrones">
        <h2>Incorrect. The correct answer is "${DATA[questionNum-1].correctAnswer}."</h2>
        <div class="nextButton">
            <button type="button" class="next ">Next</button>
        </div>
    </div>`
}

//moves from feedback screen to next question
function nextQuestion(){
    $(document).on('click', 'button.next', function(event){
        if (questionNum < 10){
        changeQuestionNum();
        renderQuestion();
        }
        
        else{
            determineFinal();
        }
    })

    }

//generates the good final score screen
function generateFinalScreenGood(){
    
    return `
    
    <div class="finalScore">
        <h2>Final Score: ${score}/10 </h2>
        <img class ="finalImage" src="resources/SEI_57275339.jpg" alt="The Iron Thrones from Game of Thrones">
        <h2>Congratulations! Long May you Reign!</h2>
        <div class="restartButton">
            <button type="button" class="replay">Replay</button>
        </div>
    </div>`

}

//generate the bad final screen
function badFinalScreen(){
return `<div class="finalScore">
<h2>Final Score: ${score}/10 </h2>
<img class ="finalImage" src="resources/25f6ec1c-c818-453b-a98d-ce03b6008520.png" alt="Wounded Jon Snow from Game of Thrones">
<h2>Not Terrible, But Not Quite. Get Resurrected and Try Again.</h2>
<div class="restartButton">
    <button type="button" class="replay">Replay</button>
</div>
</div>`

}

//generate really bad final screen
function reallyBadFinalScreen(){
    return `<div class="finalScore">
    <h2>Final Score: ${score}/10 </h2>
    <img class ="finalImage" src="resources/https___hypebeast.com_image_2019_05_game-of-thrones-season-8-episodes-4-and-5-worst-rated-viewings-1.jpg" alt="Upset-Looking Daenerys Targaryen from Game of Thrones">
    <h2>Poor Attempt. Consider Studying at the Citadel.</h2>
    <div class="restartButton">
        <button type="button" class="replay">Replay</button>
    </div>
    </div>`
}

//determines which final screen is needed
function determineFinal(){
    $('.questionNum').text(10);
    
    if(score < 6) {
        $('.questionContainer').html(reallyBadFinalScreen());
    }
    else if (score >= 6 && score < 8){
        $('.questionContainer').html(badFinalScreen());
    }
    else if (score > 7){
        $('.questionContainer').html(generateFinalScreenGood())
    }
}

//lets user restart quiz
function restartQuiz(){
    $(document).on('click', 'button.replay', function(event){
        location.reload();

    })
}


//initiates functions
function runQuiz(){
    quizStart();
    readAnswer();
    nextQuestion();
    restartQuiz();
};

$(runQuiz);




