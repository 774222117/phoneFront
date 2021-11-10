//designWidth:设计稿的实际宽度值，需要根据实际设置
//maxWidth:制作稿的最大宽度值，需要根据实际设置
//这段js的最后面有两个参数记得要设置，一个为设计稿实际宽度，一个为制作稿最大宽度，例如设计稿为750，最大宽度为750，则为(750,750)
;(function(designWidth, maxWidth) {
  var doc = document,
  win = window,
  docEl = doc.documentElement,
  remStyle = document.createElement("style"),
  tid;

  function refreshRem() {
      var width = docEl.getBoundingClientRect().width;
      maxWidth = maxWidth || 375;
      width>maxWidth && (width=maxWidth);
      var rem = width * 100 / designWidth;
      remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
  }

  if (docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(remStyle);
  } else {
      var wrap = doc.createElement("div");
      wrap.appendChild(remStyle);
      doc.write(wrap.innerHTML);
      wrap = null;
  }
  //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
  refreshRem();

  win.addEventListener("resize", function() {
      clearTimeout(tid); //防止执行两次
      tid = setTimeout(refreshRem, 300);
  }, false);

  win.addEventListener("pageshow", function(e) {
      if (e.persisted) { // 浏览器后退的时候重新计算
          clearTimeout(tid);
          tid = setTimeout(refreshRem, 300);
      }
  }, false);

  // if (doc.readyState === "complete") {
  //     doc.body.style.fontSize = "16px";
  // } else {
  //     doc.addEventListener("DOMContentLoaded", function(e) {
  //         doc.body.style.fontSize = "16px";
  //     }, false);
  // }
})(375, 1024);

//UC浏览器真特么的烦人，在页面强制插入JS，强制给关键词加入神马搜索链接，通过以下代码可以轻松清除，基于JQ：
function CaoNiMaDeUc(){
    $("a").each(function(index, element) {
        try{
        var thishref=$(this).attr("href");
        var thisText=$(this).html();
        if(thishref.indexOf("uc.cn")>=0){
            $(this).replaceWith(thisText); 
        }
        }
        catch(e){
        }
    });
    $("script").each(function(index, element) {
        try{
        var thissrc=$(this).attr("src");

        if(thissrc.indexOf("ucbrowser")>=0){
            $(this).remove();  
        }
        }
        catch(e){
        }
    }); 
}

//上面是清除用的函数，页面下载完成执行下面代码：
$(function(){
var pageDATA_ua = window.navigator.userAgent.toLowerCase();

if(pageDATA_ua.indexOf('ucbrowser')>=0){setInterval("CaoNiMaDeUc();",1000);}
});


// 当前的渠道ID
var channel = valueByName(location.href,'channel');


// 点击顶部logo跳转首页
function goBackIndex(){
	if(firstUser.state == true){
		activityNum = 1
		window.location.href = 'index.html?channel=' + channel + '&activity=' + activityNum
	}else{
		window.location.href = 'index.html?channel=' + channel
	}
}

// 如果进入详情页没有购买
// function haveActivityCount(){
// 	if(firstUser.state){
// 		activityNum = 1
// 	}else{
// 		activityNum = 0
// 	}
// }

// 点击搜索跳转搜索页
function goSerach(){
	window.location.href = 'search.html?channel' + channel + '&gameName=' + $('#gameName').val()
}


var OKF_TOKEN = ''
var data = {current:0,orderType:3}

//计算两个时间之间的时间差 多少天时分秒
function intervalTime(startTime,endTime) {
    // var timestamp=new Date().getTime(); //计算当前时间戳
    var timestamp = (Date.parse(new Date()))/1000;//计算当前时间戳 (毫秒级)
     var date1 = ""; //开始时间
    if(timestamp<startTime){
        date1=startTime;
    }else{
        date1 = timestamp; //开始时间
    }
    var date2 = endTime; //结束时间
    // var date3 = date2.getTime() - date1.getTime(); //时间差的毫秒数
    var date3 =  (date2- date1)*1000; //时间差的毫秒数
    //计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000));
    //计算出小时数

    var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));

    //计算相差秒数

    var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    console.log(days + "天 " + hours + "小时 ")
    // return   days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒"
    return   days + "天 " + hours + "小时 "
}

// 语言处理函数
 function language(data){
	var langStr = ''
	if(data.length === 1){
			langStr = data[0].title
		}
		if(data.length === 2){
			langStr = data[0].title + ' ， ' + data[1].title 
		}
		if(data.length > 2){
			for(var i = 0;i < 3;i++){
				if(i === 2){
					langStr += data[i].title
				}else{
					langStr += data[i].title + ' ， '
				}
			}
		}
		return langStr
	}
// 获取地址appId
function valueByName(search,name){
	var start = search.indexOf(name + "=");
	if(start == -1){
		return null;
	}else{
		var end = search.indexOf("&", start);
		if(end == -1){
			end = search.length;
		}
		//提取出想要键值对 name=value
		var str = search.substring(start, end);
		var arr = str.split("=");
		return arr[1];
	}
}

// 时间戳转日期函数
function Format(datetime,fmt='yyyy-MM-dd hh:mm:ss') {
  if (parseInt(datetime)==datetime) {
	if (datetime.length==10) {
	  datetime=parseInt(datetime)*1000;
	} else if(datetime.length==13) {
	  datetime=parseInt(datetime);
	}
  }
  datetime=new Date(datetime);
  var o = {
  "M+" : datetime.getMonth()+1,                 //月份
  "d+" : datetime.getDate(),                    //日
  "h+" : datetime.getHours(),                   //小时
  "m+" : datetime.getMinutes(),                 //分
  "s+" : datetime.getSeconds(),                 //秒
  "q+" : Math.floor((datetime.getMonth()+3)/3), //季度
  "S"  : datetime.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
  fmt=fmt.replace(RegExp.$1, (datetime.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
  if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}
// Format('1566144000000','yyyy-MM-dd hh:mm:ss');

// 进入页面检查用户是否登陆过
function readyLogin(){
	// console.log(localStorage.userInfo === undefined )
	if(localStorage.userInfo === undefined){
		$('.userIcon img').css('display','none')
	}else{
		$('.userIcon img').css('display','block')
	}
}

// 浏览器编码转换
function GetQueryString(name){
	 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	 var r = window.location.search.substr(1).match(reg);
	 if(r!=null)return  decodeURIComponent(r[2]); return null;
}


var isCodes=false;// 验证码是否成功


// 当前的渠道ID
var channel = valueByName(location.href,'channel');

// 点击搜索跳转搜索页面
$('.serachlogo').click(function(){
	goSerach()
})

// 点击头像进入我的订单
$('.userIcon').on('touchstart',function(){
	if(localStorage.userInfo === undefined){
		$('.container2').removeClass('unactive')
	}else{
		window.location.href = 'myOrder.html?channel=' + channel
	}
})

// 关闭登陆界面
$('.container2 .close').on('click',function(){
	$('.container2').addClass('unactive')
})

// 手机号验证
function checkPhone(){
	var phone = document.getElementById('phone').value;
	// /^1[3456789]\d{9}$/
	if(!(/^1[3456789]\d{9}$/.test(phone))){
		alert('手机号有误，请重填');
		return false
	}else{
		let count = 60;
		const countDown = setInterval(()=>{
			if(count === 0){
				$('.code').text('重新发送').removeAttr('disabled');
				$('.code').css({
					backgroundColor:'rgba(5,24,36,0.8)',
					color:'#43b7f8'
				});
				clearInterval(countDown);
			}else{
				$('.code').attr('disabled',true);
				$('.code').css({
					backgroundColor:'rgba(5,24,36,0.8)',
					opacity:0.59,
					color:'#707070',
				});
				$('.code').text(count + '秒重新获取')
			}
			count--;
		},1000);
	}
	
}

// 点击获取验证码
$('.code').on('click',function(){
	checkPhone()
	var phoneNumber = $('#phone').val()
	if(phoneNumber == ''){return}
	console.log(phoneNumber)
	// 验证手机号
	$.ajax({
		type:'GET',
		url:onekeyfunDomin + '/author/sendSmsCode',
		data:{'phoneNumber':phoneNumber},
		dataType:'json',
		success:function(data){
			if(data.flag){
				// 获取验证码成功
				isCodes = true
			}else{
				isCodes = false
			}
		}
	});
})
// 存储的信息
var userInfo = {
	userName:$('#phone').val(),
	userOKF:data.code,
}

// 点击注册/登陆按钮
$('.loginBtn').click(function(){
	if(isCodes){
		headPic = true
		console.log(headPic)
		// localStorage.setItem('userName',$('#phone').val())
		$('.userIcon').removeClass('unlogin')
		$('.userIcon img').css('display','block')
		$('.container2').hide()
		// 使用验证码登陆
		$.ajax({
			type:'GET',
			url:onekeyfunDomin + '/author/loginDomestic',
			data:{
				'phoneNumber':$('.account').val(),
				'smsCode':$('.smsCode').val(),
				'channelAbbr': channel
			},
			dataType:'json',
			success:function(data){
				console.log(data)
				userInfo.userName = $('#phone').val()
				userInfo.userOKF = data.code
				localStorage.setItem('userInfo',JSON.stringify(userInfo))
				window.location.reload();
			},
		});
	}else{
		alert('验证码错误')
	}
})

// 保存用户状态
var firstUser = {state:''}

// 15分钟倒计时
function fifteenMin(data){
	var times = data * 100; // 60秒
	countTime = setInterval(function() {
		times = --times < 0 ? 0 : times;
		var min = Math.floor(times / 60 / 100).toString();
		if(min.length <= 1){
			min = '0' + min;
		}
		
		var ms = Math.floor(times / 100 % 60).toString();
		
		if(ms.length <= 1) {
			ms = "0" + ms;
		}
		var hm = Math.floor(times % 100).toString();
		if(hm.length <= 1) {
			hm = "0" + hm;
		}
		if(times == 0) {
			$('.ejectBox').addClass('unactive')
			$('.buyContent .countDown').css('display','none')
			$('ejectBox').addClass('unactive')
			$('.firstOrder').addClass('unactive')
			clearInterval(countTime);
		}
		// 获取分钟、毫秒数
		$(".hour").html(min)
		$(".minute").html(ms);
		$(".second").html(hm);
	}, 10);
}

// 图片处理尺寸函数
function picSize(data){
	var pic = data.slice(0,data.indexOf('.jpg')) + ".600x338.jpg"
	return pic
}

// 联系客服
var localInfo = JSON.parse(localStorage.getItem('userInfo'))

var isSdkReady = false;
	ysf('onready', function () {
		isSdkReady = true;
	})
	
	window.url = function () {
		if(isSdkReady) {
			if(localStorage.userInfo !== undefined){
				ysf('config', {
				       uid: localInfo.userName,     
				       name: localInfo.userName,          
				       mobile: localInfo.userName,  
				   });
			}
			ysf('open')
			// location.href = ysf('url');
		}else {
			alert('sdk尚未加载成功，请稍后再试');
		}
	}