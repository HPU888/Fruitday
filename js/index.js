




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
			$(this).css("border-bottom", "1px dashed #eee");
			$(this).find(".city").toggle(300).removeClass("hide");
		}else {
			$(this).find(".city").toggle(300).addClass("hide");
			$(this).css("border-bottom", "1px solid #eee");
		}
		
	});
	
	
	// 删除导航下划线
	$(".navbar-list ul li a").click(function () {
		$(".navbar-list ul li em").addClass("hide");
		$(this).siblings().removeClass("hide");
	});
	
	
});

















