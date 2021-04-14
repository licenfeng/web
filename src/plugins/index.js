import Vue from 'vue'
import {
  Button,
  Container,
  Header,
  Main,
  Aside,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  MenuItem,
  Submenu,
  RadioGroup,
  RadioButton,
  Tabs,
  TabPane,
  MessageBox,
  Dialog,
  Form,
  FormItem,
  Input,
  Message,
  Card,
  Table,
  TableColumn,
  ColorPicker
} from 'element-ui'
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(ColorPicker)
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
