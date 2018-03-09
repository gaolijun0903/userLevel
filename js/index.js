new Vue({
  el: '#app',
  data:{
  	inApp: true,
    http:"//",
    //http:"//market.Yongche.com",
    activeHref:"https://testing-mall-api.yongche.org/",
    //activeHref:"https://mall.yongche.com/",
    token:'',
    userInfo: {
				userId:"",
				level_id:0,  	//0-银卡， 1-金卡， 2-白金卡， 3-钻石卡
				orders:0,		//当前订单数
				mileage:0,	//当前完成里程数
				leftOrders:0, //当月剩余订单数
				leftMiles:0, // 当月剩余里程数
				percent:0, //当前等级完成百分比
				isSaveLevel:false,  //是否保级状态
				isLastMonth:false
		},
    isShowDetail:false,  //是否展示权益详情弹窗
    cards:[],
    rightsList:[],
    userLevelRights:[],
    userActives:[]
  },
	computed:{
		lineBar:function(){  //会员等级进度条
			var value = 33*this.userInfo.level_id;
			//判断是否保级
			if(!this.userInfo.isSaveLevel && this.userInfo.level_id<3 ){
				value += this.userInfo.percent/3 ;
			}else{
				value += 0;
			}
			return value+'%';
		},
		guide:function(){  //会员等级引导语
			var str;
			if(this.userInfo.level_id<3){
				str = '差&nbsp;<span class="guideNum">'+this.userInfo.leftOrders
						+'</span>&nbsp;单或&nbsp;<span class="guideNum">'+this.userInfo.leftMiles
						+'</span>&nbsp;里程，升级到'+this.userLevelRights[this.userInfo.level_id+1].levelTitle+'&nbsp;<span class="arrowpng"></span>';
			}else{
				str = this.userInfo.isLastMonth ? '差'+ this.userInfo.leftOrders +'单继续享有钻石卡特权' : '您已经是最高级别享受贵宾权益';
			}
			return str;
		}
	},
  created: function(){
  	// this.token = this.getCookie('_app_token_v3');
  	this.token = "4_eyeHVgdnL4tGkQWCQQu5Xgb6x0GIAVvTyDJWGXFhc";
  	this.initData();
  },
  methods:{
  	initData:function (){
  		var vm = this;
  		axios.get('data.json')
		  .then(function (response) {
		  	console.log(response)
		  	var data = response.data;
		    vm.cards = data.cards;
		    vm.rightsList = data.rightsList;
		    vm.userLevelRights = data.userLevelRights;
		    vm.userActives = data.userActives;
		    vm.getUserInfo();
		    vm.$nextTick(function(){
		    	vm.initSwiper();
		  		vm.initDetailSwiper();
		    })
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
		},
		getUserInfo:function(){
			var vm = this;
			axios.get('/h5/userinfo?access_token='+this.token)
			  .then(function (response) {
			  	var data = response.data.result;
			  	vm.userInfo.userId = data.user_id;   //会员id
			  	vm.userInfo.level_id = data.level_id-1;  //会员等级
			  	vm.userInfo.orders = data.month_order_count;  //本月完成订单数
			  	vm.userInfo.mileage = data.month_mileage;  //本月完成公里数
			  	vm.userInfo.percent = data.month_complete;  //当月完成百分比 66%（里程百分比and订单百分比 取最大值）
			  	vm.userInfo.leftOrders = data.remainder_mileage; //剩余里程数
			  	vm.userInfo.leftMiles = data.remainder_order_count; //剩余订单数
			  	vm.userInfo.isSaveLevel = data.is_preserve_level;  //是否保级，1：是  ，0：否
			  	vm.userInfo.isLastMonth = data.preserve_level_month;  //是否保级的最后一个月 0:否
			  	
			  	console.log(vm.userInfo);
			  	vm.userActives.forEach(function(item){
						item.href = vm.activeHref + item.href + vm.userInfo.userId;
						//item.href = vm.activeHref + item.href + "3044285";
					})
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
		},
		showDetail:function(idx){
			this.isShowDetail = true;
			this.swiperDetail.slideTo(idx);
		},
		closeDetail:function(){
			this.isShowDetail = false;
		},
		showRules:function(){
			window.location.href = "./rule.html";
		},
		getCookie:function (name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
  	initSwiper:function(){
  		var swiper = new Swiper('.swiper-container-h', {
  			initialSlide:this.userInfo.level_id,
	      slidesPerView: 2,
	      spaceBetween: 12,
	      centeredSlides: true,
	      pagination: {
	        el: '.swiper-pagination',
	        clickable: true,
	      }
	    });
  	},
  	initDetailSwiper:function(){
  		this.swiperDetail = new Swiper('.swiperin', {
        initialSlide :1,
	      pagination: {
	        el: '.swiper-pagination',
	        clickable: true,
	      },
		    observer:true ,//修改swiper自己或子元素时，自动初始化swiper
		    observeParents:true,//修改swiper的父元素时，自动初始化swiper
    	});
  	}
  }
})

