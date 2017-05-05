require.config({
	jquery: "js/jquery",
	cookie: "js/cookie",
	index: "js/index"
});

require(["jquery", "cookie", "index"], function ($, cookie, index) {
	
	$(function () {
		
		var 
			oSecond = $("#timeout").html(),
			oTimer  = null,
			verifyCode = new GVerify("yanzmimg");
		// 点击刷新验证码	
		$(".update").click(function () {
			var res = verifyCode.validate($("#verify").val());
		});
		
		$("#submit-reg").click(function () {
			var 
				oMobile = $("#user").val(),
				oPasswd = $("#passwd").val(),
				Apasswd = $("#Apasswd").val(),
				oYanzm  = $("#verify").val(),
				Mbyanzm = $("#telverify").val(),
				res = verifyCode.validate($("#verify").val());
			
			
			
			
			// 验证码
			if (res) {
				$("#verify").next().removeClass("hide");
				$("#verify").next().removeClass("iconError");
			}else{
				$("#verify").next().removeClass("hide").addClass("iconError");
				$(".dialog-zhezhao").stop(true).fadeToggle(500).toggleClass("hide");
				$(".dialog-info").stop(true).fadeToggle(1000).toggleClass("hide");
				// (".tips").html("验证码有误");
			}
			
			// 判断用户手机号
			var oRegMobile = /^\w{11}$/;
			if(!oRegMobile.test(oMobile)) {
				$(".dialog-zhezhao").stop(true).fadeToggle(500).toggleClass("hide");
				$(".dialog-info").stop(true).fadeToggle(1000).toggleClass("hide");
				$("#user").next().removeClass("hide").addClass("iconError");
				$(".tips").html("您输入的手机号有误，请核对后重新输入");
			}else{
				$("#user").next().removeClass("hide").removeClass("iconError");
			}
			
			// 验证密码
			if(oPasswd.length < 6) {
				$(".dialog-zhezhao").stop(true).fadeToggle(500).toggleClass("hide");
				$(".dialog-info").stop(true).fadeToggle(1000).toggleClass("hide");
				$("#passwd").next().removeClass("hide").addClass("iconError");
				$(".tips").html("密码长度不能小于6位");
			}else{
				$("#passwd").next().removeClass("hide").removeClass("iconError");
				$("#Apasswd").next().removeClass("hide").removeClass("iconError");
			}
			if(oPasswd !== Apasswd) {
				$(".dialog-zhezhao").stop(true).fadeToggle(500).toggleClass("hide");
				$(".dialog-info").stop(true).fadeToggle(1000).toggleClass("hide");
				$("#Apasswd").next().removeClass("hide").addClass("iconError");
				$(".tips").html("两次输入的密码不一致，检查后请重新输入");
			}
			else{
				$("#Apasswd").next().removeClass("hide").removeClass("iconError");
			}
			if (!oRegMobile.test(oMobile) && oPasswd.length === 0 && Apasswd.length === 0 && oYanzm === "") {
				$(".dialog-zhezhao").stop(true).fadeToggle(500).toggleClass("hide");
				$(".dialog-info").stop(true).fadeToggle(1000).toggleClass("hide");
				$(".tips").html("请填写信息");
			}
			if (oRegMobile.test(oMobile) && oPasswd.length > 6 && Apasswd.length > 6 && res && oPasswd === Apasswd) {
				$(".dialog-zhezhao").stop(true).fadeToggle(500).toggleClass("hide");
				$(".dialog-info").stop(true).fadeToggle(1000).toggleClass("hide");
				$(".tips").html("注册成功");
			}
			
			
		});
		
	
		
		
		$("#getcode").click(function () {
			clearInterval(oTimer);
			$(this).children("span").eq(0).empty();
			$(this).children("span").eq(1).removeClass("hide");
			oTimer = setInterval(function () {
				oSecond --;
				$("#timeout").html(oSecond);
				if (oSecond === 0) {
					clearInterval(oTimer);
					$("#getcode span").eq(0).html("发送验证码");
					$("#getcode span").eq(1).addClass("hide");
				}
			}, 1000);
		});
		
		
		
		
		
		
		
		
		
		
		
	});








});
















