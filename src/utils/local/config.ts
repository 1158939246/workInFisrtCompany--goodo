/*
 * @Author: migao@wangguoyan 
 * @Date: 2021-10-26 17:09:23 
 * @Last Modified by: migao@wangguoyan
 * @Last Modified time: 2021-11-02 16:53:37
 */

import configJSON from '../../../config.json';

export class ConfigMeta {

    /**
     * @description 装载config.json中的配置到 localStorage 中
     */
    public static load(){
        localStorage.setItem('plat-pad-config', JSON.stringify(configJSON));
    }

    /**
     * @description 获取服务调用接口前缀
     */
    public static get API_PREFIX(): string{
        ConfigMeta.load();
        const configStr = localStorage.getItem('plat-pad-config')!;
        const configData = <{[key: string]: Config.OriginOne<string>}>JSON.parse(configStr);
        return configData['API_PREFIX'].value;
    }
}