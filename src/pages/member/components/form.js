import { MessageBox } from 'mint-ui';
export default {
	data(){
		return {
			name:'',
			tel:'',
			pValue:-1,
			cValue:-1,
			ctValue:-1,
			address:'',
			id:-1,
			type:this.$route.query.type,
			obj:this.$route.query.obj,
			addressData:require('js/address.json'),
			cityList:[],
			countyList:[],
		}
	},
	watch:{
		pValue(newVal){
			if (newVal == -1) {
				return;
			} else {
				let list = this.addressData.list;
				let ListIndex = list.findIndex(province => {
					return province.value == newVal;
				})
				this.cityList = list[ListIndex].children;
				if (this.type == 'edit') {
					this.cValue = this.obj.cValue;
					this.obj.cValue = -1;
					this.ctValue = -1;
				} else {
					this.cValue = -1;
					this.ctValue = -1;
				}

			}
		},
		cValue(newVal){
			if (newVal == -1) {
				return;
			} else {
				let cityList = this.cityList;
				let cityIndex = cityList.findIndex(city => {
					return city.value == newVal;
				})
				this.countyList = cityList[cityIndex].children;

			if (this.type == 'edit') {
				this.ctValue = this.obj.ctValue;
				this.obj.ctValue = -1;
			}else {
				this.ctValue = -1;
			}
				
			}

		},
	},
	created(){
		if (this.type == 'edit') {
			Object.assign(this,{
				name:this.obj.name,
				tel:this.obj.tel,
				pValue:this.obj.pValue,
				address:this.obj.address,
				id:this.obj.id,
			});

		}
	},
	methods:{
		addAddress(){
			let {name,tel,pValue,cValue,ctValue,address} = this;
			let data = {name,tel,pValue,cValue,ctValue,address};
			if (this.type == 'add') {
				//axios.post()保存到后台
				this.$router.go(-1);//后退一步
			} else if (this.type == 'edit') {
				//编辑更新到后台
				this.$router.go(-1);
			}
		},
		remove(){
			MessageBox.confirm('确定要删除吗?').then(yes => {
				//传给后台id进行删除
				this.$router.go(-1);
			},
			cancel => {
				return;
			});
		},
		setDefault(){
			//传给后台id，将其设为默认
			this.$router.go(-1);
		},
	},
}