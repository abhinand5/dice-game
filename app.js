/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore , activePlayer, playing;

function init() {
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	playing = true;
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

	//Add the active class to the first player by default
	document.querySelector('.player-0-panel').classList.add('active');
}

init();

var dice = Math.floor(Math.random() * 6)+1;

// document.querySelector('#current-' + activePlayer).textContent = dice;

// var x = document.querySelector('#score-0').textContent;
function nextPlayer() {
	//next player
	activePlayer === 0 ? activePlayer = 1 : activePlayer =0;
	roundScore =0;
	document.getElementById('current-0').textContent='0';
	document.getElementById('current-1').textContent='0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('.dice').style.display = 'none';
}
document.querySelector('.btn-roll').addEventListener('click',function(){
	if(playing) {
		//Random Number
		var dice = Math.floor(Math.random()*6)+1;
		//Displaying the Result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-'+ dice + '.png';
		//Update
		if (dice !== 1) { //Add Score
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;			
		} else{
			nextPlayer(); 
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click',function(){
	if (playing) {
		//Add Current Score to Global Score
		scores[activePlayer] += roundScore;
		//Update the UI
		document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
		//Check if the player has won the game
		if (scores[activePlayer] >= 100) {
			document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
			document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
			playing = false;
		} 
		else {
			nextPlayer();
		}
	}

});

document.querySelector('.btn-new').addEventListener('click', init);