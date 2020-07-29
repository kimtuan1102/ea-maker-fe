<template>
<div class="vx-row">

    <!-- Overview -->
    <div class="vx-col w-full mb-base">

        <vx-card title="Yêu cầu rút tiền">

            <div class="mt-5"></div>
            <vs-alert :active.sync="active2" color="warning" closable close-icon="icon-x-circle" icon-pack="feather">
                Khai báo các thông tin vào các trường thông tin để rút tiền
            </vs-alert>
            <div class="mb-5"></div>
            <form>
                <div class="vx-row mb-6">
                    <div class="vx-col w-full lg:w-1/3 xl:w-1/3">
                        <vs-input type="number" v-validate="'required'" class="w-full" icon-pack="feather" icon="icon-user" icon-no-border label="ID MT4" name="inputIdMt4" v-model.number="inputIdMt4" />
                        <span class="text-danger text-sm" v-show="errors.has('inputIdMt4')">{{ errors.first('inputIdMt4') }}</span>
                    </div>
                </div>

                <div class="vx-row mb-6">
                    <div class="vx-col w-full lg:w-1/3 xl:w-1/3">
                        <vs-input v-mask="mask" v-validate="'required'" class="w-full" icon-pack="feather" icon="icon-dollar-sign" icon-no-border label="Số tiền" name="inputSoTien" v-model="inputSoTien" />
                        <span class="text-danger text-sm" v-show="errors.has('inputSoTien')">{{ errors.first('inputSoTien') }}</span>
                    </div>
                </div>

                <div class="vx-row mb-6">
                    <div class="vx-col w-full lg:w-1/3 xl:w-1/3">
                        <vs-input v-validate="'required'" type="text" class="w-full" icon-pack="feather" icon="icon-lock" icon-no-border label="Số tài khoản ngân hàng" name="inputSoTaiKhoan" v-model="inputSoTaiKhoan" />
                        <span class="text-danger text-sm" v-show="errors.has('inputSoTaiKhoan')">{{ errors.first('inputSoTaiKhoan') }}</span>
                    </div>
                </div>

                <div class="vx-row mb-6">
                    <div class="vx-col w-full lg:w-1/3 xl:w-1/3">
                        <vs-input v-validate="'required'" type="text" class="w-full" icon-pack="feather" icon="icon-credit-card" icon-no-border label="Tên ngân hàng" name="inputTenNganHang" v-model="inputTenNganHang" />
                        <span class="text-danger text-sm" v-show="errors.has('inputTenNganHang')">{{ errors.first('inputTenNganHang') }}</span>
                    </div>
                </div>

                <div class="vx-row mb-6">
                    <div class="vx-col w-full lg:w-1/3 xl:w-1/3">
                        <vs-input v-validate="'required'" class="w-full" icon-pack="feather" icon="icon-user" icon-no-border label="Họ tên chủ thẻ" name="inputTenChuThe" v-model="inputTenChuThe" />
                        <span class="text-danger text-sm" v-show="errors.has('inputTenChuThe')">{{ errors.first('inputTenChuThe') }}</span>
                    </div>
                </div>

                <div class="vx-row">
                    <div class="vx-col w-full">
                        <vs-button type="filled" class="mr-3 mb-2" @click.prevent="submitForm">Submit</vs-button>
                        <vs-button color="warning" type="border" class="mb-2" @click="inputIdMt4 =inputSoTien  = inputSoTaiKhoan  = inputTenNganHang  = inputTenChuThe  = ''">Reset</vs-button>
                    </div>
                </div>
            </form>
        </vx-card>
    </div>
</div>
</template>

<script>
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
const currencyMask = createNumberMask({
    prefix: '',
    suffix: ' VND',
    allowDecimal: false,
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowNegative: false,
});
export default {
    name: 'DichVuRutTien',
    components: {},
    props: {},
    data() {
        return {
            mask:currencyMask,
            inputIdMt4: "",
            inputSoTien: "",
            inputSoTaiKhoan: "",
            inputTenNganHang: "",
            inputTenChuThe: "",
        }
    },
    mounted() {},
    beforeDestroy() {},
    methods: {
        esc_quot: function (text) {
            return text.replace(new RegExp('"', "g"), '\\"');
        },
        async submitForm() {
            this.$vs.loading()
            await this.$validator.validateAll().then(result => {
                if (result) {

                    // if form have no errors
                    let body = {
                        "type": 1, //rut tien
                        "amount": Number(this.inputSoTien.replace(/\D+/g, '')),
                        "extra_info": JSON.stringify({
                            id_mt4: this.inputIdMt4,
                            account_number: this.inputSoTaiKhoan,
                            bank_name: this.inputTenNganHang,
                            account_name: this.inputTenChuThe,
                        })
                    }
                    this.$http.post("/api/transaction/", body)
                        .then((response) => {
                            this.$vs.loading.close()
                            this.checkpointReward = response.data
                            this.$vs.dialog({
                                color: "primary",
                                title: `Thông báo`,
                                text: 'Thành công',
                                acceptText: "Đóng"
                            })
                            //Thong bao den admin co nguoi rut tien
                            let getUser = JSON.parse(localStorage.getItem("userInfo")) || {};
                            this.$sendNotify({
                                    is_admin: true
                                }, {
                                    type: "money"
                                },
                                "Thông báo",
                                "Yêu cầu rút tiền từ: " + getUser['userName'] +
                                " số tiền: " +
                                body.amount +
                                "VND"
                            );
                        })
                        .catch((error) => {
                            this.$vs.loading.close()
                            console.log(error)
                            this.$vs.dialog({
                                color: "danger",
                                title: `Lỗi`,
                                text: error,
                                acceptText: "Đóng"
                            })
                        })
                } else {
                    // form have errors
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Lỗi! ',
                        text: "Vui lòng điền đầy đủ các trường",
                        iconPack: 'feather',
                        icon: 'icon-alert-circle',
                        color: 'danger'
                    })
                }
            })
        }
    }
}
</script>

<style lang="css" scoped></style>
