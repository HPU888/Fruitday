




$(function () {
	$(".common-region").hover(function () {
		$(this).toggleClass("select");
		$(".common-regionCon").toggleClass("hide");
	}, function () {
		$(this).toggleClass("select");
		$(".common-regionCon").toggleClass("hide");
	});
	$(".common-topsubnav").hover(function () {
		$(this).toggleClass("select");
		$(this).find(".common-noticelist").toggleClass("hide");
		$(this).find(".common-topcode").toggleClass("hide");
	}, function () {
		$(this).toggleClass("select");
		$(this).find(".common-noticelist").toggleClass("hide");
		$(this).find(".common-topcode").toggleClass("hide");
	});
	
	$(".hotcity-list li").find(".city").addClass("hide");
	$(".hotcity-list li").click(function (){
		if ($(this).find(".city").hasClass("hide")) {
			$(this).find(".city").toggle(300).removeClass("hide");
		}else {
			$(this).find(".city").toggle(300).addClass("hide");
		}
		
	});
	
	// 删除导航下划线
	$(".navbar-list ul li a").click(function () {
		$(".navbar-list ul li em").addClass("hide");
		$(this).siblings().removeClass("hide");
	});
	
	
	// 轮播图
	var iNum = 0;
	var oTimer = setInterval(function () {
		iNum ++;
		$(".home-banner-list").animate({
			left: -iNum * 1903
		}, 1000);
		if (iNum > 8) {
			iNum = 0;
			$(".home-banner-list").css("left", 0);
		}
	}, 2000);
	
	
	// 点击购物框出现遮罩层和购物车
	$(".s-cart, .cha, .fr-buy").click(function () {
		$(this).animate({
			"background-position-y": -291,
			"background-position-x": -514
		}, 500);
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

















