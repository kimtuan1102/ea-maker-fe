import Vue from "vue";
import $http from "@/http/axios";
const TransactionServices = {
  napTien(amount, bill_id) {
    return $http.post('/api/transaction/', {
      type: 0,
      amount: amount,
      extra_info: JSON.stringify({
        bill_id: bill_id
      })
    })
  }
}
Vue.prototype.$TransactionServices = TransactionServices;
export default TransactionServices

