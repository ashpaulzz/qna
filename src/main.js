import './main.scss';
import * as riot from 'riot';
import { Route, Router, setBase } from '@riotjs/route';
import main from './main.riot';
import Dashup from '@dashup/core';

// now the Router and Route components are globally available
riot.register('router', Router);
riot.register('route', Route);

// register base
setBase(window.location.origin);

// create app
const createApp = riot.component(main);

// set config
window.config = {
  key   : 'e77ad39b-dd18-45f1-b0f2-f3a1fca6b84d',
  url   : 'https://dashup.io',
  pages : {
    courses      : '5fe3161d6b47a200109a0203',
    subjects     : '5fe34c2a6b47a200109a02c7',
    location     : '602c7c77f692af00112fb502',
    qna          : '5fe34ea06b47a200109a02e1',
    contributors : '5fe350ed6b47a200109a02ec',
    auth         : '5fe362ab6b47a200109a0305',
  },
};

// create mount
window.app = createApp(document.getElementById('app'), {
  dashup : new Dashup({
    url : window.config.url,
    key : window.config.key,
  }),
});