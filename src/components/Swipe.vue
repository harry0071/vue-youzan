//轮播组件
//需要从外面传入bannerLists:[{link:'',img:''}]
<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="banner in bannerLists">
        <a class="js-no-follow" :href="banner.link">
          <img class="goods-main-photo fadeIn" :src="banner.img">
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
	import Swiper from 'swiper';
	import 'swiper/dist/css/swiper.min.css'

	export default {
		name:'swipe',
		props:['bannerLists'],
		mounted(){
			new Swiper('.swiper-container', {
				pagination:{el:'.swiper-pagination',clickable:true,},
				loop:true,
				autoplay:{delay: 4000,disableOnInteraction:false,},
			});
		},
	};
</script>

<style>
.swiper-slide img{
	width: 100%;
	height: 100%;
}
</style>