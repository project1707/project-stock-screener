import type { App } from "vue";
import StockHeader from "./customer/header/StockHeader.vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StockFooter from "./customer/footer/StockFooter.vue";
import StockTable from "./customer/table/StockTable.vue";
import StockTableContainer from "./customer/table/StockTableContainer.vue";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
import StockPagination from "@/components/ui/myPagination/StockPagination.vue";
import StockBurgerMenu from "./customer/header/StockBurgerMenu.vue";
import adminItemsContainer from "./admin/items/adminItemsContainer.vue";

interface Component {
  name: string;
  component: any;
}

const components: Component[] = [
  { name: "StockHeader", component: StockHeader },
  { name: "Input", component: Input },
  { name: "Button", component: Button },
  { name: "StockFooter", component: StockFooter },
  { name: "StockTable", component: StockTable },
  { name: "ScrollArea", component: ScrollArea },
  { name: "ScrollBar ", component: ScrollBar },
  { name: "StockPagination ", component: StockPagination },
  { name: "StockBurgerMenu ", component: StockBurgerMenu },
  { name: "StockTableContainer ", component: StockTableContainer },
  { name: "adminItemsContainer ", component: adminItemsContainer },
];

const plugin = {
  install: (app: App<Element>) => {
    components.forEach(({ name, component }) => {
      app.component(name, component);
    });
  },
};

export default plugin;
