# 商城后台管理系统 · 奶娃优化版（Vue 3 作业）

在原作业代码基础上做的优化版，功能和作业文档要求一一对应，只把页面做得更高级、更清楚，奶娃（naidan.png）出现在登录页、顶栏、侧边栏和每个管理页。

## 优化了什么
- 登录页：左右分栏，左边奶娃品牌区，右边表单；回车也能登录；直接写明演示账号。
- 顶栏 MyHeader：奶娃 Logo + NEW/VIP/99+ 徽章 + 真能用的搜索框（输入“订单/商品/用户/权限/设置”回车直达对应页面）+ 欢迎语 + 退出。
- 侧边栏 MyAside：顶部管理员卡片（在线状态），菜单带图标，选中项是奶娃黄渐变高亮，底部有奶娃提示卡。菜单顺序：用户 → 权限 → 商品 → 订单 → 设置。
- 每个管理页顶部都有数据概览卡片（总数 / 已启用 / 总金额等），不用看表格数就能明白有多少数据。
- 权限页：多了启用率进度条和角色标签；商品页：多了总库存、库存总价值、库存偏低提醒和奶娃空状态；订单页：多了状态数量、总金额和“待付款→已付款→已发货”流转示意；设置页：多了实时预览卡，改左边右边马上变；用户详情页：按 id 显示对应姓名和等级，不再只有编号。

## 和作业要求的对应关系（答辩/检查就照这个说）
- MyRights.vue（第2章 权限管理）：ref 保存 rightsList；computed 的 filteredRights 按角色过滤；v-model 把勾选框双向绑定到 item.checked；显示“已启用/未启用”。
- MyGoods.vue（第3章 商品管理）：ref 保存 goodsList，reactive 保存 newGoods 表单；computed 同时按名称关键字和分类筛选（nameOk && cateOk，两个都满足才保留）；addGoods 校验名称后自增编号并 push，再清空表单；removeGoods 按编号 filter 删除；v-if 显示“暂无符合条件的商品”。
- MyOrders.vue（第4章 订单管理）：ref 保存 ordersList 和 currentStatus；状态按钮用 v-for 遍历 tabList 生成，并用 :class 绑定当前项高亮；getTagClass 按状态返回不同颜色的标签类；按状态用 v-if 显示“确认付款/发货”，点击后调用 changeStatus 流转到下一状态。
- MySettings.vue（第5章 系统设置）：reactive 保存 form，另存一份 defaultForm 作重置依据；onMounted 时从 localStorage 读取 systemSettings，并用 Object.assign 合并；saveSetting 把设置用 JSON.stringify 存为 JSON；resetDefault 还原默认并 removeItem 清缓存。
- MyAside.vue（导航）：用户管理 → 权限管理 → 商品管理 → 订单管理 → 系统设置。
- router.js（路由）：rights / goods / orders / settings 四个模块注册为 /home 的子路由，导航守卫照旧校验 token。

## 运行步骤（HBuilder / HB 里也一样）
1. 如果是新建项目：`npm create vite@latest mall-admin -- --template vue`
2. 把本文件夹里的文件按相同目录复制进去覆盖（src、index.html、package.json、vite.config.js）。
3. 安装依赖：`npm install`，再装 less：`npm install less`
4. 启动：`npm run dev`
5. 登录账号：admin，密码：123456
6. 依次点左侧菜单测试：用户、权限、商品、订单、设置，功能都能正常使用。

注意：src/assets/naidan.png 是奶娃头像图，别漏复制，页面上的奶娃都靠它。
