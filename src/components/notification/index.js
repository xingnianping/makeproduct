import Notification from './src/notification.vue';

Notification.install = function (Vue) {
  Vue.component(Notification.name, Notification);
};

export default Notification;
