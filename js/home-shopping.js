require.config({
	jquery: "./js/jquery",
	cookie: "./js/cookie"
});

require(["jquery", "cookie"], function ($, cookie) {
	$(function () {
		
		
		var total = 0;
		
		$(".s-cart").click(function () {
			total ++;
			var totalPrice = 0;
			
			// var sCookie = cookie.getCookie("goods");
			// var aCookie = typeof sCookie === "undefined" ? [] : JSON.parse(sCookie);
		
			
			
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
			$(".cartcount").append(" " + total + " ");
			
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
					pid:    $(this).data("pid"),
					name: $(this).data("name"),
					price: $(this).data("price"),
					src:   $(this).data("src"),
					num:   1,
				};
				aGoods.push(oGoods);
			}
			
			// 购物车总价格
			for (var i = 0; i < aGoods.length; i++) {
				totalPrice += aGoods[i].price * aGoods[i].num;
			}
			$(".cartprice").empty();
			$(".cartprice").append("￥" + totalPrice);
			// 小购物车显示商品种类的数量
			$(".cartnum").empty();
			$(".cartnum").append(aGoods.length);
			// 存储cookie
			cookie.setCookie("goods", JSON.stringify(aGoods), 7);
			cookie.setCookie("total", total, 7);
		});
		
		
	});
});






































































