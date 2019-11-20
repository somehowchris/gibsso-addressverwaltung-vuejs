import BaseDropDown from '../../components/BaseDropdown.vue';
import BaseButton from '../../components/BaseButton.vue';

export default {
  install(Vue) {
    Vue.component(BaseButton.name, BaseButton);
    Vue.component(BaseDropDown.name, BaseDropDown);
  },
};
