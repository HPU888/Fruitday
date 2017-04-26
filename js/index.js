




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
});

















