	//国家汇率数组
	var country = new Array();
	//当前被输入金额选项框的id
	var maneyId = "";
	//当前输入的金额
	var maneyNum = "";
	//当前输入币种转换成人民币的金额
	var maneyCNNum = "";
	/*
		localStorage提供对W3C Storage接口的访问，可以使用键值对的方式存储数据。
		key：返回指定位置的键的名称。
		getItem： 返回指定键所对应的记录。
		setItem：存储一个键值对。
		removeItem：删除指定键对应的记录。
		clear：删除所有的键值对。
	*/
	var storage = window.localStorage;
	//初始化
	function init() {
		//初始化全部汇率
		//美元兑人民币
		country[0]=634.51;
		//日元兑人民币
		country[1]=8.09;
		//巴西里尔兑人民币
		country[2]=311.25;
		//新加坡元兑人民币
		country[3]=510.72;
		//欧元兑人民币
		country[4]=800;
		//瑞典克朗兑人民币
		country[5]=94.31;
		//英镑兑人民币
		country[6]=1009.18;
		
		//把保存全部的函数插入到返回按钮的点击事件中
		$("#backAndSave").bind("click",function(){changeRates();});

		//遍历country比对本地是否有更新的汇率信息
		var allCountry = country.length;

		for(var i=0;i<allCountry;i++){
			//判断每个项目是否有存储信息
			var r = i + 2;
			if(storage.getItem("r"+r)==null){
				//如果没有，那么将初始化的汇率写入本地存储
				storage.setItem("r"+r,country[i]);
			}else{
				//如果有信息，将汇率信息写入对应的国家数组
				country[i]=storage.getItem("r"+r);
			}
		}
		//将汇率写入汇率设置表单
		showER();

		//将汇率计算方法插入到每一个钱数框中(c1~c8),因为多了一个中国选项，所以要比汇率输入框多一个
		for(var i=0;i<=allCountry;i++){
			var c = i + 1;
			$("#c"+c).bind("keyup change",function(){this.value = numberAndPoint(this.value);exchangeRates(this);});
		}

		//将汇率设置表单中的事件
		for(var i=0;i<allCountry;i++){
			var r = i + 2;
			$("#r"+r).bind("keyup change",function(){this.value = numberAndPoint(this.value);});
		}
	}
	//格式化数字，保留num位小数
	function formatNum(str,num){
		var s = parseFloat(str);
		if(!num) num=4;
		if(isNaN(s)){
			return;
		}
		s = s.toFixed(num);
		if(s=="" || s<0) s=0;
		return s;
	}
	//格式化数字，输入只能是数字和小数点
	function numberAndPoint(str) {
		return str.replace(/[^(\d|\.)]/g,'');
	}
	//汇率兑换
	function exchangeRates(str){
		maneyId = str.id;
		maneyNum = str.value;
		var maneyCNid = maneyId;
		maneyCNid = maneyCNid.substr(1,maneyId.length)-2;
		maneyCNNum = maneyNum * (country[maneyCNid] / 100);
		var tempNum = 0;
		//对于汇率来说，我们每个国家的汇率，都是针对人民币换算的，那么要要做所以币种互相换算要怎么做呢，可以把换算分两类去写
		//首先遍历所有的金钱输入框
		$(".exchangeRates").find("input").each(
			function(){
				if(this.id != maneyId){
					//如果当前输入的是否是人民币(c1)
					if(maneyId == "c1"){
						if(this.id != "c1"){
							var thisNum = maneyNum*(100/country[tempNum]);
							$(this).val(formatNum(thisNum,2));
							tempNum++;
						}
					}else{
						if(this.id != "c1"){
							var thisNum = maneyCNNum*(100/country[tempNum]);
							$(this).val(formatNum(thisNum,2));
							tempNum++;
						}else{
							//var thisNum = maneyNum*(100/country[tempNum]);
							$(this).val(formatNum(maneyCNNum,2));
						}
					}
				}else{
					if(maneyId != "c1"){
						tempNum++;
					}
				}
			}
		);
	}

	//将汇率设置框中的值(value)传入到本地存储中以及改变国家汇率数组
	function changeRates(){
		for(var i=0;i<country.length;i++){
			var r = i+2;
			storage.setItem("r"+r,$("#r"+r).val());
			country[i]=$("#r"+r).val();
		}
		
	}

	//将汇率写入汇率设置表单
	function showER(){
		for(var i=0;i<country.length;i++){
			var r = i+2;
			//写入r2~r8的值
			$("#r"+r).val(country[i]);
		}
	}