import axios from 'axios';
import url from 'js/api.js';

function fetch(url,data) {
	return new Promise((resolve,reject) => {
		axios.get(url,data).then(res => {
			//如果状态码是200
			if(res.data.status === 200){
				resolve(res);
			}else{
				reject(res);
			}
		}).catch(error => {
			document.write(error);
		});
	});
}

export default fetch;