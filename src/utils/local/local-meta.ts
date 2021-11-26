/*
 * @Author: migao@wangguoyan 
 * @Date: 2021-10-26 17:10:21 
 * @Last Modified by:   migao@wangguoyan 
 * @Last Modified time: 2021-10-26 17:10:21 
 */

export class LocalMeta {
	/**
	 * @description 获取浏览器IP和端口
	 */
	public static get baseUrl(): string {
		var url = window.document.location.href;
		var reg = new RegExp(/(\w+):\/\/([^/:]+)(:\d*)?/);
        // 返回的IP和端口后面不带"/"
		return url.match(reg)![0] || '';
	}
}
