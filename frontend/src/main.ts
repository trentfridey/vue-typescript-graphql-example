import { createApp } from "vue";
import { createApolloProvider } from "@vue/apollo-option";
import apolloClient from "@/client";
const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faList,
  faBorderAll,
  faHeart as fasHeart,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faList, faBorderAll, fasHeart, farHeart, faVolumeHigh);

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(apolloProvider);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
