import type { App } from "vue";
import StockHeader from "./customer/header/StockHeader.vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StrockCategories from "./customer/category/StrockCategories.vue";

interface Component {
  name: string;
  component: any;
}

const components: Component[] = [
  { name: "StockHeader", component: StockHeader },
  { name: "Input", component: Input },
  { name: "Button", component: Button },
  { name: "StrockCategories", component: StrockCategories },
];

const plugin = {
  install: (app: App<Element>) => {
    components.forEach(({ name, component }) => {
      app.component(name, component);
    });
  },
};

export default plugin;
