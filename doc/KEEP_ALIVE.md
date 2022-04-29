### 前端路由缓存文档
#### 新页面添加路由时注意：
```
每个三级路由的meta对象里都要必须添加、必须添加、必须添加:
fatherName: '二级路由名（即父级路由名）',

【案例】
meta: {
    title: "商户管理",
    fatherName: 'settingsManagement',
  },
```

###### .vue页面文件里的name一定要和router里的name同名（注意大小写统一）：
```
【验证方式】：
打开新页面的菜单，对当前页面进行搜索条件，或翻页；再切换到其他菜单tag。
再切换回来，如果刚才搜索条件，或翻页的状态重置了，说明.vue页面文件里的name一定要和router里的name没有统一名字！
```

#### 列表页：“新增”、“编辑”、“详情”按钮
```
this.deleteRouterCache('目标路由名');
```

###### 详情页：“取消”、“返回”和“提交”、“保存” 
```
点“取消”、“返回”：this.closeTagDelCache('目标路由名', 0)
点“提交”、“保存”  ：this.closeTagDelCache('目标路由名');
```