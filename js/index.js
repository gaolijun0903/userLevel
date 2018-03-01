new Vue({
  el: '#app',
  data:{
  	inApp: true,
    http:"//yaoyakun-market.Yongche.org",
    //http:"//market.Yongche.com",
    currentLevel:0,
    showDetail:false,
    cards:[],
    rightsList:[],
    userLevelRights:[]
  },
  mounted: function(){
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
  	initSwiper:function(){
  		var swiper = new Swiper('.swiper-container-h', {
  			initialSlide:this.currentLevel,
	      slidesPerView: 2,
	      spaceBetween: 24,
	      centeredSlides: true,
	      pagination: {
	        el: '.swiper-pagination',
	        clickable: true,
	      }
	    });
  	},
  	initDetailSwiper:function(){
  		var swiper1 = new Swiper('.swiperin', {
        initialSlide :1,
        pagination: '.swiper-pagination-w',
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

