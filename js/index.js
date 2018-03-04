new Vue({
  el: '#app',
  data:{
  	inApp: true,
    http:"//yaoyakun-market.Yongche.org",
    //http:"//market.Yongche.com",
    userInfo: {
				userId:"",
				level:0,
				orders:0,
				mileage:0
			},
		leftOrders:3,
		leftMiles:4,
    currentLevel:0,
    guide:'',
    lineBar:'50%',
    isShowDetail:false,
    cards:[],
    rightsList:[],
    userLevelRights:[],
    userActives:[]
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
		    vm.initScroll();
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
				level:3,
				orders:13,
				mileage:15,
				isSaveLevel:true
			}
			//判断是否保级
			/*if(this.userInfo.isSaveLevel){
					
			}else{
				
			}*/
			
		
				
			if(this.userInfo.level<3){
				this.guide = '差&nbsp;<span class="guideNum">'+this.leftOrders+'</span>&nbsp;单或&nbsp;<span class="guideNum">'+this.leftMiles+'</span>&nbsp;里程，升级到'+this.userLevelRights[this.userInfo.level+1].levelTitle+'&nbsp;&gt;'
			}else{
				this.guide = '您已经是最高级别享受贵宾权益'
			}
		},
		showDetail:function(idx){
			this.isShowDetail = true;
			this.swiperDetail.slideTo(idx);
		},
		closeDetail:function(){
			console.log(111)
			this.isShowDetail = false;
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
  	},
  	initScroll:function(){
  		var scroll = new Swiper('.scroll-container', {
	      direction: 'vertical',
	      slidesPerView: 'auto',
	      freeMode: true
	    });
  	}
	
	
	
 }
})

