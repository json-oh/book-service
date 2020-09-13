import Vue from "vue";
import App from "./App.vue";
import Amplify from "aws-amplify";
import "@aws-amplify/ui-vue";
import { AmazonAIPredictionsProvider } from "@aws-amplify/predictions";
import aws_exports from "./aws-exports";
import router from "./router";
import store from "./store";

Amplify.configure({
  ...aws_exports,
  aws_cloud_logic_custom: [
    ...aws_exports.aws_cloud_logic_custom,
    {
      name: "book_info_api",
      endpoint: "https://rmyfshnz2c.execute-api.us-east-1.amazonaws.com/v1",
      region: "us-east-1",
      custom_header: () => ({
        "x-api-key": "8QGnKAjMjG5TcPGQ7T2cw4A0O7EeBp3q4jtDc9Ww",
      }),
    },
    {
      name: "recommendation-api",
      endpoint:
        "https://cf4z83d6th.execute-api.us-east-1.amazonaws.com/test-rec",
      region: "us-east-1",
      custom_header: () => ({
        "Content-Type": "application/json",
      }),
    },
  ],
});
Amplify.addPluggable(new AmazonAIPredictionsProvider());

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
