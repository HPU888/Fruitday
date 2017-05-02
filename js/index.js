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
		$("#submit").click(function () {
			$(".dialog-zhezhao").stop(true).fadeToggle(500).toggleClass("hide");
			$(".dialog-info").stop(true).fadeToggle(1000).toggleClass("hide");
			$(".tips").html("登陆成功");
		})
		
		
		
		
		
		
		
		
		$("#cartbtn").click(function () {
			window.open("shoppingcart.html");
		})
		
		
		
		
		// 删除导航下划线
		$(".navbar-list ul li a").click(function () {
			$(".navbar-list ul li em").addClass("hide");
			$(this).siblings().removeClass("hide");
		});
		
		
		// 轮播图
		console.log($(window).innerWidth());
		var oW  = $(window).innerWidth(),
			oLi = $(".home-banner-list li"),
			oUl = $(".home-banner-list"),
			ulWidth = oW * oLi.length;
		$(".frame, .home-banner, .home-banner-list li").css("width", oW);
		oUl.css("width", ulWidth);
		console.log(oUl.width());
		/*var iNum = 0;
		var oTimer = setInterval(function () {
			iNum ++;
			$(".home-banner-list").animate({
				left: -iNum * liWidth
			}, 1000);
			if (iNum > 8) {
				iNum = 0;
				$(".home-banner-list").css("left", 0);
			}
		}, 2000);*/
		
		
		
		// 商品下面购物车图标点击添加商品
		$("#minicart").click(function () {
			$(".cartbg").css("background", "#f6ab00");
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
		$(".s-cart, .cha, .fr-buy, .close, .btn-fail").click(function () {
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
		
		
		
	
	
	
	
	
	});
});
















