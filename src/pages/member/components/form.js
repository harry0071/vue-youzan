import { MessageBox } from 'mint-ui';
import { mapState } from 'vuex';
export default {
	data(){
		return {
			name:'',
			tel:'',
			pValue:-1,
			province:'',
			cValue:-1,
			city:'',
			ctValue:-1,
			county:'',
			address:'',
			isDefault:false,
			id:-1,
			type:this.$route.query.type,
			obj:this.$route.query.obj,
			addressData:require('js/address.json'),
			cityList:[],
			countyList:[],
		}
	},
	computed: {
	  ...mapState(['lists'])
	},
	watch:{
		lists:{
			handler(){
				this.$router.go(-1);
			},
			deep:true
		},
		pValue(newVal){
			if (newVal == -1) {
				return;
			} else {
				let list = this.addressData.list;
				list.forEach(item => {
					if (item.value == newVal) {
						this.province = item.label;
					}
				});
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
				cityList.forEach(item => {
					if (item.value == newVal) {
						this.city = item.label;
					}
				});
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
		ctValue(newVal){
			let ctList = this.countyList;
			ctList.forEach(item => {
				if (item.value == newVal) {
					this.county = item.label;
				}
			});
		}
	},
	created(){
		if (this.type == 'edit') {
			Object.assign(this,{
				name:this.obj.name,
				tel:this.obj.tel,
				pValue:this.obj.pValue,
				address:this.obj.address,
				isDefault:this.obj.isDefault,
				id:this.obj.id,
			});

		}
	},
	methods:{
		saveAddress(){
			let {name,tel,pValue,province,cValue,city,ctValue,county,address,isDefault,id} = this;
			let data = {name,tel,pValue,province,cValue,city,ctValue,county,address,isDefault,id};
			if (this.type == 'add') {
				this.$store.dispatch('addAddress',data);
			} else if (this.type == 'edit') {
				this.$store.dispatch('editAddress',data);
				//this.$router.go(-1);
			}
		},
		removeAddress(){
			MessageBox.confirm('确定要删除吗?').then(yes => {
				this.$store.dispatch('removeAddress',this.id);
			},
			cancel => {
				return;
			});
		},
		setDefault(){
			this.$store.dispatch('setDefault',this.id);
		},
	},
}