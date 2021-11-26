/*
 * @Author: migao@wangguoyan 
 * @Date: 2021-10-26 11:03:50 
 * @Last Modified by: migao@wangguoyan
 * @Last Modified time: 2021-11-02 13:49:39
 */


declare namespace Config {

    /**
     * @description 原始文件中单个配置中的数据结构
     */
    interface OriginOne<T> {
        name: string;
        value: T;
        level: string;
        desc: string
    }

    /**
     * @description 配置项中的数据类型
     */
    interface Self {
        API_PREFIX: string;
    }
}

