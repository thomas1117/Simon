var button1 = document.getElementById('1');
var button2 = document.getElementById('2');
var button3 = document.getElementById('3');
var button4 = document.getElementById('4');
var play = document.getElementById('play');
var player1 = document.getElementById('player1Arr');
var player2 = document.getElementById('player2Arr');
var player1String = '';
var simon = '';

simonButton(button1,1);
simonButton(button2,2);
simonButton(button3,3);
simonButton(button4,4);

play.addEventListener('click',function(){
	pushToSimon();
	updateGame();
	
});

function simonButton(button,number) {
	button.addEventListener('click',function(){
		player1String += number	
		updateGame();
		var simonCut = simon.slice(0,player1String.length)
		comparePlayerLists(player1String,simonCut)
	});
}

function generateRandomNumber(min,max) {
	return Math.round(Math.random() * (max-min) + 1)
}

function updateGame() {
	player1.innerHTML = player1String;
	player2.innerHTML = simon;
}

function pushToSimon() {
	setTimeout(function(){
		simon += generateRandomNumber(1,4);
		player2.innerHTML = simon;
		iterate(simon,600)
	},1000)
}

function comparePlayerLists(player1,simonSlice) {
	if(player1===simonSlice && player1.length===simon.length) {
		player1String = '';
		updateGame();
		pushToSimon();
	}
	else if(player1===simonSlice) {
		// do nothing
	}
	
	else {resetGame()}
}

function resetGame() {
	player1String = '';
	simon = '';
	pushToSimon();
	updateGame();
}

function addClass(ele,cls) {
	ele.className += " " + cls;	
}

function removeClass(ele,cls) {
	var bla = ele.className;
	var filtered = bla.replace(cls,"");
	ele.className = filtered;
}

function animate(num) {
	switch(num){
		case "1":
			addClass(button1,'test');
			setTimeout(function(){removeClass(button1,'test')},400);
			break;

		case "2":
			addClass(button2,'test');
			setTimeout(function(){removeClass(button2,'test')},400);
			break;

		case "3":
			addClass(button3,'test');
			setTimeout(function(){removeClass(button3,'test')},400);
			break;

		case "4":
			addClass(button4,'test');
			setTimeout(function(){removeClass(button4,'test')},400);
			break;

	default:
		console.log('not working')
	}
}

function iterate(arr,time){
	var count = 0;
	var total = arr.length;
	
	function loop() {
		if(count< total) {
			setTimeout(loop,time);
			animate(arr[count])
			count++;
		}		
}
loop()

};
