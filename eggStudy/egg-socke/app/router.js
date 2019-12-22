/*
 * @Author: jiapeng.Zheng
 * @Date: 2019-12-19 11:00:32
 * @LastEditors: jiapeng.Zheng
 * @LastEditTime: 2019-12-19 11:49:32
 * @Description: 
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  router.get('/', controller.home.index);
  io.of("/").route('exchange', io.controller.nsp.exchange)
};
