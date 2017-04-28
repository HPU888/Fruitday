require.config({
	jquery: "./js/jquery",
	cookie: "./js/cookie"
});

require(["jquery", "cookie"], function ($, cookie) {
	$(function () {
		
		
		var totalPrice = 0;
		// 最开始从后台获取数据
		var sCookie = cookie.getCookie("goods");
		var aCookie = typeof sCookie === "undefined" ? [] : JSON.parse(sCookie);
		var sTotal  = cookie.getCookie("total");
		var aTotal = typeof sTotal === "undefined" ? [] : Number(sTotal);
		$(".cartnum").empty();
		$(".cartnum").append(aCookie.length);
		//console.log(aTotal);
		$(".cartcont ul").empty();
		aCookie.forEach(function (v) {
		$(".cartcont ul").append(`<li  data-pid="${v.pid}">
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
		
		// 加减号改变商品
			
		$(".btn-minus").click(function () {
			if (parseInt($(this).next().val()) > 1) {
				for (var i = 0; i < aCookie.length; i ++) {
					if (aCookie[i].pid == $(this).parent().parent().data("pid")) {
						aCookie[i].num --;
						aTotal --;
						$(this).next().val(aCookie[i].num);
						
						$(".cartcount").empty();
						$(".cartcount").append(aTotal);
						
						totalPrice += aCookie[i].price * aCookie[i].num;
						$(".cartprice, .cartprice1").empty();
						$(".cartprice").append("￥" + totalPrice.toFixed(2));
						$(".cartprice1").append(totalPrice.toFixed(2));
					}
				}
			}
			
			
			cookie.setCookie("goods", JSON.stringify(aCookie), 7);
			cookie.setCookie("total", total, 7);
		});
		$(".btn-plus").click(function () {
			for (var i = 0; i < aCookie.length; i ++) {
				if (aCookie[i].pid == $(this).parent().parent().data("pid")) {
					aCookie[i].num ++;
					aTotal ++;
					$(this).prev().val(aCookie[i].num);
					
					$(".cartcount").empty();
					$(".cartcount").append(aTotal);
					
					totalPrice += aCookie[i].price * aCookie[i].num;
					$(".cartprice, .cartprice1").empty();
					$(".cartprice").append("￥" + totalPrice.toFixed(2));
					$(".cartprice1").append(totalPrice.toFixed(2));
				}
				
				
			}
			
			cookie.setCookie("goods", JSON.stringify(aCookie), 7);
			cookie.setCookie("total", total, 7);
		});
		// 点击删除按钮，删除商品
		$(".mincart-delete").click(function () {
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
			
			cookie.setCookie("goods", JSON.stringify(aCookie), 7);
			cookie.setCookie("total", total, 7);
		});
		
		
		
		
		// 购物车商品总数量
		$(".cartcount").empty();
		$(".cartcount").append(aTotal);
		
		
		
		// 点击购物车添加商品
		var total = 0;
		$(".s-cart").click(function () {
			
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
										<input class="set-num-in" type="text" value="${v.num}" />
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






































































