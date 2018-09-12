//后台接口地址
let url = {
	hotLists:'/index/hotLists',//最热商品推荐
	bannerLists:'/index/bannerLists',//首页轮播图
	kinds:'/category/kinds',//分类页对应cid
	items:'/category/items',//分类页品牌
	searchHotItems:'/search/hotItems',//搜索热门品牌
	goodsDetail:'/goods/details',//商品详情页
	goodsDeal:'/goods/deal',//本店成交
	cartLists:'/cart/lists',//购物车页
	mylists:'/address/mylists',//我的地址列表
};

//通过注释手动切换接口域名
//let host = ''; //真实后台域名
let host = 'https://easy-mock.com/mock/5b0f9157b6b9de5a525896c6/youzan';//测试用的虚拟域名

for (let key in url) {
	url[key] = host + url[key];
}

export default url;