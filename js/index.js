new Vue({
  el: '#app',
  data:{
  	inApp: true,
    http:"//",
    //http:"//market.Yongche.com",
    activeHref:"https://testing-mall-api.yongche.org/",
    //activeHref:"https://mall.yongche.com/",
    userInfo: {
				userId:"",
				level:0,  	//0-银卡， 1-金卡， 2-白金卡， 3-钻石卡
				orders:0,		//当前订单数
				mileage:0,	//当前完成里程数
				percent:45, //当前等级完成百分比
				isSaveLevel:false  //是否保级状态
			},
		leftOrders:3,
		leftMiles:4,
    isShowDetail:false,  //是否展示权益详情弹窗
    cards:[],
    rightsList:[],
    userLevelRights:[],
    userActives:[]
  },
	computed:{
		lineBar:function(){  //会员等级进度条
			var value = 33*this.userInfo.level;
			//判断是否保级
			if(!this.userInfo.isSaveLevel && this.userInfo.level<3 ){
				value += this.userInfo.percent/3 ;
			}else{
				value += 0;
			}
			return value+'%';
		},
		guide:function(){  //会员等级引导语
			var str;
			if(this.userInfo.level<3){
				str = '差&nbsp;<span class="guideNum">'+this.leftOrders
						+'</span>&nbsp;单或&nbsp;<span class="guideNum">'+this.leftMiles
						+'</span>&nbsp;里程，升级到'+this.userLevelRights[this.userInfo.level+1].levelTitle+'&nbsp;<span class="arrowpng"></span>';
			}else{
				str = '您已经是最高级别享受贵宾权益';
			//str = '差'+ this.leftOrders +'单继续享有钻石卡特权';
			}
			return str;
		}
	},
  created: function(){
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
		  
			/*axios.post('/user', {
		    firstName: 'Fred',
		    lastName: 'Flintstone'
		  })
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });*/
		},
		getUserInfo:function(){
			this.userInfo = {
				userId:"",
				level:2,
				orders:13,
				mileage:15,
				percent:45,
				isSaveLevel:true
			}
			var vm = this;
			this.userActives.forEach(function(item){
				//item.href = vm.activeHref + item.href + vm.userInfo.userId;
				item.href = vm.activeHref + item.href + "3044285";
			})
			
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
  	initSwiper:function(){
  		var swiper = new Swiper('.swiper-container-h', {
  			initialSlide:this.userInfo.level,
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
//,
//router: [
//	{
//		path: '/',
//		redirect: '/recommend'
//	},
//  {
//  	path:'/user',
//  	component:userCenter
//  }
//]
})

