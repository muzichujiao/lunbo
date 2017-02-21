window.onload=function(){
	var cont=document.getElementById('cont');
	var list=document.getElementById('list');
	var button=document.getElementById('button').getElementsByTagName('span');
	var prev=document.getElementById('prev');
	var next=document.getElementById('next');
	var index = 1;//保存存放第几张图片
	var goed = false;//表示是否在动画
	var timer;

	//亮起小圆点
	function showButton(){
		for(var i=0;i<button.length;i++){
			if(button[i].className=='on'){
				button[i].className='';
				break;	
			}
		}
		button[index-1].className = 'on';
	}

	//函数：点击箭头 图片移动	
		function animate(offset){
		goed = true;
		var newLeft = parseInt(list.style.left)+offset;
		var time=300;//位移总时间
		var interval = 10;//位移间隔时间
		var speed = offset/(time/interval);//每次位移量

		function go(){
			if((speed<0 && parseInt(list.style.left)>newLeft) || (speed>0 && parseInt(list.style.left)<newLeft)){
				list.style.left = parseInt(list.style.left) + speed + 'px';
				setTimeout(go,interval);//在interval时间后调用go函数
			}else{
				goed = false;
				list.style.left=newLeft +'px';
	
				//循环效果 在循环到最后一张时 跳到第一张
				if(newLeft >-600){
					list.style.left = -3000+'px';
				}
				if(newLeft <-3000){
					list.style.left = -600+'px';
				}
			}
		}
		go();
	}
	//定时切换 自动播放
	function play(){
		timer = setInterval(function(){
			next.onclick();
		},3000);//定时器 每隔3秒播放
	}
	//删除定时器
	function stop(){
		clearInterval(timer);
	}

	//第二个箭头
	next.onclick=function(){
		if(index == 5){
			index = 1;
		}else{
			index+=1;	
		}
		if(goed == false){
			animate(-600);
		}
		showButton();
	}
	//第一个箭头
	prev.onclick=function(){
		if(index == 1){
			index = 5;
		}else{
			index -= 1;
		}
		if(goed == false){
			animate(600);
		}
		
		showButton();			
	}

	//点击小圆点 图片滚动
	for(var i = 0 ; i<button.length;i++){
		button[i].onclick = function(){
			//点击自身按钮时 程序不运行（简化程序）
			if(this.className=='on'){
				return;
			}
			var myIndex = parseInt(this.getAttribute('index'));//获取自定义属性
			var offset = -600*(myIndex - index);//每次点击小圆点的偏移量
			if(goed == false){
				animate(offset);
		}
			index=myIndex;
			showButton();
		}
	}	
	//鼠标移上去停止 移出去继续播放
	cont.onmouseover = stop;
	cont.onmouseout = play;
	play();

}