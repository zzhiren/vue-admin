export function _destroy(state,value,$vm) {
  $vm.$Message.destroy();
    if (state == 0) {
      _success(value,$vm);
    } else if (state == 1) {
      _warning(value,$vm);
    } else if(state == 2){
      _error(value,$vm);
    }
  };

  // 成功提示
  export function _success(value,$vm) {
    $vm.$Message.success(value);
  };

  // loading提示
  export function _loading(value,$vm) {
    $vm.$Message.loading({
      content: value,
      duration: 30,
      closable: false
    });
  };
  // 警告提示
  export function _warning(value,$vm) {
    $vm.$Message.$Message.warning({
      content: value,
      duration: 4
    });
  };

  // 错误提示
  export function _error(value,$vm) {
    $vm.$Message.error({
      content: value,
      duration: 4
    });
  };

  // 普通提示
  export function _info(value,$vm) {
    $vm.$Message.info({
      content: value,
      duration: 4
    });
  };

  