<template>
<div class="vx-row">

    <!-- Overview -->
    <div class="vx-col w-full mb-base">

        <vx-card title="Đăng ký mua bot">

            <div class="mt-5"></div>
            <vs-alert :active.sync="active2" color="warning" closable close-icon="icon-x-circle" icon-pack="feather">
                Khai báo các thông tin vào các trường
            </vs-alert>
            <div class="mb-5"></div>
            <form>
                <div class="vx-row mb-6">
                    <div class="vx-col w-full lg:w-1/3 xl:w-1/3">
                        <vs-input type="number" name="inputIdMt4" v-validate="'required'" class="w-full" icon-pack="feather" icon="icon-award" icon-no-border label="ID MT4" v-model.number="inputIdMt4" />
                        <span class="text-danger text-sm" v-show="errors.has('inputIdMt4')">{{ errors.first('inputIdMt4') }}</span>
                    </div>
                </div>

                <div class="vx-row mb-6">
                    <div class="vx-col w-full lg:w-1/3 xl:w-1/3">
                        <vs-input type="text" class="w-full" icon-pack="feather" icon="icon-lock" icon-no-border label="Mật Khẩu" name="inputMatKhau" v-validate="'required'" v-model="inputMatKhau" />
                        <span class="text-danger text-sm" v-show="errors.has('inputMatKhau')">{{ errors.first('inputMatKhau') }}</span>
                    </div>
                </div>

                <div class="vx-row mb-6">
                    <div class="vx-col w-full lg:w-1/3 xl:w-1/3">
                        <vs-input class="w-full" icon-pack="feather" icon="icon-user" icon-no-border label="Tên thành viên" name="inputTenThanhVien" v-validate="'required'" v-model="inputTenThanhVien" />
                        <span class="text-danger text-sm" v-show="errors.has('inputTenThanhVien')">{{ errors.first('inputTenThanhVien') }}</span>
                    </div>
                </div>

                <div class="vx-row ">
                    <div class="vx-col w-full lg:w-1/3 xl:w-1/3">
                        <label for="" class="vs-input--label">Gói EA </label>
                        <v-select class="w-full v-select" v-model="selectedPackage" label="name" :options="listPackages" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                    </div>
                </div>
                <div class="vx-row vx-row mb-6 mt-2">
                    <div class="vx-col w-full lg:w-1/3 xl:w-1/3">
                        <vs-chip color="warning">{{selectedPackage.price}} $</vs-chip>
                    </div>
                </div>

                <div class="vx-row mb-6">
                    <div class="vx-col w-full lg:w-1/3 xl:w-1/3">
                        <label for="" class="vs-input--label">Office </label>
                        <v-select class="w-full v-select" v-model="selectedOffice" label="name" :options="listOffices" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                    </div>
                </div>

                <div class="vx-row mb-6">
                    <div class="vx-col w-full lg:w-1/3 xl:w-1/3">
                        <vs-input type="number" class="w-full" icon-pack="feather" icon="icon-lock" icon-no-border label="Phần trăm copy" name="inputPercentCopy" v-validate="'required'" v-model.number="inputPercentCopy" />
                        <span class="text-danger text-sm" v-show="errors.has('inputPercentCopy')">{{ errors.first('inputPercentCopy') }}</span>
                    </div>
                </div>

                <div class="vx-row">
                    <div class="vx-col w-full">
                        <vs-button type="filled" @click.prevent="submitForm" class="mr-3 mb-2">Submit</vs-button>
                        <vs-button color="warning" type="border" class="mb-2" @click="input13 = input14 = input15 = input16 = ''; check4 = false;">Cancle</vs-button>
                    </div>
                </div>
            </form>
        </vx-card>
    </div>
</div>
</template>

<script>
import vSelect from 'vue-select'

export default {
    name: 'DichVuMuaBot',
    components: {
        vSelect
    },
    props: {},
    data() {
        return {
            listPackages: [],
            listOffices: [],
            selectedPackage: {},
            inputIdMt4: null,
            inputMatKhau: "",
            inputTenThanhVien: "",
            inputPercentCopy: 0,
            selectedOffice: {}

        }
    },
    async created() {
        this.$vs.loading()
        // let getPackage = this.$http.get("/api/package/")
        // let getOffice = this.$http.get("/api/office/")
        // let result = await this.$http.all([getPackage, getOffice])
        // result.then((responses) => {
        //     alert('ok')
        //     const responseOne = responses[0]
        //     const responseTwo = responses[1]
        //      this.listPackages = responseOne.data
        //      this.listOffices = responseTwo.data
        //      this.$vs.loading.close()
        //     // use/access the results 
        // }).catch(errors => {
        //     // react on errors.
        //      this.$vs.loading.close()
        //      console.log(errors);
        // })
        this.$http.get("/api/package/")
            .then((response) => {
                this.listPackages = response.data
                this.$http.get("/api/office/").then((response2) => {
                        this.listOffices = response2.data
                    })
                    .catch((error) => {
                        console.log(error)
                        this.$vs.loading.close()
                    })
                this.$vs.loading.close()
            })
            .catch((error) => {
                console.log(error)
                this.$vs.loading.close()
            })
    },
    mounted() {},
    beforeDestroy() {},
    methods: {
        esc_quot: function (text) {
            return text.replace(new RegExp('"', "g"), '\\"');
        },
        submitForm() {
            this.$vs.loading();
            this.$validator.validateAll().then(result => {
                if (result) {
                    // if form have no errors
                    let body = {
                        id: this.inputIdMt4,
                        pwd: this.inputMatKhau,
                        name: this.inputTenThanhVien,
                        office: this.selectedOffice.id,
                        package: this.selectedPackage.id,
                        percent_copy: this.inputPercentCopy

                    }
                    // id = body['id', None]
                    // pwd = body['pwd', None]
                    // name = body['name', None]
                    // office = body['office', None]
                    // package = body['package', None]
                    // percent_copy = body['percent_copy', None]
                    this.$http.post("/api/create-order", body)
                        .then((response) => {
                            this.$vs.loading.close()
                            this.checkpointReward = response.data
                            this.$vs.dialog({
                                color: "primary",
                                title: `Thông báo`,
                                text: 'Thành công',
                                acceptText: "Đóng"
                            })
                            //Thong bao den admin co nguoi nop tien
                            let getUser = JSON.parse(localStorage.getItem("userInfo")) || {};
                            this.$sendNotify({
                                    is_admin: true
                                }, {
                                    type: "lead_buy_bot"
                                },
                                "Thông báo",
                                getUser['userName'] +
                                " đã đăng ký bot id: " +
                                body.id 
                            );
                        })
                        .catch((error) => {
                            this.$vs.loading.close()
                            this.$vs.dialog({
                                color: "danger",
                                title: `Thông báo`,
                                text: error.message,
                                acceptText: "Đóng"
                            });
                            console.log(error)
                        })
                } else {
                    this.$vs.loading.close()
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
}
</script>

<style lang="css" scoped></style>
