require.config({
	jquery: "js/jquery",
});

require(["jquery"], function ($) {

	$(function () {
		// 上海  划过出现城市列表
		$(".common-region").hover(function () {
			$(this).addClass("select");
			$(".common-regionCon").removeClass("hide");
		}, function () {
			$(this).removeClass("select");
			$(".common-regionCon").addClass("hide");
		});
		// 果园公告和手机果园  鼠标划过效果
		$(".common-topsubnav").hover(function () {
			$(this).toggleClass("select");
			$(this).find(".common-noticelist").toggleClass("hide");
			$(this).find(".common-topcode").toggleClass("hide");
		});
		// 隐藏城市列表
		$(".hotcity-list li").find(".city").addClass("hide");
		//热门城市点击交换内容
		$(".hotcity li a").click(function (){
			$(".topnav-region").empty().append($(this).html() +"<i class='iconfont'>&#xe78a;</i>");
			$(".common-region").removeClass("select");
			$(".common-regionCon").addClass("hide");
		});
		
		// 热门城市列表点击交换内容
		$(".hotcity-list li").click(function (e) {
			e.stopPropagation();
		});
		
		$(".hotcity-list li").click(function (){
			if ($(this).hasClass("sp-city")) {
				$(".topnav-region").empty().append($(this).children().html() +"<i class='iconfont'>&#xe78a;</i>");;
				$(".common-region").removeClass("select");
				$(".common-regionCon").addClass("hide");
			}else if($(this).find(".city")){
				if ($(this).find(".city").hasClass("hide")) {
					$(this).find(".city").stop(true).toggle(300).removeClass("hide");
				}else {
					$(this).find(".city").stop(true).toggle(300).addClass("hide");
				}
				$(".city a").click(function () {
					$(".topnav-region").empty().append($(this).html() +"<i class='iconfont'>&#xe78a;</i>");
					$(".common-region").removeClass("select");
					$(".common-regionCon").addClass("hide");
				});
			}
		});
		
		
		// 出现对话框
		$(".newAddress").click(function () {
			$(".dialog-zhezhao").stop(true).fadeToggle(500).toggleClass("hide");
			$(".dialog-info").stop(true).fadeToggle(1000).toggleClass("hide");
			$(".tips").html("登陆成功");
		});
		
		
		$("#cartbtn").click(function () {
			window.open("shoppingcart.html");
		});
		
		
		// 删除导航下划线
		$(".navbar-list ul li a").click(function () {
			$(".navbar-list ul li em").addClass("hide");
			$(this).siblings().removeClass("hide");
		});
		
		
		// 轮播图
		//console.log($(window).innerWidth());
		var oW  = $(window).innerWidth(),
			oLi = $(".home-banner-list li"),
			aLi = $(".home-banner-btn li"),
			oUl = $(".home-banner-list"),
			oTimer = null,
			oTimer1 = null,
			iNum = 0,
			iNum1 = 0,
			ulWidth = oW * oLi.length;
		$(".frame, .home-banner, .home-banner-list li").css("width", oW);
		oUl.css("width", ulWidth);
		oTimer = setInterval(function () {
			iNum ++;
			aLi.removeClass("active");
			aLi.eq(iNum).addClass("active");
			if (iNum == 9) {
				iNum = 0;
				aLi.eq(0).addClass("active");
			}
			$(".home-banner-list").animate({
				left: -iNum * oW
			}, 1000);
		}, 3000);
		
		$(".home-banner-list, .home-banner-btn").hover(function () {
			clearInterval(oTimer);
		}, function () {
			oTimer = setInterval(function () {
				iNum ++;
				aLi.removeClass("active");
				aLi.eq(iNum).addClass("active");
				if (iNum == 9) {
					iNum = 0;
					aLi.eq(0).addClass("active");
				}
				$(".home-banner-list").animate({
					left: -iNum * oW
				}, 1000);
			}, 3000);
		});
		// 点击小圆点切换图片
		aLi.click(function () {
			aLi.removeClass("active");
			$(this).addClass("active");
			iNum = $(this).index();
			$(".home-banner-list").animate({
				left: -iNum * oW
			}, 1000);
		});
		
		
		// 商品下面购物车图标点击添加商品
		$("#minicart").click(function () {
			$(this).children().eq(0).toggleClass("cartbg");
			$(this).children().eq(0).toggleClass("bg-orange");
			if ($(".cartnum").html() != 0) {
				$(".cartcont").slideToggle(300);
				$(".minicart-pay").removeClass("hide");
				$(".cart-nothing").addClass("hide");
			}else{
				$(".cartcont").slideToggle(300);
				$(".cart-nothing").removeClass("hide");
				$(".minicart-pay").addClass("hide");
			}
			
		});
		
		
		
		// 点击购物框出现遮罩层和购物车
		$(".s-cart, .cha, .fr-buy, .close, .btn-fail, .fr-add a, .anniu, .fr-adding a").click(function () {
			$(this).animate({
				"background-position-y": -291,
				"background-position-x": -514
			}, 500);
			$(".dialog-zhezhao").stop(true).fadeToggle(10).toggleClass("hide");
			$(".dialog-info").stop(true).fadeToggle(500).toggleClass("hide");
			$(".zhezhao").stop(true).fadeToggle(1000).toggleClass("hide");
			$(".shop-cart").stop(true).fadeToggle(500).toggleClass("hide");
		});
		
		$(".cha, .fr-buy").click(function () {
			$(".s-cart").animate({
				"background-position-y": -243,
				"background-position-x": -517
			}, 500);
		});
		
		
		// 水果详情页面
		// 图片轮播
		$(".xiaotu li, .datu li").hover(function (){
			clearInterval(oTimer1);
			$(".datu li, .xiaotu li").removeClass("cur");
			$(this).siblings().children("span").addClass("hide");
			$(this).addClass("cur").children("span").removeClass("hide");
			$(".datu li").eq($(this).index()).addClass("cur");
		}, function () {
			iNum1 = $(this).index();
			oTimer1 = setInterval(function() {
				iNum1 ++;
				if (iNum1 == 3) {
					iNum1 = 0;
				}
				$(".datu li, .xiaotu li").removeClass("cur");
				$(".xiaotu li span").addClass("hide");
				$(".xiaotu li").eq(iNum1).addClass("cur").children("span").removeClass("hide");
				$(".datu li").eq(iNum1).addClass("cur");
			}, 3000);
		});
		oTimer1 = setInterval(function() {
			iNum1 ++;
			if (iNum1 == 3) {
				iNum1 = 0;
			}
			$(".datu li, .xiaotu li").removeClass("cur");
			$(".xiaotu li span").addClass("hide");
			$(".xiaotu li").eq(iNum1).addClass("cur").children("span").removeClass("hide");
			$(".datu li").eq(iNum1).addClass("cur");
		}, 3000);
		
		// 微信
		$(".price01-box2").hover(function () {
			$(".weixin").toggleClass("hide");
		})
		
		$(".good-detail a").click(function () {
			$(".thefruit").toggleClass("hide");
		})
		
		// 详情页加减号
		$(".add").click(function () {
			var prinum = $(this).prev().val();
			 prinum ++;
			$(this).prev().val(prinum);
		});
		$(".redu").click(function () {
			var prinum = $(this).next().val();
			if (parseInt($(this).next().val()) > 1) {
				prinum --;
				$(this).next().val(prinum);
			}
		});
		
		/*
		 *  鲜果页
		 */
		//a点击
		$(".rightpart a").click(function () {
			$(this).parent().children().removeClass("active");
			$(this).addClass("active");
			$(this).parent().prev().children().removeClass("active");
		});
		$(".leftpart a").click(function () {
			$(this).parent().next().children().removeClass("active");
			$(this).addClass("active");
		});
		
		// 确认订单信息页面
		// 收起地址
		$(".more").click(function () {
			$(".order-addresslist").slideToggle(500);
		});
		
		// 付款方式
		$(".pay-methodlist li").click(function (e) {
			e.stopPropagation();
		});
		$(".pay-methodlist li").click(function () {
			$(".pay-methodlist li").removeClass("cur");
			$(this).addClass("cur");
		});
		$(".pay-methodlist li").eq(0).click(function (){
			$(".payways").addClass("hide");
		});
		$(".sp-pay").click(function (){
			$(".payways").toggleClass("hide");
		});
		$(".payways li").click(function () {
			$(".sp-pay").addClass("cur");
			$(".payways li").removeClass("cur");
			$(".payways").addClass("hide");
			$(this).addClass("cur");
			$(".payways").before("-" + $(this).html());
		});
		
		/*$("#submit-log").click(function () {
			$(".dialog-zhezhao").stop(true).fadeToggle(500).toggleClass("hide");
			$(".dialog-info").stop(true).fadeToggle(1000).toggleClass("hide");
			$(".tips").html("注册成功");
		});*/
		
		
		// 登陆页面验证
		$.getJSON("Login.php", function (data){
			// console.log(data);
			$("#submit-log").click(function () {
				var 
					oMobile = $("#user").val(),
					oPasswd = $("#passwd").val();
				$(".dialog-zhezhao").stop(true).fadeToggle(500).toggleClass("hide");
				$(".dialog-info").stop(true).fadeToggle(1000).toggleClass("hide");	
				var bBtn = false;
				for (var i = 0; i < data.length; i ++) {
					if (oMobile === data[i].account && oPasswd === data[i].password) {
						bBtn = true;
						break;
					}
				}
				if (bBtn) {
					$(".send-yanzm span").removeClass("hide").removeClass("iconError");
					$(".password span").removeClass("hide").removeClass("iconError");
					$(".tips").html("登陆成功");
				}else{
					$(".send-yanzm span").removeClass("hide").addClass("iconError");
					$(".password span").removeClass("hide").addClass("iconError");
					$(".tips").html("用户名或密码错误");
				}
			});
		});
		
		
		
		
		// 果园公告内容获取
		$.getJSON("notice.php",{
			page : 1
		}, function (data) {
			// console.log(data);
			data.forEach(function (v) {
				$(".list-detail ul").append(`<li>
						<span class="time flt"></span>
						<span class="pic flt"></span>
						<div class="descripe flt">
							<p class="caption">
								<a href="javascript:;">${v.caption}</a>
							</p>
							<p class="main">
								<a href="javascript:;">${v.main}</a>
							</p>
						</div>
					</li>`);
			});
		});
		
		$(".pagenum a").click(function () {
			$(".pagenum a").removeClass("cur");
			$(this).addClass("cur");
			$(".list-detail ul").empty();
			$.getJSON("notice.php",{
				page : $(this).text()
			}, function (data) {
				// console.log(data);
				data.forEach(function (v) {
					$(".list-detail ul").append(`<li>
							<span class="time flt"></span>
							<span class="pic flt"></span>
							<div class="descripe flt">
								<p class="caption">
									<a href="javascript:;">${v.caption}</a>
								</p>
								<p class="main">
									<a href="javascript:;">${v.main}</a>
								</p>
							</div>
						</li>`);
				});
			});
		});
			
		
		
		
		
		// 点击右下角top回顶部
		$(".return-top").click(function () {
			$(window).scrollTop(0);
		});
	
	
	
	
	});
});
















