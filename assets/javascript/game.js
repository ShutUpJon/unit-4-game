$(document).ready(function() {

    var character;
    var characterChosen;
    var enemyChosen = false;
    var opponent;
    var defeated = false;

    // Object Declorations for Characters
    var characters = [
    
    thrall = { 
        name: "Thrall, Warchief of the Horde",
        image: "<img src = 'assets/images/thrallAlive.jpg' id = 'thrall'>",
        defendImage: "<img src = 'assets/images/thrallDefeated.jpg'>",
        baseAttack: "5",
        attack: "5",
        health: "50",

    },

    varian = {
        name: "Varian Wrynn, High King of the Alliance",
        image: "<img src = 'assets/images/varianAlive.jpg' id = 'varian'>",
        defendImage: "<img src = 'assets/images/varianDefeated.jpg'>",
        baseAttack: "6",
        attack: "6",
        health: "80",

    },

    garrosh = {
        name: "Garrosh Hellscream",
        image: "<img src = 'assets/images/garroshAlive.png' id = 'garrosh'>",
        defendImage: "<img src = 'assets/images/garroshDefeated.jpg'>",
        baseAttack: "8",
        attack: "8",
        health: "60",

    },

    jaina = {
        name: "Jaina Proudmoore",
        image: "<img src = 'assets/images/jainaAlive.jpeg' id = 'jaina'>",
        defendImage: "<img src = 'assets/images/jainaDefeated.jpeg'>",
        baseAttack: "10",
        attack: "10",
        health: "40",
    }

    ];

    var enemyCount = (characters.length -1);
    console.log(enemyCount);

    //Title Screen
    $('#top').append("<img src = 'assets/images/wowArena.png' class = 'img-responsiveness'>")
    $('#middle').append("<h1>Welcome to Warcraft Arena!</h1>");
    $('#bottom').append("<button type='button' class='btn btn-outline-warning' id='start'>Start Game</button>");
    fadeAllIn();
    console.log(characters);

    //Game Start by clicking on the Start Button
    $('#start').on("click", function() {
        $(document.body).css('background-image', 'url(assets/images/wowArenaBackground.png)')
            playGame();
    });

    //Fade Out
    function fadeAllOut() {
		$('#top').empty();
		$('#middle').empty();
		$('#bottom').empty();
		$('#attackerZone').empty();
		$('#attackButton').empty();
		$('#defenderZone').empty();
		
    };
    
    //Fade In
    function fadeAllIn(){
		$('#top').fadeIn("slow");
		$('#middle').fadeIn("slow");
		$('#bottom').fadeIn("slow");
		$('#attackerZone').fadeIn("slow");
		$('#attackButton').fadeIn("slow");
		$('#defenderZone').fadeIn("slow");
	};


    //Play Game Function
    function playGame() {
        fadeAllOut();
        $('#top').append("<img src = 'assets/images/wowArena.png' class = 'img-responsiveness'>");
        $('#middle').append("<h1>Choose Your Champion</h1");
        $('#bottom').append(thrall.image, varian.image, garrosh.image, jaina.image);
        fadeAllIn();
            $('#bottom').on("click", "img[id = thrall]", function() {
                chooseChar(thrall);

            });
            $('#top').on("click", "img[id = thrall]", function() {
                if(enemyChosen == false) {
                    chooseOpponent(thrall);
                    $('img[id=thrall]').fadeTo("slow", 0.0);
                }
            });
            $('#bottom').on("click", "img[id = varian]", function() {
                chooseChar(varian);
                
            });
            $('#top').on("click", "img[id = varian]", function() {
                if(enemyChosen == false) {
                    chooseOpponent(varian);
                    $('img[id=varian]').fadeTo("slow", 0.0);

                }
            });
            $('#bottom').on("click", "img[id = garrosh]", function() {
                chooseChar(garrosh);

            });
            $('#top').on("click", "img[id = garrosh]", function() {
                if(enemyChosen == false) {
                    chooseOpponent(garrosh);
                    $('img[id=garrosh]').fadeTo("slow", 0.0);

                }
            });
            $('#bottom').on("click", "img[id = jaina]", function() {
                chooseChar(jaina);

            });
            $('#top').on("click", "img[id = jaina]", function() {
                if(enemyChosen == false) {
                    chooseOpponent(jaina);
                    $('img[id=jaina]').fadeTo("slow", 0.0);

                }
            });
            $('#attackButton').on("click", function() {
                if(enemyChosen == true) {
                    attack(character, opponent)
                }
                else if (enemyCount == 0) {
                    winner(character);
                }
            });
    }
    //Choose Character
    function chooseChar(char) {
        characterChosen = true;
        character = char;
        console.log(character);
        fadeAllOut();
        battle(char);
    }

    //Choose Opponent
    function chooseOpponent(char) {
        if (enemyChosen == false) {
			opponent = char; 
			enemyChosen = true; 
			$('#defenderZone').empty(); 
			$('#attackButton').empty();
			$('#defenderZone').append("<div id = 'opponent'>"+char.defendImage+"<br><h4>"+char.name+"<br>Attack Power: "+char.attack+"<br>Health: "+char.health+"</h4></div>");
			$('#defenderZone').fadeTo("slow", 1.0);
            $('#attackButton').append("<button class = 'btn btn-danger attackButton'>Attack!</button>");
            
		}
    }

    //Function to set up Arena
    function battle(char) {
        $('#top').append("<div id = 'enemies'></div");
        $('#middle').append("<div id = 'feedContainer'></div><div id = 'feed'><p>Welcome to the Arena, Champion. Choose an Enemy to Begin!</p></div></div>");
        $("#attackerZone").append("<div id = 'player'>"+char.image+"<br><h4>"+char.name+"<br>Attack Power: "+char.attack+"<br>Health: "+char.health+"</h4></div>");
        for (var x = 0; x < character.length; x++) {
            var enemy = "enemy"+x;
            if (characters[x].name != char.name) {
                $('#enemies').append("<div id ="+enemy+">"+characters[x].image+"</div>");
            }
        }
    fadeAllIn();
    }
    
    //Attack the character that was slected as opponent
    function attack(attacker, defender) {
        if (defender.health > 0 && attacker.health > 0) {
            $('#feed').prepend("<p id = 'attacker'>"+attacker.name+" attacks "+defender.name+" for "+attacker.attack+" damage!</p>");
            defender.health = defender.health - attacker.attack;
            
            $('#feed').prepend("<p id = 'counter'>"+defender.name+" counters "+attacker.name+" for "+defender.attack+" damage!</p>");
            attacker.health = attacker.health - defender.attack; 
            attacker.attack = attacker.attack + attacker.baseAttack;

            $('#feed').prepend("<p id = 'attackGain'>"+attacker.name+" feels the power!! He gains "+attacker.baseAttack+" attack power, bringing him up to "+attacker.attack+" damage!</p>");
        
            $("#attackerZone").html("<div id = 'player'>"+attacker.image+"<br><h4>"+attacker.name+"<br>Attack Power: "+attacker.attack+"<br>Health: "+attacker.health+"</h4></div>");
			$('#defenderZone').html("<div id = 'opponent'>"+defender.image+"<br><h4>"+defender.name+"<br>Attack Power: "+defender.attack+"<br>Health: "+defender.health+"</h4></div>");
			if(defender.health <= 0){
				attack(attacker, defender);
			}
        }
            else if (defender.health <= 0 && attacker.health > 0){
			$('#attackButton').empty();
			$('#defenderZone').fadeTo('slow', 0.0);
			$('#attackButton').append("<button class = 'btn btn-danger dummyButton'>Attack!</button>");
			$('#feed').prepend("<p id = 'defenderDead'>"+attacker.name+" has defeated "+defender.name+"! Please choose a new opponent, "+attacker.name+".");
            $('#attackerZone').animate({left: "+=100px"});
			$('#defenderZone').animate({left: "-=100px"});
			$('#attackerZone').animate({left: "-=100px"});
            $('#defenderZone').animate({left: "+=100px"});
            enemyChosen = false; 
			defender.image = defender.deadImage;
			enemyCount--; 
			if(enemyCount == 0){
				winner(attacker);
			}
		}        
            else if (attacker.health <= 0){
			$('#attackButton').html("<button class = 'btn btn-danger' id = 'reset'>Start a New Game</button>");
			$('#feed').prepend("<p id = 'attackerDead'>"+defender.name+" has defeated "+attacker.name+"! Please click the button to start a new game.");
			loser(attacker);
        }
        // Winner Code
        function winner(char) {
            fadeAllOut();
            $('#top').append("<img src = 'assets/images/wowArena.jpg' class = 'img-responsive'>");
            $('#middle').append("<h1>Congratulations, "+char.name+" you have won the battle!</h1>");
            $('#bottom').append("<button class = 'btn btn-warning' id = 'reset'>Play Again?</button>");
            fadeAllIn();
            $('#reset').on("click", function(){
                    playAgain();
                });
        }
        //Loser Code
        function loser(char) {
            fadeAllOut();
            $('#top').append("<img src = 'assets/images/wowArena.jpg' class = 'img-responsive'>");
            $('#middle').append("<h1>You fough with honor "+char.name+" but, today is not your day!</h1>");
            $('#bottom').append("<button class = 'btn btn-warning' id = 'reset'>Play Again?</button>");
            fadeAllIn();
            $('#reset').on("click", function () {
                    playAgain()
            });
        }
        //Play Again Code
        function playAgain() {
            console.log("Play Again is being pushed");
        
            character = "";
            characterChosen = "";
            enemyChosen = "";
            oppoenent = "";
            defeated = false;
            enemyCount = (characters.length -1);
        
        characters = [

            thrall = { 
                name: "Thrall, Warchief of the Horde",
                image: "<img src = 'assets/images/thrallAlive.jpg' id = 'thrall'>",
                defendImage: "<img src = 'assets/images/thrallDefeated.jpg'>",
                baseAttack: "5",
                attack: "5",
                health: "50",
        
            },
        
            varian = {
                name: "Varian Wrynn, High King of the Alliance",
                image: "<img src = 'assets/images/varianAlive.jpg' id = 'varian'>",
                defendImage: "<img src = 'assets/images/varianDefeated.jpg'>",
                baseAttack: "6",
                attack: "6",
                health: "80",
        
            },
        
            garrosh = {
                name: "Garrosh Hellscream",
                image: "<img src = 'assets/images/garroshAlive.png' id = 'garrosh'>",
                defendImage: "<img src = 'assets/images/garroshDefeated.jpg'>",
                baseAttack: "8",
                attack: "8",
                health: "60",
        
            },
        
            jaina = {
                name: "Jaina Proudmoore",
                image: "<img src = 'assets/images/jainaAlive.jpeg' id = 'jaina'>",
                defendImage: "<img src = 'assets/images/jainaDefeated.jpeg'>",
                baseAttack: "10",
                attack: "10",
                health: "40",
            }


        ];

            fadeAllOut();
            playGame();
        
        }

 
    }
    


   

   



});