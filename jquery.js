
var playing = false;
var score;
var livesleft;
var step;
var action; // Used to set interval
var fruits = ['banana', 'cherries', 'grapes', 'orange', 'peach', 'pear', 'pineapple', 'strawberry', 'watermelon'];

$(function(){

    // Press Play button

    $("#startreset").on("click", function(){

        if(playing == true){    // Are we already playing? YES, reset game

            location.reload();       
        }
        else{   // Are we already playing? NO, start game

            playing = true;

            score = 0;  //Score resets to 0
            $("#scorevalue").html(score);

            $("#livesleft").show(); //Lives appear

            livesleft = 3;

            $("#gameover").hide();  //Hide game over box

            addHearts();

            $("#startreset").html("Reset Game");    //Change button content when we start playing

            createFruits();
        }
    });


    $("#fruit1").on("mouseover", function(){

        score++;

        $("#scorevalue").html(score);

        $("#slicesound")[0].play(); // The selector returns an array. Select array position and play sound

        clearInterval(action);   // Stop sliced fruit

        $("#fruit1").hide("explode", 500)   // Hide fruit with animation

        setTimeout(createFruits, 500);
  
    });

});


function addHearts(){

    $("#livesleft").empty();

    for(i = 0; i < livesleft; i++){
        $("#livesleft").append("<img src='images/heart.png' class='heart'>");
    }

}

function createFruits(){
    $("#fruit1").show();

    chooseFruit();

    $("#fruit1").css({'left' : Math.round(550 * Math.random()), 'top' : -50}); // Place the fruits in random top positions

    step = 1 + Math.round(5 * Math.random());

    action = setInterval(function(){

        // Check the top position of the fruit and add a random pixel between 1 and 6
        $("#fruit1").css('top', $("#fruit1").position().top + step);

        // Check if the fruit has disappeared from the container
        if($("#fruit1").position().top > $("#fruitsContainer").height()){

            if(livesleft > 1){
                // Generate another fruit
                $("#fruit1").show();

                chooseFruit();
            
                $("#fruit1").css({'left' : Math.round(550 * Math.random()), 'top' : -50}); 
            
                step = 1 + Math.round(5 * Math.random());

                livesleft--;    // Reduce lives by 1
                addHearts();

            }else{  // Game over

                playing = false;

                $("#startreset").html("Start Game");

                $("#gameover").show();

                $("#scoreover").html(score);

                $("#livesleft").hide();

                stopAction();

            }

        }

    }, 10)
}

function chooseFruit(){ // Chooses a random image from the images folder

    $("#fruit1").attr("src", "images/" + fruits[Math.round(8 * Math.random())] + ".png");

}

function stopAction(){  // Stops dropping fruits

    clearInterval(action);
    $("#fruit1").hide();

}