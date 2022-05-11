import { createApp } from "vue";
import { createPinia } from "pinia";
import { createApolloProvider } from "@vue/apollo-option";
import apolloClient from "@/client.ts";
const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faList,
  faBorderAll,
  faHeart as fasHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add([faList, faBorderAll, fasHeart, farHeart]);

/* add font awesome icon component */

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(apolloProvider);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
