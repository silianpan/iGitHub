![FunCode](http://silianpan.cn/funcode-doc/logo.png)

[![uni-app-deps][uni-app-image]][uni-app-url] [![GitHub stars][github-starts-image]][github-url] [![GitHub commit activity][github-commit-activity-url]][github-url] [![GitHub top language][github-top-language-image]][vue-url] 

[uni-app-image]: https://img.shields.io/badge/uni--app-latest-%2342b983
[uni-app-url]: https://uniapp.dcloud.io/
[github-starts-image]: https://img.shields.io/github/stars/silianpan/iGitHub?style=social
[github-url]: https://github.com/silianpan/iGitHub
[github-commit-activity-url]: https://img.shields.io/github/commit-activity/m/silianpan/iGitHub
[github-top-language-image]: https://img.shields.io/github/languages/top/silianpan/iGitHub?color=%234fc08d
[vue-url]: https://vuejs.org/

## [文档地址](http://funcode-doc.silianpan.cn)

## 安装使用

> 目前我们只支持H5和Android，二维码如下，请用使用手机浏览器扫码安装

<div class="half">
  <img src="http://silianpan.cn/wp-content/uploads/2020/08/wp_editor_md_0328c231bfe9c5b306deb260061bbd73.jpg" width="120" alt="h5"/>
  <img src="http://silianpan.cn/wp-content/uploads/2020/08/wp_editor_md_005a5bdc73ac42918638a2a6501372f6.jpg" width="120" alt="android"/>
</div>
<br>
<img src="http://silianpan.cn/wp-content/uploads/2020/08/FunCode.gif" height="420" alt="funcode-gif"/>

## GitHub开发配置

1. 打开[开发配置页面](https://github.com/settings/developers)
2. 创建OAuth应用
   ![](http://silianpan.cn/wp-content/uploads/2020/08/wp_editor_md_cfe41b3a9770f90c3379c8f7cfebe299.jpg)
3. 填写授权回调地址为**funcode://oauth**
   
   <img src="http://silianpan.cn/wp-content/uploads/2020/08/wp_editor_md_31120fc3cdd24c2c66658ff98c177bd7.jpg" height="420" />

4. 填写**githubClientId**和**githubClientSecret**
   打开[config/index.js](https://github.com/silianpan/iGitHub/blob/master/config/index.js)

   <img src="http://silianpan.cn/wp-content/uploads/2020/08/wp_editor_md_d230a5c62faed425b34b66e86cd694bc.jpg" height="360" />

## fork代码

[Github](https://github.com/silianpan/iGitHub)<br>
[Gitee](https://gitee.com/twofloor/iGitHub)

## 运行

> 参考[uni-app快速上手](https://uniapp.dcloud.io/quickstart)<br>
> 提示：Android可以使用[MuMu模拟器](https://mumu.163.com/)

1. `yarn install`
2. HBuilderX打开代码目录，菜单->运行

## 部署

* 打开manifest.json，重新获取AppID
* App图标配置
* App启动界面配置
* H5配置**运行基础路径**
* 菜单->发行->原生App-云打包/网站-H5手机版

## 后续开发计划

### 新增功能

* 开发者详细列表
* star、fork、follow开发者功能
* Issues
* Pull Requests
* 多个branches切换、展示
* 反馈功能实现
* 用户隐私协议

### 功能优化

* 打开"仓库详情"很慢
* 仓库列表，贡献者头像对齐
* README更新按钮动画
* 字体优化：采用阿里巴巴普惠体

### 长期计划

* 采用flutter框架开发GitHub客户端

[快来加入我们 →](http://silianpan.cn/funcode-doc/about/)

## 开源不易，且用且珍惜

[我的博客](http://silianpan.cn/)

[赞助作者](http://silianpan.cn/funcode-doc/about/#%E8%B5%9E%E5%8A%A9%E6%88%91%E4%BB%AC)
