//******************************//
// tips4design particles system //
// Version: 2.0.0				//
// Author: Cristian Buleandra   //
// Visit www.tips4design.com    //
//******************************//
	//set CSS
	$("<style type='text/css'>.sparkling{ position:relative;}.particle{ position:absolute;z-index:10;top:0px;left:0px;pointer-events:none;} </style>").appendTo("head");
	var imgsrc_default ='http://piataterenuri.info/t4d/particles/sparks/spark'; // it will automaticaly add 1.png,2.png etc
	var spark_types        = 3; //how many types of spark images do we use
	var particle_number    = 2; //how many particles to be launched at every mouse move
	var particle_variation = 8; //randomness of the starting position
	var particle_min_size  = 8; // minimum particle starting size
	var particle_max_size  = 32; //maximum particle starting size
	var accel_div     = 4; //higher value -> lower particle distance based on mouse accel
	var delay         = 2; //delay bewteen mousemove [miliseconds]
	var dir           = 1; // 1: particles follow the mouse cursor || -1: paricles go the opposite way
	var particle_life = 900; //how long the particle lasts before gone (speed) [miliseconds]
	var death_rand    = 35; //how much to spread the particles (how much does it travel)

	var last_moved=0,now,last_x=-1,last_y=-1,body=$('body'); //nothing to change here
	
$(window).load(function(){
	body=$('body');
	mWidth  = $(window).width();
	mHeight = $(document).height();

	$('.sparkling').live('mousemove',function(pos){
		now = new Date().getTime();
		
		if (now - last_moved > delay) {
			if($(this).attr('data-style') != undefined )
				setStyle[$(this).attr('data-style')]();
			else setStyle["reset"]();
			
			//Get number of particle types
			if($(this).attr('data-src-no') != undefined )
				spark_types=$(this).attr('data-src-no');
			
			//Get image base source	
			if($(this).attr('data-src') != undefined )
				imgsrc=$(this).attr('data-src');
			else 
				imgsrc=imgsrc_default;
			
			//Mouse is moved for the first time or mouse exited div and now is back
			if(last_x == -1 ||  now - last_moved > 500){
				last_x=pos.pageX;
				last_y=pos.pageY;
			}
		
			//create [particle_number] sparks
			for(var i=1;i<=particle_number;++i){
				
				//cache some randoms
				var rand1 = Math.random();
				var rand2 = Math.random();
				
				//append the spark to <body> also choose a random type from the `spark_types` available
				body.append('<img class="particle" src="' + imgsrc + (1+Math.round(rand1 * (spark_types-1))) + '.png"' + "/>");
				
				//select the latest/curent added particle
				var myim = $('.particle:last');
				
				//see the direction in which the cursor is moving
				var xpos = -dir;
				if(last_x - pos.pageX < 0)
					xpos = dir;
				
				var ypos = -dir;
				if(last_y - pos.pageY < 0)
					ypos = dir;
					
				//change distance according to mouse acceleration
				xpos *= Math.abs(Math.floor(last_x - pos.pageX))/accel_div;
				ypos *= Math.abs(Math.floor(last_y - pos.pageY))/accel_div;
						
				//set particle size and position
				var vari= Math.floor(particle_variation + rand1 * particle_variation);
				var startt = pos.pageY - vari*(1 - Math.round(rand2));
				var startl = pos.pageX - vari*(1 - Math.round(rand1));
				
				var rand = particle_min_size + Math.floor(rand1 * (particle_max_size-particle_min_size));
				
				myim.css('top',startt).css('left',startl).css('width',rand).css('height',rand);
					
				randt = startt  + Math.floor(rand1 * death_rand) * ypos;
				randl = startl + Math.floor(rand2 * death_rand) * xpos;
				//animate the image using the data above; remove the spark
				myim.animate({left: randl,top: randt,height: 'toggle',width: 'toggle'},
							{
								step: function(now, fx) {
									if( (fx.prop == "left" && now + 32 > mWidth ) ||
									    (fx.prop == "top"  && now + 32 > mHeight)
									   ){
										$(fx.elem).remove();
									}
								
								},
								duration: particle_life,
								complete: function(){ 
									$(this).remove();
								}
							});
				}
				last_moved = now;

			}
		last_x=pos.pageX;
		last_y=pos.pageY;
	});
});
var setStyle = {

	reset: function(){
		 imgsrc_default ='http://piataterenuri.info/t4d/particles/sparks/spark'; // it will automaticaly add 1.png,2.png etc
		 spark_types        = 3; //how many types of spark images do we use
		 particle_number    = 2; //how many particles to be launched at every mouse move
		 particle_variation = 8; //randomness of the starting position
		 particle_min_size  = 8; // minimum particle starting size
		 particle_max_size  = 32; //maximum particle starting size
		 accel_div     = 4; //higher value -> lower particle distance based on mouse accel
		 delay         = 15; //delay bewteen mousemove [miliseconds]
		 dir           = 1; // 1: particles follow the mouse cursor || -1: paricles go the opposite way
		 particle_life = 800; //how long the particle lasts before gone (speed) [miliseconds]
		 death_rand    = 35; //how much to spread the particles (how much does it travel)
	},

	snow:	function (){
		particle_number    = 2; //how many particles to be launched at every mouse move
		particle_variation = 17; //randomness of the starting position
		particle_min_size  = 8; // minimum particle starting size
		particle_max_size  = 32; //maximum particle starting size
		accel_div     = 8; //higher value -> lower particle distance based on mouse accel
		delay         = 2; //delay bewteen mousemove [miliseconds]
		dir           = -1; // 1: particles follow the mouse cursor || -1: paricles go the opposite way
		particle_life = 1200; //how long the particle lasts before gone (speed) [miliseconds]
		death_rand    = 150; //how much to spread the particles (how much does it travel)
	},
	
	sparks:	function (){
		particle_number    = 2; //how many particles to be launched at every mouse move
		particle_variation = 1; //randomness of the starting position
		particle_min_size  = 14; // minimum particle starting size
		particle_max_size  = 24; //maximum particle starting size
		accel_div     = 4; //higher value -> lower particle distance based on mouse accel
		delay         = 2; //delay bewteen mousemove [miliseconds]
		dir           = 1; // 1: particles follow the mouse cursor || -1: paricles go the opposite way
		particle_life = 800; //how long the particle lasts before gone (speed) [miliseconds]
		death_rand    = 25; //how much to spread the particles (how much does it travel)
	},
	
	science: function (){
		particle_number    = 1; //how many particles to be launched at every mouse move
		particle_variation = 1; //randomness of the starting position
		particle_min_size  = 14; // minimum particle starting size
		particle_max_size  = 24; //maximum particle starting size
		accel_div     = 0.5; //higher value -> lower particle distance based on mouse accel
		delay         = 2; //delay bewteen mousemove [miliseconds]
		dir           = 1; // 1: particles follow the mouse cursor || -1: paricles go the opposite way
		particle_life = 1000; //how long the particle lasts before gone (speed) [miliseconds]
		death_rand    = 45; //how much to spread the particles (how much does it travel)
	}
}