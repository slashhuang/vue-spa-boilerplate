'use strict';
import LoginRouter from './login.js';
import ListRouter from './list.js';
import AccountRouter from './account.js';
import DetailRouter from './detail.js';
import CheckstandRouter from './checkstand.js';
import WalletRouter from './wallet.js';
import rollin from './rollin.js';
import rollout from './rollout.js';
export default Object.assign({},
  LoginRouter,
  ListRouter,
  DetailRouter,
  AccountRouter,
  CheckstandRouter,
  WalletRouter,
  rollin,
  rollout
);