<template lang="html">
<div class="home" ref="home">
    <vs-button v-if="$acl.get[0] =='anymouse'" color="warning" type="border" to="/pages/login">Xin mời đăng nhập</vs-button>
</div>
</template>

<script lang="js">
import router from '@/router'
export default {
    name: 'home',
    components: {

    },
    props: [],

    data() {
        return {
            dispatchedOrders: [{
                "orderNo": 1,
                "status": "ON",
                "location": "Ha Noi",
                "distance": "100 km",
                "startDate": "26/07/2018",
                "distPercent": 90

            }],
            selectedStr: "Theo Ngày",

            selected: [],
            // products: [],
            itemsPerPage: 8,
            isMounted: false,

        }
    },
    watch: {

    },
    methods: {

        timeDurationChanged: function (value, des) {
            this.selectedStr = des;
        },

        addNewData() {
            this.sidebarData = {}
            this.toggleDataSidebar(true)
        },
        deleteData(id) {
            this.$store.dispatch("dataList/removeItem", id).catch(err => {
                console.error(err)
            })
        },
        editData(data) {
            // this.sidebarData = JSON.parse(JSON.stringify(this.blankData))
            this.sidebarData = data
            this.toggleDataSidebar(true)
        },
        getOrderStatusColor(status) {
            if (status == '2') return "warning"
            if (status == '1') return "success"
            if (status == '0') return "danger"
            return "primary"
        },
        getOrderStatusText(status) {
            if (status == '0') return "Thất bại"
            return "Thành công"
        },

        getPopularityColor(num) {
            if (num > 90) return "success"
            if (num > 70) return "primary"
            if (num >= 50) return "warning"
            if (num < 50) return "danger"
            return "primary"
        },

    },
    computed: {

        currentPage() {
            if (this.isMounted) {
                return this.$refs.table.currentx
            }
            return 0
        },

        products() {
            return this.$store.state.dataList.products
        },

        queriedItems() {
            return this.$refs.table ? this.$refs.table.queriedResults.length : this.transactions.length
        },

        transactions() {
            return this.$store.state.dataList.transactions
        }
    },
    created() {
        let role = this.$acl.get[0];
        switch (role) {
            case "admin":
                router.push('/admin')
                break;
            case "superadmin":
                router.push('/superadmin')
                break;
            case "lead":
                router.push('/lead')
                break;
        }
        //alert(this.$acl.get[0])
        //   //Lay du lieu giao dịch
        //   this.$http.get("/api/transaction/")
        //       .then((response) => {
        //           // alert(JSON.stringify(response.data)) 
        //           this.products = response.data
        //       })
        //       .catch((error) => {
        //           console.log(error)
        //       })

        // if (!moduleDataList.isRegistered) {
        //     this.$store.registerModule('dataList', moduleDataList)
        //     moduleDataList.isRegistered = true
        // }

        //Lay du lieu giao dịch
        //this.$store.dispatch("dataList/getTransaction")
    },
    mounted: function () {
        //console.info(this.$refs.table)
        this.isMounted = true;

    }
}
</script>

<style lang="scss">

</style>
