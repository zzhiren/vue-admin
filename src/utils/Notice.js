export default {
  // 成功提示
  _success(value, $vm) {
    $vm.$Message.success(value);
  },

  // 错误提示
  _error(value, $vm) {
    $vm.$Message.error({
      content: value,
      duration: 4
    });
  },

  // 警告提示
  _warning(value, $vm) {
    $vm.$Message.warning({
      content: value,
      duration: 4
    });
  },

  // 加载提示
  _loading(value, $vm) {
    $vm.$Message.loading({
      content: value,
      duration: 30,
      closable: false
    });
  },

  // 普通提示
  _info(value, $vm) {
    $vm.$Message.info({
      content: value,
      duration: 4
    });
  },
}

