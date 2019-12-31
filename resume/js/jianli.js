//浏览器查询
//设置视差滚动速度差
var strength1 = 50;
var strength2 = 200;
var strength3 = 500;

//获取窗口宽度跟高度
var ScreenWidth = $(window).width();
var ScreenHeight = $(window).height();

//获取窗口长宽比
var Screen = ScreenWidth / ScreenHeight;

//水平轴
var currentScroll;

//当滚动条滚动时
$(window).scroll(function()
{  	
	//获取水平轴位置
    currentScroll = $(this).scrollLeft();
	
	//横向视差滚动 
	//当前水平轴位置 - (当前窗口宽度 / 2) = 背景滚动值
    var pageX = currentScroll - ($(window).width() / 2); 
	
	//1 * 背景滚动值 * 1(1由前向后,-1由后向前) = 滚动方向	
    var newvalueX = 1* pageX * 1;	
	
	//设置该卷标的CSS background-position 背景位置值 来移动背景产生视差滚动的效果
    $('.bg').css("background-position", (strength1 / $(window).width() * newvalueX * -1)+"px "+"0px");
	var ddd=strength1 / $(window).width() * newvalueX * -1;
	$('#RainBow').css("background-repeat","no-repeat");
	$('#RainBow').css("background-position", (strength1 / $(window).width() * newvalueX * -1)+"px "+"0px");		
    $('#Grass1').css("background-position", (strength2 / $(window).width() * newvalueX * -1)+"px "+"0px");
	$('#Grass2').css("background-position", (strength2 / $(window).width() * newvalueX * -1)+"px "+"0px");	
    $('#Floor2').css("background-position", (strength3 / $(window).width() * newvalueX * -1)+"px "+"0px");
	
	//当长宽比是宽屏幕1.7比时
	if(Screen > 1.7)
	{
		//调整背景宽度
		$('#bg').css("width", "506%");
		$('#Floor2').css("width", "506%");
		$('#Grass1').css("width", "502%");
		$('#Grass2').css("width", "502%");
	}	
});
//旧水平滚动条位置
var previousScroll  = 0;

//时间计时
var timer;
//猪跳跃状态
var PigJump = 0;
//小鸟飞
//自动飞行函数
function autoFly(ele,step,pos,times,ini){
	var n,str;
	if(ini){
		n=ini;
	}else{
		n=0;
	}
	if(typeof ele=="object"){
		var obj=ele;
	}else{
		var obj=document.getElementById(ele);
	}
	setInterval(function(){
		var str=n*pos+"px"+" 0px";
		obj.style.backgroundPosition=str;
		n++;
		if(n==step){
			n=0;
		}
	},times)
	
}
//得到translate的值

function birdFly(){
	autoFly("Bird",2,-171,200);
}
//恐龙跑
function dinosaurRun(){
	// auto
}
//眨眼动画
var iniBlink,closeE,flagBlink=0,compBlink=1;
window.onload=function(){
	blink();
	birdFly();
	dinosaurRun();
}
function blink(){
		clearInterval(closeE);
		document.getElementById("glass").style.visibility="hidden";
		flagBlink=0;
		iniBlink=setInterval(function(){
		document.getElementById("glass").style.visibility="hidden";
		if(++flagBlink>compBlink){
			colseEye();
		}
	},1500);
	function colseEye(){
		clearInterval(iniBlink);
		document.getElementById("glass").style.visibility="visible";
		flagBlink=0;
		closeE=setInterval(function(){
		document.getElementById("glass").style.visibility="visible";
		if(++flagBlink>compBlink){
			blink();
		}
		},50)
	}
}
//行走动画
var stopWalkR,stopWalkL,flag=0,compair=1,stopShake=true;//stopshake解决抖动
var timerr=0,stopWalkRS,stopWalkLS,shortW;
window.onkeydown=walk;
window.onkeyup=stopWalk;
function walk(e){
	var charnum=0;
	if(stopShake){
		if(timerr<6){
			if(window.event){
			 charnum=e.keyCode
			}else if(e.which){
			 charnum=e.which;
			}
			stopShake=false;
			if(charnum==39){
				rightWalkS(20);
			}else if(charnum==37){
				leftWalkS(20);
				}else{return false;}
			shortW=setInterval(function(){
				timerr++;
				if(timerr>=6){
					clearInterval(shortW);
					clearInterval(stopWalkRS);
					clearInterval(stopWalkLS);
					longWalk();

				}
			},20);
		}
		function longWalk(){

			if(charnum==39)rightWalk(200);
			if(charnum==37)leftWalk(200);
			
		}
		
	}
}
function stopWalk(){
	timerr=0;
	clearInterval(shortW);
    clearInterval(stopWalkRS);
	clearInterval(stopWalkLS);
	clearInterval(stopWalkR);
	clearInterval(stopWalkL);
	document.getElementById("Player").style.backgroundPosition="0px 0px";
	document.getElementById("Pig").style.backgroundPosition="0px 0px";
	document.getElementById("glass").style.left="90px";
	changeDirec("Pig",1,1);
	stopShake=true;
	flag=0;
}
function rightWalk(t){
	changeDirec("Pig",1,1);
	stopWalkR=setInterval(function(){
		changePosition("r",1);
		changePigUrl(1);
		
		if(++flag>compair){
			changePosition("r",2);
			changePigUrl(2);
			
			flag=0;
		}
	},t)
}
function leftWalk(t){
	changeDirec("Pig",-1,1);
	document.getElementById("glass").style.left="55px";
	stopWalkL=setInterval(function(){
		changePosition("left",1);
		changePigUrl(1);
		
		if(++flag>compair){
			changePosition("left",2);
			changePigUrl(2);
			
			flag=0;
		}
	},t)
}
function rightWalkS(t){
	changeDirec("Pig",1,1);
	stopWalkRS=setInterval(function(){
		changePosition("r",1);
		if(++flag>compair){
			changePosition("r",2);
			
			
			flag=0;
		}
	},t)
}
function leftWalkS(t){
	changeDirec("Pig",-1,1);
	stopWalkLS=setInterval(function(){
		changePosition("left",1);
		if(++flag>compair){
			changePosition("left",2);	   
			flag=0;
		}
	},t)
}
function changePosition(d,n){
	var num=n*-200,str;
	if(d.indexOf("r")!=-1){
		str=num+"px"+" 0px";
	}
	if(d.indexOf("left")!=-1){
		str=num+"px"+" -200px"
	}
	document.getElementById("Player").style.backgroundPosition=str;
}
function changePigUrl(n){
	if(n==1){
		document.getElementById("Pig").style.backgroundPosition="0px 0px"
	}
	if(n==2){
		document.getElementById("Pig").style.backgroundPosition="-511px 0px"
	}
}
function changeDirec(id,a,b){
	document.getElementById(id).style.transform="scale("+a+","+b+")";
}
//蝙蝠飞的防抖控制
var batShake=true;
$(window).scroll(function(){  
	
	//获取窗口宽度跟高度
	ScreenWidth = $(window).width();
	ScreenHeight = $(window).height();
	
	//当前窗口宽度 / 7(排版的当前窗口宽1280px / 当时固定的触发像素位置182px = 7)= 第一个触发点
	ActionPoint1 = ScreenWidth / 7;
	
	//当前窗口宽度 / 1.25 = 第二个触发点
	ActionPoint2 = ScreenWidth / 1.25;
	
	//当前窗口宽度 / 0.315 = 第三个触发点
	ActionPoint3 = ScreenWidth / 0.315;
	
	//当前窗口宽度 / 0.25 = 第四个触发点
	ActionPoint4 = ScreenWidth / 0.25;
	
	//当前窗口宽度 / 0.19 = 第五个触发点
	ActionPoint5 = ScreenWidth / 0.19;
	
	//当前窗口高度 / 1.25 = 跳跃起跳最高点高度
	JumpUp = ScreenHeight / 3.31;
	
	//当前窗口高度 / 1.25 = 跳跃降落最低点高度
	JumpDown = 0;
	
	//获取水平轴位置
	currentScroll = $(this).scrollLeft();
	//当水平轴滚动到第一个触发点
	if(currentScroll > ActionPoint1)
	{					
		//判断猪是否跳跃过第一次
		if(PigJump == 0)
		{			
			//队列动画实现跳跃一次
			$("#Pig").animate({bottom:"250px"});
			$("#Pig").animate({bottom:"0px"});
			PigJump = 1;
		}		
	}
	
	//当水平轴还没滚动到第一个触发点
	else if(currentScroll < ActionPoint1)
	{
		//把猪的跳跃状态恢复为0
		PigJump = 0;
	}
	
	//当水平轴滚动到第二个触发点
	if(currentScroll >= ActionPoint2)
	 {
	 	if(batShake){
		var batArr1=document.getElementsByClassName("Bat1");
		var batArr2=document.getElementsByClassName("Bat2");
		var batArr3=document.getElementsByClassName("Bat3");
		var batARR=[batArr1,batArr2,batArr3];
		for(var i=0;i<batARR.length;i++){
			for(var j=0;j<batARR[i].length;j++){
				var x=batARR[i][j];
				autoFly(x,3,-114,200,i);
			}
		}
		console.log("shake");
		batShake=false;
		}
		//同时飞出蝙蝠
		$("#Bat1").animate({top:"40%",left:"140%"}, 3500);
		$("#Bat2").animate({top:"40%",left:"155%"}, 3500);
		$("#Bat3").animate({top:"40%",left:"170%"}, 4000);
		$("#Bat4").animate({top:"40%",left:"185%"}, 5000);
		$("#Bat5").animate({top:"57%",left:"140%"}, 3500);
		$("#Bat6").animate({top:"57%",left:"155%"}, 4000);
		$("#Bat7").animate({top:"57%",left:"170%"}, 5000);
		$("#Bat8").animate({top:"75%",left:"140%"}, 3500);
		$("#Bat9").animate({top:"75%",left:"155%"}, 4000);
		$("#Bat10").animate({top:"75%",left:"170%"}, 5000);		
	}
	
	//当水平轴滚动到第三个触发点
	if(currentScroll > ActionPoint3)
	{		
		//判断猪是否跳跃过第二次
		if(PigJump == 1)
		{			
			//队列动画实现跳跃一次
			$("#Pig").animate({bottom:JumpUp});
			$("#Pig").animate({bottom:JumpDown});
			PigJump = 2;
		}		
	}
	
	//当水平轴还没滚动到第三个触发点，而且水平轴已经滚动过第一个触发点
	else if(currentScroll < ActionPoint3 && currentScroll > ActionPoint1)
	{
		//把猪的跳跃状态恢复为1
		PigJump = 1;
	}
	
	//当水平轴已经滚动过第四个触发点，而且水平轴还没滚动超过第五个触发点
	if (currentScroll > ActionPoint4 && currentScroll < ActionPoint5)
	{
		$("#Speak").animate({height:"150px"}, 2000);
	}
	
	//递回现在水平轴滚动位置 给 旧水平轴滚动位置
	previousScroll = currentScroll;     
}); 
window.onload=judgeTerminal;
window.onresize=windowResize;
function judgeTerminal() {
	var system = {};
	var p = navigator.platform;
	var u = navigator.userAgent;
	var mask=document.getElementById("MaskContent");
	mask.style.height=document.documentElement.scrollHeight;
	system.win = p.indexOf("Win") == 0;
	system.mac = p.indexOf("Mac") == 0;
	system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
	//如果不是pc浏览器
	if (!(system.win || system.mac || system.xll)) {
		window.alert("请在电脑端使用浏览器查看！");
		mask.style.visibility="visiable";
	}else{
		
	}
}


function windowResize(){
	var mask=document.getElementById("MaskContent");
	mask.style.height=document.documentElement.scrollHeight;
}