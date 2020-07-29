<template>
<div>
    <div class="vx-row">
        <!-- Overview -->
        <div class="vx-col w-full mb-base">
            <vx-card title="Nạp tiền vào tài khoản">
                <vx-card>
                    <div class="mt-5"></div>
                    <vs-alert :active.sync="active2" color="warning" closable close-icon="icon-x-circle" icon-pack="feather">
                        Sau khi chuyển tiền xong, khai báo đã nạp tiền tại đây. Chúng tôi sẽ phản hồi trong thời gian sớm nhất
                    </vs-alert>
                    <div class="mb-5"></div>
                    <div class="vx-row">
                        <div class="vx-col w-full lg:w-1/3 xl:w-1/3">
                            <form>
                                <div class="vx-row mb-6">
                                    <div class="vx-col w-full">
                                        <vs-input v-mask="mask" name="inputSoTien" v-validate="'required'" class="w-full" icon-pack="feather" icon="icon-dollar-sign" icon-no-border label="Số tiền" v-model="inputSoTien" />
                                        <span class="text-danger text-sm" v-show="errors.has('inputSoTien')">{{ errors.first("inputSoTien") }}</span>
                                    </div>
                                </div>

                                <div class="vx-row mb-6">
                                    <div class="vx-col w-full">
                                        <vs-input type="text" name="inputBillId" v-validate="'required'" class="w-full" icon-pack="feather" icon="icon-credit-card" icon-no-border label="Bill Id" v-model="inputBillId" />
                                        <span class="text-danger text-sm" v-show="errors.has('inputBillId')">{{ errors.first("inputBillId") }}</span>
                                    </div>
                                </div>
                                <div class="vx-row">
                                    <div class="vx-col w-full">
                                        <vs-button type="filled" @click.prevent="sendInfo()" class="mr-3 mb-2">Thực hiện</vs-button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </vx-card>
            </vx-card>
        </div>
    </div>
</div>
</template>

<script>
import vSelect from "vue-select";

import createNumberMask from 'text-mask-addons/dist/createNumberMask';
const currencyMask = createNumberMask({
    prefix: '',
    suffix: ' USD',
    allowDecimal: false,
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowNegative: false,
});

export default {
    name: "DichVuNapTien",
    components: {
        vSelect
    },
    props: {},
    data() {
        return {
            mask: currencyMask,
            inputSoTien: null,
            inputBillId: "",
            active2: true
        };
    },
    mounted() {},
    beforeDestroy() {},
    methods: {
        esc_quot: function (text) {
            return text.replace(new RegExp('"', "g"), '\\"');
        },
        async sendInfo() {
            this.$vs.loading();
            this.$validator.validateAll().then(result => {
                if (result) {
                  let amount = Number(this.inputSoTien.replace(/\D+/g, ''));
                  let billId = this.inputBillId;
                  this.$TransactionServices.napTien(amount, billId)
                    .then(response => {
                      this.$vs.loading.close();
                      this.checkpointReward = response.data;
                      this.$vs.dialog({
                        color: "primary",
                        title: `Thông báo`,
                        text: "Thành công",
                        acceptText: "Đóng"
                      });
                      //Thong bao den admin co nguoi nop tien
                      let getUser = JSON.parse(localStorage.getItem("userInfo")) || {};
                      this.$sendNotify({
                          is_admin: true
                        }, {
                          type: "money"
                        },
                        "Thông báo",
                        getUser['userName'] +
                        " đã nạp: " +
                        amount +
                        "USD, Bill ID: " +
                        billId
                      );
                    })
                    .catch(error => {
                      this.$vs.loading.close();
                      this.$vs.dialog({
                        color: "danger",
                        title: `Thông báo`,
                        text: error.message,
                        acceptText: "Đóng"
                      });
                    });

                } else {
                    // form have errors
                    this.$vs.loading.close();
                    this.$vs.notify({
                        title: "Lỗi! ",
                        text: "Vui lòng điền đầy đủ các trường",
                        iconPack: "feather",
                        icon: "icon-alert-circle",
                        color: "danger"
                    });
                }
            });
        }
    }
};
</script>

<style lang="css" scoped></style>
