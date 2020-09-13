import Vue from "vue";
import App from "./App.vue";
import Amplify from "aws-amplify";
import "@aws-amplify/ui-vue";
import { AmazonAIPredictionsProvider } from "@aws-amplify/predictions";
import aws_exports from "./aws-exports";
import router from './router'

Amplify.configure(aws_exports);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
