# Tetris
使用webpack + TypeScript实现俄罗斯方块 

预览链接：https://kuanglinfeng.github.io/Tetris/dist/index.html

# 概述

使用技术：webpack + jQuery + TypeScript 

编程思想：面向对象开发

项目目的：

1. 学习TS如何结合webpack做开发

2. 巩固TS的知识

3. 锻炼逻辑思维能力

4. 体会TS中的面向对象的书写方式




# 工程搭建

环境：浏览器 + 模块化

webpack：构建工具，根据入口文件找寻依赖，打包

1. 安装webpack

2. 安装html-webpack-plugin

3. 安装clean-webpack-plugin

> 每次build的时候先清理dist/script目录下的文件

4. 安装webpack-dev-server

5. 安装TS的相应loader

ts-loader(官方推荐)、awesome-typescript-loader

会报一个警告，表示他们依赖typescript，因此接着：yarn add -D typescript

# 开发

单一职能原则：每个类只做跟它相关的一件事

开闭原则：系统中的类，应该对扩展开放，对修改关闭

基于以上两个原则，系统中使用如下模式：

数据-界面分离模式

传统面向对象语言，书写类的属性时，往往会进行如下操作：

1. 所有的属性全部私有化

2. 使用公开的方法提供对属性的访问

## 开发小方块类

小方块类：它能处理自己的数据，知道什么时候需要显示，但不知道怎么显示

> react、react-dom / react-native，react处理逻辑，react-dom / react-native处理显示，因此核心逻辑代码就可移植了

## 小方块的显示类

作用：用于显示一个小方块到页面上

## 开发方块的组合类

组合类中的属性：

- 小方块的数组

思考：该数组的组成能不能发生变化

回答：不能，是只读数组

思考：该数组的每一项从何而来

一个方块的组合，取决于组合的形状，形状就是一系列坐标的组合，该组合中有一个特殊坐标表示形状的中心

如果知道：形状，中心点在面板里的坐标，颜色，那么就可以设置小方块的数组了

## 俄罗斯方块的生产者类




