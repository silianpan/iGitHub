/**
 * 获取href页面参数name
 */
export const getQueryString = name => {
	// 方法一：正则
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
	var r = window.location.search.substr(1).match(reg)
	if (r != null) return unescape(r[2])
	return null
	
	// 方法二：字符串
	// var url = window.location.search;
	// var theRequest = new Object();
	// if (url.indexOf("?") != -1) {
	// var str = url.substr(1);
	// var strs = str.split("&");
	// for (var i = 0; i < strs.length; i++) {
	//     theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
	//     }
	// }
}
