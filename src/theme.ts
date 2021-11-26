/*
 * @Author: migao@wangguoyan
 * @Date: 2021-11-03 17:57:21
 * @Last Modified by: migao@wangguoyan
 * @Last Modified time: 2021-11-03 18:29:30
 */

/**
 * @description 自定义主题配置
 */
export default {
	common: {
		primaryColor: 'blue',
		lineHeight: '25px',
	},
	Button: {
		textColor: '#FFF',
		// 按钮边框
        borderPrimary: '1px solid #4c68d9',
		borderHoverPrimary: '1px solid #5575FA',
		borderFocusPrimary: '1px solid #5575FA',
		borderPressedPrimary: '1px solid #445EC6',
		// 按钮颜色
        colorPrimary: '#4c68d9',
		colorHoverPrimary: '#5575FA',
		colorFocusPrimary: '#5575FA',
		colorPressedPrimary: '#445EC6',
		// 按钮圆角角度 
        borderRadiusMedium: '10px',
        borderRadiusTiny: '10px',
        borderRadiusSmall: '10px',
        borderRadiusLarge: '10px',
		// 字号
		fontSizeLarge: '18px',
		// 高度
		heightLarge: '48px',
	},
    Input: {
        borderRadius: '10px',
		heightLarge: '48px',
		textColor: '#DDD'
    },
	Select: {
		peers: {
			InternalSelection: {
				textColor: '#000000'
			}
		}
	}
};
