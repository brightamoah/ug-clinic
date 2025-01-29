import { createApp, registerElement } from "nativescript-vue";
import { ImageCacheIt } from "@triniwiz/nativescript-image-cache-it";
import SVGPlugin from "@nativescript-community/ui-svg/vue";
import { createPinia, Pinia } from "pinia";
import App from "./App.vue";
import { router } from "~/plugins/router";


ImageCacheIt.enableAutoMM();

registerElement(
   "NSImg",
   () => require("@triniwiz/nativescript-image-cache-it").ImageCacheIt
);
registerElement(
   "NSLabel",
   () => require("@nativescript-community/ui-label").Label
);

registerElement(
   "CardView",
   () => require("@nstudio/nativescript-cardview").CardView
);

// registerElement(
//    "MDBottomNavigation",
//    () =>
//       require("@nativescript-community/ui-material-bottom-navigation")
//          .BottomNavigation,
//    {
//       model: {
//          prop: "selectedTabIndex",
//          event: "selectedTabIndexChange",
//       },
//       // component:
//       //    require("@nativescript-community/ui-material-bottom-navigation/vue/component")
//       //       .default,
//    }
// );

const app = createApp(App);
app.use(createPinia() as any);
app.use( router );
app.use(SVGPlugin as any);
// app.use(BottomSheetPlugin);
// app.use(DateTimePicker);
app.start();
