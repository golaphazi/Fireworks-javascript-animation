<html>
<head>
<title>Fireworks - Images</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<meta name="KeyWords" content="JavaScript, DHTML, Animation, Fireworks, 4th July, independence day, Guy Fawkes, November 5th">
<script src="jquery-1.11.2.min.js" type="text/javascript"></script>
<link rel="stylesheet" href="animation.css" type="text/css">
 <script type="text/javascript" src="animation.js"></script>
</head>
 <style type="text/css">
   
    .background {
		background: rgba(1, 1, 1, 0.90);
		position: fixed;
		z-index: 10000;
		width: 100%;
		/* bottom: 100px; */
		height: 100%;
		left:0px;
	}
	.green.btn:hover, .green.btn:focus, .green.btn:active, .green.btn.active {
		color: #FFFFFF;
		background-color: #1f897f;
	}
	.green.btn {
		width: 95%;
		margin-top: 106px;
		padding: 19px;
		border-radius: 30px !important;
		font-size: 20px;
		box-shadow: 0px 6px 3px #56b6ad;
		background-color: #1f897f;
		color: #FFFFFF;
		border:none;
		cursor:pointer;
	}
	
    </style>
	<script type="text/javascript">
        function showFWs() {
            FireworkTimer("divFW", "FF7700", 125, 445, 0, true, 2);
            FireworkTimer("divFW", "FF4433", 1015, 585, 300, true, 5);
			setTimeout(function () {
			var fw2 = new CFirework("divFW", "FF4433", 515, 243);
				fw2.useAudio = true;
				fw2.velY = -80;
				fw2.timeBeforeExplosion = 1300;
				fw2.start();
			}, 600);
            FireworkTimer("divFW", "22FF44", 657, 240, 5000, true, 4);
            FireworkTimer("divFW", "FF3322", 230, 380, 3600, true, 2);
            FireworkTimer("divFW", "00FFFF", 985, 390, 4500, true, 2.8);
            FireworkTimer("divFW", "00FDDD", 985, 190, 2500, true, 3.5);
            FireworkTimer("divFW", "22FF44", 485, 290, 7000, true, 8.5);
		}
    </script>
	
	<script>
		showFWs();
		setInterval(function(){ showFWs(); }, 10000);
	</script>
<body>
<div class="background">
<SCRIPT TYPE="text/javascript">
/**
  * You may use this code for free on any web page provided that 
  * these comment lines and the following credit remain in the code.
  * Cross Browser Fireworks from http://www.javascript-fx.com
  */
/*************************************************/
if(!window.JSFX) JSFX=new Object();

if(!JSFX.createLayer)
{/*** Include Library Code ***/

var ns4 = document.layers;
var ie4 = document.all;
JSFX.objNo=0;

JSFX.getObjId = function(){return "JSFX_obj" + JSFX.objNo++;};

JSFX.createLayer = function(theHtml)
{
	var layerId = JSFX.getObjId();

	document.write(ns4 ? "<LAYER  NAME='"+layerId+"'>"+theHtml+"</LAYER>" : 
				   "<DIV id='"+layerId+"' style='position:absolute'>"+theHtml+"</DIV>" );

	var el = 	document.getElementById	? document.getElementById(layerId) :
			document.all 		? document.all[layerId] :
							  document.layers[layerId];

	if(ns4)
		el.style=el;

	return el;
}
JSFX.fxLayer = function(theHtml)
{
	if(theHtml == null) return;
	this.el = JSFX.createLayer(theHtml);
}
var proto = JSFX.fxLayer.prototype

proto.moveTo     = function(x,y){this.el.style.left = x;this.el.style.top=y;}
proto.setBgColor = function(color) { this.el.style.backgroundColor = color; } 
proto.clip       = function(x1,y1, x2,y2){ this.el.style.clip="rect("+y1+" "+x2+" "+y2+" "+x1+")"; }
if(ns4){
	proto.clip = function(x1,y1, x2,y2){
		this.el.style.clip.top	 =y1;this.el.style.clip.left	=x1;
		this.el.style.clip.bottom=y2;this.el.style.clip.right	=x2;
	}
	proto.setBgColor=function(color) { this.el.bgColor = color; }
}
if(window.opera)
	proto.setBgColor = function(color) { this.el.style.color = color==null?'transparent':color; }

if(window.innerWidth)
{
	gX=function(){return innerWidth;};
	gY=function(){return innerHeight;};
}
else
{
	gX=function(){return document.body.clientWidth;};
	gY=function(){return document.body.clientHeight;};
}

/*** Example extend class ***/
JSFX.fxLayer2 = function(theHtml)
{
	this.superC = JSFX.fxLayer;
	this.superC(theHtml + "C");
}
JSFX.fxLayer2.prototype = new JSFX.fxLayer;
}/*** End Library Code ***/

/*************************************************/

/*** Class Firework extends FxLayer ***/
JSFX.Firework = function(fwImages)
{
	window[ this.id = JSFX.getObjId() ] = this;
	this.imgId = "i" + this.id;
	this.fwImages  = fwImages;
	this.numImages = fwImages.length;
	this.superC = JSFX.fxLayer;
	this.superC("<img src='"+fwImages[0].src+"' name='"+this.imgId+"'>");

	this.img = document.layers ? this.el.document.images[0] : document.images[this.imgId];
	this.step = 0;
	this.timerId = -1;
	this.x = 0;
	this.y = 0;
	this.dx = 0;
	this.dy = 0;
	this.ay = 0.2;
	this.state = "OFF";
}
JSFX.Firework.prototype = new JSFX.fxLayer;

JSFX.Firework.prototype.getMaxDy = function()
{
	var ydiff = gY() - 130;
	var dy    = 1;
	var dist  = 0;
	var ay    = this.ay;
	while(dist<ydiff)
	{
		dist += dy;
		dy+=ay;
	}
	return -dy;
}
JSFX.Firework.prototype.setFrame = function()
{
//	this.img.src=this.fwName+"/"+this.step+".gif";
	this.img.src=this.fwImages[ this.step ].src;
}
JSFX.Firework.prototype.animate = function()
{

	if(this.state=="OFF")
	{
		
		this.step = 0;
		this.x = gX()/2-20;
		this.y = gY()-100;
		this.moveTo(this.x, this.y);
		this.setFrame();
		if(Math.random() > .95)
		{
			this.dy = this.getMaxDy();
			this.dx = Math.random()*-8 + 4;
			this.dy += Math.random()*3;
			this.state = "TRAVEL";
		}
	}
	else if(this.state=="TRAVEL")
	{
		this.x += this.dx;
		this.y += this.dy;
		this.dy += this.ay;
		this.moveTo(this.x,this.y);
		if(this.dy > 1)
			this.state="EXPLODE"
	}
	else if(this.state == "EXPLODE")
	{
		this.step++;
		if(this.step < this.numImages)
			this.setFrame();
		else
			this.state="OFF";
	}
}
/*** END Class Firework***/

/*** Class FireworkDisplay extends Object ***/
JSFX.FireworkDisplay = function(n, fwImages, numImages)
{
	window[ this.id = JSFX.getObjId() ] = this;
	this.timerId = -1;
	this.fireworks = new Array();
	this.imgArray = new Array();
	this.loadCount=0;
	this.loadImages(fwImages, numImages);

	for(var i=0 ; i<n ; i++)
		this.fireworks[this.fireworks.length] = new JSFX.Firework(this.imgArray);
}
JSFX.FireworkDisplay.prototype.loadImages = function(fwName, numImages)
{
	for(var i=0 ; i<numImages ; i++)
	{
		this.imgArray[i] = new Image();
		this.imgArray[i].obj = this;
		this.imgArray[i].onload = window[this.id].imageLoaded;
		this.imgArray[i].src = fwName+"/"+i+".gif";
	}
}
JSFX.FireworkDisplay.prototype.imageLoaded = function()
{
	this.obj.loadCount++;
}

JSFX.FireworkDisplay.prototype.animate = function()
{
status = this.loadCount;
	if(this.loadCount < this.imgArray.length)
		return;

	for(var i=0 ; i<this.fireworks.length ; i++)
		this.fireworks[i].animate();
}
JSFX.FireworkDisplay.prototype.start = function()
{
	if(this.timerId == -1)
	{
		this.state = "OFF";
		this.timerId = setInterval("window."+this.id+".animate()", 40);
	}

}
JSFX.FireworkDisplay.prototype.stop = function()
{
	if(this.timerId != -1)
	{
		clearInterval(this.timerId);
		this.timerId = -1;
		for(var i=0 ; i<this.fireworks.length ; i++)
		{
			this.fireworks[i].moveTo(-100, -100);
			this.fireworks[i].step = 0;;
			this.fireworks[i].state = "OFF";
		}	
	}
}
/*** END Class FireworkDisplay***/

JSFX.FWStart = function()
{
	if(JSFX.FWLoad)JSFX.FWLoad();
	myFW.start();
}
myFW = new JSFX.FireworkDisplay(20, "fw05", 21);
JSFX.FWLoad=window.onload;
window.onload=JSFX.FWStart;

</SCRIPT>

<div class="page">
			<div id="zzthead" >
				
			</div>
			<div class="body home">
				<div>
                	<div id="divFW" class="featured">
                         
					</div>
					
						
					<div id="ldfeat1">
						
					</div>
					
				</div>
				
				<span id="lasttweet"></span>					
				<div class="login_absolute">
				Text Box
				</div>
					
			</div>
			
		</div>
</div>

</body>
</html>
