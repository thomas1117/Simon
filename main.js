var button1 = document.getElementById('1');
var button2 = document.getElementById('2');
var button3 = document.getElementById('3');
var button4 = document.getElementById('4');
var overlay = document.getElementById('overlay');
var play = document.getElementById('play');
var player1String = '';
var simon = '';
var score = 0;
var audio1 = new Audio('tone1.wav');
var audio2 = new Audio('tone2.wav');
var audio3 = new Audio('tone3.wav');
var audio4 = new Audio('tone4.wav');

simonButton(button1,1);
simonButton(button2,2);
simonButton(button3,3);
simonButton(button4,4);

play.addEventListener('click',function(){
	pushToSimon();
	play.style = 'display:none';
});

function simonButton(button,number) {
	button.addEventListener('click',function(){
		player1String += number;
		glow(button)
		var audio = new Audio('tone'+ number + '.wav');
		audio.play();
		audio.currentTime = 0;	
		var simonCut = simon.slice(0,player1String.length)
		comparePlayerLists(player1String,simonCut)
	});
}

function generateRandomNumber(min,max) {
	return Math.round(Math.random() * (max-min) + 1)
}

function pushToSimon() {
	setTimeout(function(){
		simon += generateRandomNumber(1,4);
		iterate(simon,600)
	},1000)
}

function comparePlayerLists(player1,simonSlice) {
	if(player1===simonSlice && player1.length===simon.length) {
		player1String = '';
		pushToSimon();
		document.getElementById('score').innerHTML = simon.length;
	}
	else if(player1===simonSlice) {
		
		//do nothing
	}
	
	else {resetGame()}
}

function resetGame() {
	player1String = '';
	simon = '';
	play.style = 'display:block';
	document.getElementById('score').innerHTML = simon.length;
	
	
}

function addClass(ele,cls) {
	if(ele.className.indexOf(cls)===-1) {
		ele.className += " " + cls;	
	}
}

function removeClass(ele,cls) {
	var bla = ele.className;
	var filtered = bla.replace(cls,"");
	ele.className = filtered;
}

function animate(num) {

	var button = this['button' + num];
	var audio = new Audio('tone'+ num +'.wav');

	glow(button)

	audio.play()
	audio.currentTime = 0;	

	
}

function glow(button) {
	addClass(button,'test');
	setTimeout(function(){removeClass(button,'test')},400);
}

function iterate(arr,time){
	var count = 0;
	var total = arr.length;
	
	function loop() {
		if(count< total) {
			setTimeout(loop,time);

			animate(arr[count]);

			addClass(overlay,'overlay');

			count++;
		}
		if(count===total) {

			removeClass(overlay,'overlay')
		}		
	}

loop()

};


