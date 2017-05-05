require.config({
	jquery: "js/jquery",
	cookie: "js/cookie",
	index: "js/index"
});

require(["jquery", "cookie", "index"], function ($, cookie, index) {
		
	$(function (){
		var total = 0;
		var totalPrice = 0;	
		// 最开始从后台获取数据
		var sCookie = cookie.getCookie("goods");
		var aCookie = typeof sCookie === "undefined" ? [] : JSON.parse(sCookie);
		var sTotal  = cookie.getCookie("total");
		var aTotal = typeof sTotal === "undefined" ? [] : Number(sTotal);
		$(".cartnum").empty();
		$(".cartnum").append(aCookie.length);
		// 首页小购物车
		$(".cartcont ul").empty();
		aCookie.forEach(function (v) {
		$(".cartcont ul").append(`<li data-pid="${v.pid}">
								<a href="javascript:;">
									<img src="${v.src}"/ class="flt">
									<div class="minicart-info">
										<h5>${v.name}</h5>
										<h5>￥${v.price}/${v.unit}</h5>
									</div>
								</a>
								<div class="mincart-modify">
									<span class="minicart-act btn-minus">-</span>
									<input class="set-num-in" type="text" value="${v.num}" />
									<span class="minicart-act btn-plus">+</span>
								</div>
								<span class="mini-cartlist-delete mincart-delete">删除</span>
							</li>`);
		});
		// 购物车页面
		$(".cart-order ul").empty();
		aCookie.forEach(function (v) {
			$(".cart-order ul").append(`<li  data-pid="${v.pid}">
								<div class="cart-box ">
									<div class="cartorder-select flt"></div>
									<div class="cart-img flt">
										<a href="javascript:;">
											<img class="flt" src="${v.src}"/>
										</a>
									</div>	
									<div class="cart-name flt">
										<a href="javascript:;">${v.name}</a>
									</div>
									<div class="spec-num flt">${v.unit}</div>
									<div class="single-price flt">￥${v.price}</div>
									<div class="num-set flt">
										<span class="num flt btn-minus">-</span>
										<input class="flt" type="text" name="" value="${v.num}" readonly />
										<span class="num flt btn-plus">+</span>
									</div>
									<div class="sum flt">￥${(v.num * v.price).toFixed(2)}</div>
									<div class="delete cartlist-delete flt">删除</div>
								</div>
							</li>`);
		});
		
		// 确认订单信息页面
		$(".send-cartlist").empty();
		aCookie.forEach(function (v) {
			$(".send-cartlist").append(`<li>
						<dl class="clearfix">
							<dt>
								<img src="${v.src}"/>
							</dt>
							<dd>
								<div class="protitle">
									${v.name}
								</div>
								<div class="proinfo">
									￥${v.price} / ${v.unit} <span>x ${v.num}</span>
								</div>
							</dd>
						</dl>
					</li>`);
		});
		
		
		
		// 减号改变商品数量
		$(".btn-minus").click(function () {
			var totalPrice = 0;
			if (parseInt($(this).next().val()) > 1) {
				for (var i = 0; i < aCookie.length; i ++) {
					if (aCookie[i].pid == $(this).parent().parent().data("pid") || aCookie[i].pid == $(this).parent().parent().parent().data("pid")) {
						aCookie[i].num --;
						aTotal --;
						$(this).next().val(aCookie[i].num);
						
						$(".cartcount").empty();
						$(".cartcount").append(aTotal);
						
						$(".pay-count").empty();
						$(".pay-count").append(aTotal + "件");
						
						$(this).parent().siblings(".sum").empty();
						$(this).parent().siblings(".sum").append("￥" + (aCookie[i].price * aCookie[i].num).toFixed(2));
						
						for (var j = 0; j < aCookie.length; j++) {
							totalPrice += aCookie[j].price * aCookie[j].num;
						}
						$(".cartprice, .cartprice1, .total-price").empty();
						$(".cartprice, .total-price").append("￥" + totalPrice.toFixed(2));
						$(".cartprice1").append(totalPrice.toFixed(2));
					}
				}
			}
			// 存入Cookie
			cookie.setCookie("goods", JSON.stringify(aCookie), 7);
			cookie.setCookie("total", aTotal, 7);
		});
		// 加号改变商品数量
		$(".btn-plus").click(function () {
			var totalPrice = 0;
			for (var i = 0; i < aCookie.length; i ++) {
				if (aCookie[i].pid == $(this).parent().parent().data("pid") || aCookie[i].pid == $(this).parent().parent().parent().data("pid")) {
					aCookie[i].num ++;
					aTotal ++;
					$(this).prev().val(aCookie[i].num);
					
					$(".cartcount").empty();
					$(".cartcount").append(aTotal);
					
					$(".pay-count").empty();
					$(".pay-count").append(aTotal + "件");
					
					$(this).parent().siblings(".sum").empty();
					$(this).parent().siblings(".sum").append("￥" + (aCookie[i].price * aCookie[i].num).toFixed(2));
					
					for (var j = 0; j < aCookie.length; j++) {
						totalPrice += aCookie[j].price * aCookie[j].num;
					}
					$(".cartprice, .cartprice1, .total-price").empty();
					$(".cartprice, .total-price").append("￥" + totalPrice.toFixed(2));
					$(".cartprice1").append(totalPrice.toFixed(2));
				}
			}
			// 存入Cookie
			cookie.setCookie("goods", JSON.stringify(aCookie), 7);
			cookie.setCookie("total", aTotal, 7);
		});
		
		// 首页点击删除按钮，删除商品
		$(".mincart-delete").click(function () {
			var totalPrice = 0;
			$(this).parent().remove();
			for (var i = 0; i < aCookie.length; i ++) {
				if (aCookie[i].pid == $(this).parent().data("pid")) {
					aTotal -= aCookie[i].num;
					aCookie.splice(i, 1);
					$(".cartcount").empty();
					$(".cartcount").append(aTotal);
					
					$(".cartnum").empty();
					$(".cartnum").append(aCookie.length);
					
					for (var j = 0; j < aCookie.length; j++) {
						totalPrice += aCookie[j].price * aCookie[j].num;
					}
					$(".cartprice, .cartprice1").empty();
					$(".cartprice").append("￥" + totalPrice.toFixed(2));
					$(".cartprice1").append(totalPrice.toFixed(2));
				}
			}
			if (aCookie.length === 0 ) {
				$(".cart-nothing").removeClass("hide");
				$(".minicart-pay").addClass("hide");
				
			}
			// 存入Cookie
			cookie.setCookie("goods", JSON.stringify(aCookie), 7);
			cookie.setCookie("total", aTotal, 7);
		});
		
		// 购物车页面删除按钮
		$(".delete").click(function () {
			var totalPrice = 0;
			$(".dialog-zhezhao").stop(true).fadeIn(500).toggleClass("hide");
			$(".dialog-info").stop(true).fadeIn(500).toggleClass("hide");
			$(".btn-success").click(function () {
				$(".dialog-zhezhao").stop(true).fadeOut(50).toggleClass("hide");
				$(".dialog-info").stop(true).fadeOut(200).toggleClass("hide");
				$(this).parent().parent().remove();
				
				for (var i = 0; i < aCookie.length; i ++) {
					if (aCookie[i].pid == $(this).parent().parent().data("pid")) {
						aTotal -= aCookie[i].num;
						aCookie.splice(i, 1);
						
						$(".pay-count").empty();
						$(".pay-count").append(aTotal + "件");
						
						for (var j = 0; j < aCookie.length; j++) {
							totalPrice += aCookie[j].price * aCookie[j].num;
						}
						$(".total-price").empty();
						$(".total-price").append("￥" + totalPrice.toFixed(2));
					}
				}
			
				if (aCookie.length === 0 ) {
					$(".cart-empty").removeClass("hide");
					$(".cart-footer").addClass("hide");
				}
				// 存入Cookie
				cookie.setCookie("goods", JSON.stringify(aCookie), 7);
				cookie.setCookie("total", aTotal, 7);
			}.bind(this));  //改变this指向
		});	
		
		// 购物车页面列表显示
		if (aCookie.length >= 1 ) {
			$(".cart-empty").addClass("hide");
			$(".cart-footer").removeClass("hide");
			
		}else{
			$(".cart-empty").removeClass("hide");
			$(".cart-footer").addClass("hide");
		}
		
		
		for (var j = 0; j < aCookie.length; j++) {
			totalPrice += aCookie[j].price * aCookie[j].num;
			total += aCookie[j].num;
		}
		// 首页显示总价格
		$(".cartprice, .cartprice1").empty();
		$(".cartprice").append("￥" + totalPrice.toFixed(2));
		$(".cartprice1").append(totalPrice.toFixed(2));
		// 购物车页面总价格
		$(".total-price").empty();
		$(".total-price").append("￥" + totalPrice.toFixed(2));
		
		// 首页购物车商品总数量
		$(".cartcount").empty();
		$(".cartcount").append(total);
		// 购物车页面总数量
		$(".pay-count").empty();
		$(".pay-count").append(total + "件");
		
		

		// 点击购物车添加商品
		$(".s-cart, .anniu").click(function () {
			$(".cartcont").slideUp(50);
			
			var total = 0;
			var totalPrice = 0;
			// 购物总数量
			var Total = cookie.getCookie("total");
			if(typeof Total === "undefined") {
				total = 1;
			} else {
				var aTotal = Number(Total);
				total = aTotal + 1;	
			}
			// 购物车商品总数量
			$(".cartcount").empty();
			$(".cartcount").append(total);
			// 第一次添加商品			
			var
				isAdd = false,  // 假设没有商品，没有添加过
				sGoods = cookie.getCookie("goods");
				
			if(typeof sGoods === "undefined") {
				var aGoods = []; // 相当于购物的车子
			} else {
				var aGoods = JSON.parse(sGoods);

				// 判断当前商品有没有添加过
				for(var i = 0; i < aGoods.length; i++) {
					if(aGoods[i].pid == $(this).data("pid")) {
						aGoods[i].num++;
						isAdd = true;
						break;
					}
				}
			}
			// 如果isAdd为false,说明商品没有添加过
			if(!isAdd) {
				var oGoods = {
					pid:   $(this).data("pid"),
					name:  $(this).data("name"),
					price: $(this).data("price"),
					src:   $(this).data("src"),
					unit:  $(this).data("unit"),
					num:   1,
				};
				aGoods.push(oGoods);
			}
			// 显示购物车中商品列表
			$(".cartcont ul").empty();
			aGoods.forEach(function (v) {
			$(".cartcont ul").append(`<li>
									<a href="javascript:;">
										<img src="${v.src}"/ class="flt">
										<div class="minicart-info">
											<h5>${v.name}</h5>
											<h5>￥${v.price}/${v.unit}</h5>
										</div>
									</a>
									<div class="mincart-modify">
										<span class="minicart-act btn-minus">-</span>
										<input class="set-num-in" type="text" value="${v.num}" readonly/>
										<span class="minicart-act btn-plus">+</span>
									</div>
									<span class="mini-cartlist-delete mincart-delete">删除</span>
								</li>`);
			});
			
			// 购物车总价格
			for (var i = 0; i < aGoods.length; i++) {
				totalPrice += aGoods[i].price * aGoods[i].num;
			}
			$(".cartprice, .cartprice1").empty();
			$(".cartprice").append("￥" + totalPrice.toFixed(2));
			$(".cartprice1").append(totalPrice.toFixed(2));
			// 小购物车显示商品种类的数量
			$(".cartnum").empty();
			$(".cartnum").append(aGoods.length);
			// 存储cookie
			cookie.setCookie("goods", JSON.stringify(aGoods), 7);
			cookie.setCookie("total", total, 7);
		});
		
		// 点击详情页添加商品（第一个按钮）
		$(".fr-adding a").click(function () {
			$(".cartcont").slideUp(50);
			var iN = parseInt($(".sp-input").val());
			//console.log(iN);
			var total = 0;
			var totalPrice = 0;
			// 购物总数量
			var Total = cookie.getCookie("total");
			if(typeof Total === "undefined") {
				total = iN;
			} else {
				var aTotal = Number(Total);
				total = aTotal + iN;	
			}
			// 购物车商品总数量
			$(".cartcount").empty();
			$(".cartcount").append(total);
			// 第一次添加商品			
			var
				isAdd = false,  // 假设没有商品，没有添加过
				sGoods = cookie.getCookie("goods");
				
			if(typeof sGoods === "undefined") {
				var aGoods = []; // 相当于购物的车子
			} else {
				var aGoods = JSON.parse(sGoods);

				// 判断当前商品有没有添加过
				for(var i = 0; i < aGoods.length; i++) {
					if(aGoods[i].pid == $(this).data("pid")) {
						aGoods[i].num += iN;
						isAdd = true;
						break;
					}
				}
			}
			// 如果isAdd为false,说明商品没有添加过
			if(!isAdd) {
				var oGoods = {
					pid:   $(this).data("pid"),
					name:  $(this).data("name"),
					price: $(this).data("price"),
					src:   $(this).data("src"),
					unit:  $(this).data("unit"),
					num:   iN,
				};
				aGoods.push(oGoods);
			}
			// 显示购物车中商品列表
			$(".cartcont ul").empty();
			aGoods.forEach(function (v) {
			$(".cartcont ul").append(`<li>
									<a href="javascript:;">
										<img src="${v.src}"/ class="flt">
										<div class="minicart-info">
											<h5>${v.name}</h5>
											<h5>￥${v.price}/${v.unit}</h5>
										</div>
									</a>
									<div class="mincart-modify">
										<span class="minicart-act btn-minus">-</span>
										<input class="set-num-in" type="text" value="${v.num}" readonly/>
										<span class="minicart-act btn-plus">+</span>
									</div>
									<span class="mini-cartlist-delete mincart-delete">删除</span>
								</li>`);
			});
			
			// 购物车总价格
			for (var i = 0; i < aGoods.length; i++) {
				totalPrice += aGoods[i].price * aGoods[i].num;
			}
			$(".cartprice, .cartprice1").empty();
			$(".cartprice").append("￥" + totalPrice.toFixed(2));
			$(".cartprice1").append(totalPrice.toFixed(2));
			// 小购物车显示商品种类的数量
			$(".cartnum").empty();
			$(".cartnum").append(aGoods.length);
			// 存储cookie
			cookie.setCookie("goods", JSON.stringify(aGoods), 7);
			cookie.setCookie("total", total, 7);
		});
		
	});
});






































































