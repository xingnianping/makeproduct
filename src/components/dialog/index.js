import Dialog from './src/dialog.vue';

Dialog.install = function (Vue) {
  Vue.component(Dialog.name, Button);
};

export default Dialog;
