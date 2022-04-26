1. npm i
2. 左上角 -> 工具 -> 构建npm
3. 云开发 -> 拿到环境id
4. app.js 第9行，配对设置自己的云开发id
5. 云开发 -> 数据库创建对应的表 -> 导入对应的SQL文件
6. cloudfunctions/checkAdministrator/index.js 第11行 修改为自己的云数据库 _openid
7. cloudfunctions 右键，同步云函数列表