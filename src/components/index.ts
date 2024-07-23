import type { App } from "vue";
import StockHeader from "./customer/header/StockHeader.vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StockFooter from "./customer/footer/StockFooter.vue";
import StockTable from "./customer/table/StockTable.vue";
import StockTableItem from "./customer/table/StockTableItem.vue";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";

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
  { name: "StockTableItem", component: StockTableItem },
  { name: "ScrollArea", component: ScrollArea },
  { name: "ScrollBar ", component: ScrollBar },
];

const plugin = {
  install: (app: App<Element>) => {
    components.forEach(({ name, component }) => {
      app.component(name, component);
    });
  },
};

export default plugin;
