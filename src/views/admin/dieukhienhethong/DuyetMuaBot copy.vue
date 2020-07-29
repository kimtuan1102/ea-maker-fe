<template>
<div id="data-list-list-view" class="data-list-container">

    <vs-table ref="table" hoverFlat v-model="selected" noDataText="Không có dữ liệu" pagination :max-items="itemsPerPage" search :data="dataTransactions">

        <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

            <div class="flex flex-wrap-reverse items-center data-list-btn-container">

                <!-- ACTION - DROPDOWN -->
                <vs-dropdown vs-trigger-click class="dd-actions cursor-pointer mr-4 mb-4">

                    <div class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32 w-full">
                        <span class="mr-2">Actions</span>
                        <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                    </div>

                    <vs-dropdown-menu>

                        <vs-dropdown-item>
                            <span class="flex items-center">
                                <feather-icon icon="TrashIcon" svgClasses="h-4 w-4" class="mr-2" />
                                <span>Delete</span>
                            </span>
                        </vs-dropdown-item>

                    </vs-dropdown-menu>
                </vs-dropdown>

            </div>

            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
                <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                    <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ dataTransactions.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : dataTransactions.length }} of {{ queriedItems }}</span>
                    <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                </div>
                <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
                <vs-dropdown-menu>

                    <vs-dropdown-item @click="itemsPerPage=4">
                        <span>4</span>
                    </vs-dropdown-item>
                    <vs-dropdown-item @click="itemsPerPage=10">
                        <span>10</span>
                    </vs-dropdown-item>
                    <vs-dropdown-item @click="itemsPerPage=15">
                        <span>15</span>
                    </vs-dropdown-item>
                    <vs-dropdown-item @click="itemsPerPage=20">
                        <span>20</span>
                    </vs-dropdown-item>
                </vs-dropdown-menu>
            </vs-dropdown>
        </div>

        <template slot="thead">
            <vs-th sort-key="id">Id</vs-th>
            <vs-th sort-key="user">User</vs-th>
            <!--vs-th>Info </vs-th-->
            <vs-th sort-key="status">Status</vs-th>
            <vs-th sort-key="amount">Amount</vs-th>
            <vs-th sort-key="created">Created</vs-th>
            <vs-th>Action</vs-th>
        </template>

        <template slot-scope="{data}">
            <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data ">

                    <vs-td>
                        <p class="product-name font-medium truncate">{{ tr.id }}</p>
                    </vs-td>

                    <vs-td>
                        <p class="product-category">{{ tr.user  }}</p>
                    </vs-td>
                    
                    <vs-td>
                        <!--vs-chip :color="getOrderStatusColor(tr.status)" class="product-order-status">{{ tr.status }}<vs-chip-->
                        <span class="flex items-center px-2 py-1 rounded">
                            <div class="h-3 w-3 rounded-full mr-2" :class="'bg-' + getOrderStatusColor(tr.status)"></div>{{getOrderStatusText(tr.status)}}
                        </span>
                    </vs-td>

                    <vs-td>
                        <p class="product-category">{{ tr.amount  }}</p>
                    </vs-td>

                    <vs-td>
                        <p class="product-price">{{ moment(tr.created ).format('DD/MM/YYYY HH:mm:ss')}}</p>
                    </vs-td>

                    <vs-td class="whitespace-no-wrap">
                        <feather-icon style="margin-right:5px" title="Duyệt" icon="DownloadIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="approveItem(tr.id,tr.user)" />

                        <feather-icon title="Từ chối" icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="rejectItem(tr.id)" />
                    </vs-td>

                    <template class="expand-user" slot="expand" >
                        <div class="con-expand-users">
                            <div class="con-btns-user">
                                <div class="con-userx">
                                    <span>Thông tin</span>
                                    <span>
                                        {{ tr.extra_info}}
                                    </span>
                                </div>
                                <!--div>
                                    <vs-button vs-type="border" size="small" icon="phone_in_talk">a</vs-button>
                                    <vs-button vs-type="gradient" size="small" color="success" icon="send">b</vs-button>
                                    <vs-button vs-type="flat" size="small" color="danger" icon="delete_sweep">b</vs-button>
                                </div-->
                            </div>
                            <!--vs-list class="">
                                <vs-list-item icon="check" title="Tên gói" :subtitle="extra.package_name"></vs-list-item> 
                                <vs-list-item icon="check" title="Id Mt4" :subtitle="extra.id_mt4"></vs-list-item> 
                                <vs-list-item icon="check" title="Office name" :subtitle="extra.office_name"></vs-list-item>
                            </vs-list-->
                        </div>
                    </template>

                </vs-tr>
            </tbody>
        </template>

    </vs-table>

</div>
</template>

<script>
import moduleDataAdmin from "@/store/admin/moduleDataAdmin.js"
export default {
    name: 'DuyetMuaBot',
    components: {},
    props: {},
    data() {
        return {
            page: 1,
            selected: [],
            // products: [],
            itemsPerPage: 4,
            isMounted: false,

            // Data Sidebar
            addNewDataSidebar: false,
            sidebarData: {},
        }
    },
    computed: {
        currentPage() {
            if (this.isMounted) {
                return this.$refs.table.currentx
            }
            return 0
        },
        dataTransactions() {
            //loc mua goi
            return this.$store.state.dataAdmin.dataTransactions.filter(c => c.type == 3).reverse()
        },
        queriedItems() {
            return this.$refs.table ? this.$refs.table.queriedResults.length : this.dataTransactions.length
        }
    },
    methods: {
        getExtraInfo(str) {
            return JSON.parse(str.replace(new RegExp('\\\\','g'), '')) | {}
        },
        getOrderStatusColor(status) {
            if (status == '2') return "danger"
            if (status == '1') return "success"
            if (status == '0') return "warning"
            return "primary"
        },
        getOrderStatusText(status) {
            if (status == '0') return "Chờ duyệt"
            if (status == '1') return "Đã duyệt"
            return "Từ chối"
        },
        approveItem(id, idUser) {
            this.$vs.loading()
            //test thong bao
            //this.$sendNotify({userid:idUser}, {type:"balance"},null,"Tài khoản của bạn đã thay đổi")
            this.$store.dispatch("dataAdmin/approveBot", id).then((response) => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Thành công! ',
                        text: response.data,
                        iconPack: 'feather',
                        icon: 'icon-alert-circle',
                        color: 'success'
                    })
                    this.$sendNotify({
                        userid: idUser
                    }, {
                        type: "balance"
                    }, null, "Admin đã duyệt đăng ký mua bot của bạn")
                })
                .catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Lỗi! ',
                        text: error.message,
                        iconPack: 'feather',
                        icon: 'icon-alert-circle',
                        color: 'danger'
                    })
                })
        },
        rejectItem(id) {
            this.$vs.loading()
            this.$store.dispatch("dataAdmin/rejectBot", id).then((response) => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Thành công! ',
                        text: response.data,
                        iconPack: 'feather',
                        icon: 'icon-alert-circle',
                        color: 'success'
                    })
                })
                .catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Lỗi! ',
                        text: error.message,
                        iconPack: 'feather',
                        icon: 'icon-alert-circle',
                        color: 'danger'
                    })
                })
        },
        addNewData() {
            this.sidebarData = {}
            this.toggleDataSidebar(true)
        },
        deleteData(id) {
            this.$store.dispatch("dataAdmin/removeItem", id).catch(err => {
                console.error(err)
            })
        },
        editData(data) {
            // this.sidebarData = JSON.parse(JSON.stringify(this.blankData))
            this.sidebarData = data
            this.toggleDataSidebar(true)
        },

        getPopularityColor(num) {
            if (num > 90) return "success"
            if (num > 70) return "primary"
            if (num >= 50) return "warning"
            if (num < 50) return "danger"
            return "primary"
        },

    },
    created() {
        if (!moduleDataAdmin.isRegistered) {
            this.$store.registerModule('dataAdmin', moduleDataAdmin)
            moduleDataAdmin.isRegistered = true
        }
        this.$store.dispatch("dataAdmin/getTransaction")
    },
    mounted() {
        this.isMounted = true;
    },
    beforeDestroy() {}
}
</script>

<style lang="scss">
#data-list-list-view {
    .vs-con-table {

        /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
        @media (max-width: 689px) {
            .vs-table--search {
                margin-left: 0;
                max-width: unset;
                width: 100%;

                .vs-table--search-input {
                    width: 100%;
                }
            }
        }

        @media (max-width: 461px) {
            .items-per-page-handler {
                display: none;
            }
        }

        @media (max-width: 341px) {
            .data-list-btn-container {
                width: 100%;

                .dd-actions,
                .btn-add-new {
                    width: 100%;
                    margin-right: 0 !important;
                }
            }
        }

        .product-name {
            max-width: 23rem;
        }

        .vs-table--header {
            display: flex;
            flex-wrap: wrap;
            margin-left: 1.5rem;
            margin-right: 1.5rem;

            >span {
                display: flex;
                flex-grow: 1;
            }

            .vs-table--search {
                padding-top: 0;

                .vs-table--search-input {
                    padding: 0.9rem 2.5rem;
                    font-size: 1rem;

                    &+i {
                        left: 1rem;
                    }

                    &:focus+i {
                        left: 1rem;
                    }
                }
            }
        }

        .vs-table {
            border-collapse: separate;
            border-spacing: 0 1.3rem;
            padding: 0 1rem;

            tr {
                box-shadow: 0 4px 20px 0 rgba(0, 0, 0, .05);

                td {
                    padding: 20px;

                    &:first-child {
                        border-top-left-radius: .5rem;
                        border-bottom-left-radius: .5rem;
                    }

                    &:last-child {
                        border-top-right-radius: .5rem;
                        border-bottom-right-radius: .5rem;
                    }
                }

                td.td-check {
                    padding: 20px !important;
                }
            }
        }

        .vs-table--thead {
            th {
                padding-top: 0;
                padding-bottom: 0;

                .vs-table-text {
                    text-transform: uppercase;
                    font-weight: 600;
                }
            }

            th.td-check {
                padding: 0 15px !important;
            }

            tr {
                background: none;
                box-shadow: none;
            }
        }

        .vs-table--pagination {
            justify-content: center;
        }
    }
}

.con-expand-users {
    .con-btns-user {
        display: flex;
        padding: 10px;
        padding-bottom: 0px;
        align-items: center;
        justify-content: space-between
    }

    .con-userx {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .list-icon i {
        font-size: .9rem !important;
    }
}
</style>
