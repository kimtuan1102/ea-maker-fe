<template lang="html">
<div class="home" ref="home">

    <!-- GUEST -->
    <div class="guest" v-if="$acl.check('guest')">
        <!-- ROW 2 -->
        <div class="vx-row">
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3">
                <statistics-card-line hideChart class="mb-base" icon="DollarSignIcon" icon-right statistic="5000$" statisticTitle="Tổng nạp" />
            </div>
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3">
                <statistics-card-line hideChart class="mb-base" icon="DollarSignIcon" icon-right statistic="1000$" statisticTitle="Tổng rút" color="success" />
            </div>
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3">
                <statistics-card-line hideChart class="mb-base" icon="DollarSignIcon" icon-right statistic="4000$" statisticTitle="Tiền hiện tại" color="warning" />
            </div>
        </div>
        <div class="vx-row">
            <!-- CARD 1: CONGRATS -->
            <div class="vx-col w-full lg:w-full mb-base">
                <vx-card slot="no-body" class="text-center bg-primary-no-gradient greet-user">
                    <img src="@/assets/images/elements/decore-left.png" class="decore-left" alt="Decore Left" width="200">
                    <img src="@/assets/images/elements/decore-right.png" class="decore-right" alt="Decore Right" width="175">
                    <feather-icon title="Dừng dịch vụ" icon="PowerIcon" class="p-6 mb-8 bg-danger inline-flex rounded-full text-white shadow" svgClasses="h-8 w-8"></feather-icon>
                    <h1 class="mb-6 text-white">EA Copy: 112222222 </h1>
                    <p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">
                        Trạng thái:
                        <strong class="inline-flex items-center">
                            <div class="h-3 w-3 rounded-full mr-1 bg-success"></div><span>Đang hoạt động</span>
                        </strong></p>
                    <div class="flex items-center" style="justify-content: center;width: 100%">
                        <statistics-card-line hideChart class="static-baohanh" icon="AlertCircleIcon" statistic="20/11/2020" color='success' statisticTitle="Hạn bảo hành gốc" />
                        <statistics-card-line hideChart class="static-baohanh" icon="AlertOctagonIcon" statisticTitle="Hạn gói EA" statistic="20/11/2020" color='warning' />
                    </div>
                </vx-card>
            </div>
        </div>
        <div class="vx-row mb-base">
            <vx-card title="Giao dịch" style="margin:1rem">
                <div id="data-list-list-view" class="data-list-container vx-col w-full sm:w-full md:w-full lg:w-full xl:w-full">
                    <vs-table ref="table" v-model="selected" pagination :max-items="itemsPerPage" search :data="transactions">
                        <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
                            <div class="flex flex-wrap-reverse items-center data-list-btn-container">

                                <!-- ACTION - DROPDOWN -->
                                <vs-dropdown vs-trigger-click class="dd-actions cursor-pointer">
                                    <div class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32 w-full">
                                        <span class="mr-2">Chọn thời gian</span>
                                        <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                                    </div>
                                    <vs-dropdown-menu>
                                        <vs-dropdown-item>
                                            <span class="flex items-center">
                                                <feather-icon icon="TrashIcon" svgClasses="h-4 w-4" class="mr-2" />
                                                <span>Hôm nay</span>
                                            </span>
                                        </vs-dropdown-item>
                                        <vs-dropdown-item>
                                            <span class="flex items-center">
                                                <feather-icon icon="ArchiveIcon" svgClasses="h-4 w-4" class="mr-2" />
                                                <span>Tuần</span>
                                            </span>
                                        </vs-dropdown-item>
                                        <vs-dropdown-item>
                                            <span class="flex items-center">
                                                <feather-icon icon="FileIcon" svgClasses="h-4 w-4" class="mr-2" />
                                                <span>Tháng</span>
                                            </span>
                                        </vs-dropdown-item>
                                    </vs-dropdown-menu>
                                </vs-dropdown>
                            </div>
                            <!-- ITEMS PER PAGE -->
                            <!-- <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ products.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : products.length }} of {{ queriedItems }}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>
                        <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> 
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
                        </vs-dropdown> -->
                        </div>
                        <template slot="thead">
                            <vs-th sort-key="name">Thời gian mở lệnh</vs-th>
                            <vs-th sort-key="category">Loại tiền</vs-th>
                            <vs-th sort-key="popularity">Cặp tiền</vs-th>
                            <vs-th sort-key="order_status">Số tiền</vs-th>
                            <vs-th sort-key="price">Thời gian đóng lệnh</vs-th>
                            <vs-th>Kết quả</vs-th>
                        </template>
                        <template slot-scope="{data}">
                            <tbody>
                                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                                    <vs-td>
                                        <p class="product-name font-medium truncate">{{ tr.created |moment("DD/MM/YYYY HH:mm:ss") }}</p>
                                    </vs-td>
                                    <vs-td>
                                        <p class="product-category">{{ tr.extra_info }}</p>
                                    </vs-td>
                                    <vs-td>
                                        <!-- <vs-progress :percent="Number(tr.popularity)" :color="getPopularityColor(Number(tr.popularity))" class="shadow-md" /> -->
                                        usdVnd
                                    </vs-td>
                                    <vs-td>
                                        ${{ tr.amount }}
                                    </vs-td>
                                    <vs-td>
                                        <p class="product-price">----</p>
                                    </vs-td>
                                    <vs-td class="whitespace-no-wrap">

                                        <span class="flex items-center px-2 py-1 rounded">
                                            <div class="h-3 w-3 rounded-full mr-2" :class="'bg-' + getOrderStatusColor(tr.status)"></div>{{getOrderStatusText(tr.status)}}
                                        </span>
                                        <!-- <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr)" />
                                 <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteData(tr.id)" /> -->
                                    </vs-td>
                                </vs-tr>
                            </tbody>
                        </template>
                    </vs-table>
                </div>
            </vx-card>
        </div>
        <!--THONG KE TAI KHOAN-->
        <div class="vx-row" style="margin-top:10px">
            <!-- CARD 9: DISPATCHED ORDERS -->
            <div class="vx-col w-full lg:w-full">
                <vx-card title="Thống kê tài khoản" collapseAction>
                    <!-- CARD ACTION -->
                    <template slot="actions">
                        <change-time-static-dropdown @timeDurationChanged="timeDurationChanged"></change-time-static-dropdown>
                    </template>
                    <div slot="no-body" class="mt-4">
                        <vs-table :data="dispatchedOrders" class="table-dark-inverted">
                            <template slot="thead">
                                <vs-th>STT.</vs-th>
                                <vs-th>STATUS</vs-th>
                                <vs-th>OPERATORS</vs-th>
                                <vs-th>LOCATION</vs-th>
                                <vs-th>DISTANCE</vs-th>
                                <vs-th>START DATE</vs-th>
                                <vs-th>EST DELIVERY DATE</vs-th>
                            </template>
                            <template slot-scope="{data}">
                                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                                    <vs-td :data="data[indextr].orderNo">
                                        <span>#{{data[indextr].orderNo}}</span>
                                    </vs-td>
                                    <vs-td :data="data[indextr].status">
                                        <span class="flex items-center px-2 py-1 rounded">
                                            <div class="h-3 w-3 rounded-full mr-2" :class="'bg-' + data[indextr].statusColor"></div>
                                            {{data[indextr].status}}
                                        </span>
                                    </vs-td>
                                    <vs-td :data="data[indextr].orderNo">
                                        <ul class="users-liked user-list">
                                            <li v-for="(user, userIndex) in data[indextr].usersLiked" :key="userIndex">
                                                <vx-tooltip :text="user.name" position="bottom">
                                                    <vs-avatar :src="user.img" size="30px" class="border-2 border-white border-solid -m-1"></vs-avatar>
                                                </vx-tooltip>
                                            </li>
                                        </ul>
                                    </vs-td>
                                    <vs-td :data="data[indextr].orderNo">
                                        <span>{{data[indextr].location}}</span>
                                    </vs-td>
                                    <vs-td :data="data[indextr].orderNo">
                                        <span>{{data[indextr].distance}}</span>
                                        <vs-progress :percent="data[indextr].distPercent" :color="data[indextr].statusColor"></vs-progress>
                                    </vs-td>
                                    <vs-td :data="data[indextr].orderNo">
                                        <span>{{data[indextr].startDate}}</span>
                                    </vs-td>
                                    <vs-td :data="data[indextr].orderNo">
                                        <span>{{data[indextr].estDelDate}}</span>
                                    </vs-td>
                                </vs-tr>
                            </template>
                        </vs-table>
                    </div>
                </vx-card>
            </div>
        </div>
        <!--BIEN DONG TAI KHOAN-->
        <div class="vx-row mb-base">
            <vx-card style="margin:1rem">
                <div id="data-list-list-view" class="data-list-container vx-col w-full sm:w-full md:w-full lg:w-full xl:w-full">
                    <vs-table ref="table" multiple v-model="selected" pagination :max-items="itemsPerPage" search :data="products">
                        <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
                            <div class="flex flex-wrap-reverse items-center data-list-btn-container">
                                <div class="vx-card__title">
                                    <h4 class="">Biến động tài khoản </h4>
                                </div>
                                <div style="width:20px"></div>
                                <!-- ACTION - DROPDOWN -->
                                <vs-dropdown vs-trigger-click class="dd-actions cursor-pointer">
                                    <div class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32 w-full">
                                        <span class="mr-2">Chọn thời gian</span>
                                        <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                                    </div>
                                    <vs-dropdown-menu>
                                        <vs-dropdown-item>
                                            <span class="flex items-center">
                                                <feather-icon icon="TrashIcon" svgClasses="h-4 w-4" class="mr-2" />
                                                <span>Hôm nay</span>
                                            </span>
                                        </vs-dropdown-item>
                                        <vs-dropdown-item>
                                            <span class="flex items-center">
                                                <feather-icon icon="ArchiveIcon" svgClasses="h-4 w-4" class="mr-2" />
                                                <span>Tuần</span>
                                            </span>
                                        </vs-dropdown-item>
                                        <vs-dropdown-item>
                                            <span class="flex items-center">
                                                <feather-icon icon="FileIcon" svgClasses="h-4 w-4" class="mr-2" />
                                                <span>Tháng</span>
                                            </span>
                                        </vs-dropdown-item>
                                    </vs-dropdown-menu>
                                </vs-dropdown>
                            </div>
                        </div>
                        <template slot="thead">
                            <vs-th sort-key="name">Thời gian</vs-th>
                            <vs-th sort-key="category">Trạng thái</vs-th>
                            <vs-th sort-key="order_status">Số tiền</vs-th>
                            <vs-th>Lệnh</vs-th>
                        </template>
                        <template slot-scope="{data}">
                            <tbody>
                                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                                    <vs-td>
                                        <p class="product-name font-medium truncate">{{new Date()}}</p>
                                    </vs-td>
                                    <vs-td>
                                        ${{ tr.price }}
                                    </vs-td>
                                    <vs-td>
                                        <p class="product-price">22/11/2020</p>
                                    </vs-td>
                                    <vs-td class="whitespace-no-wrap">
                                        <vs-chip :color="getOrderStatusColor(tr.order_status)" class="product-order-status">{{ tr.order_status | title }}</vs-chip>
                                        <!-- <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr)" />
                                 <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteData(tr.id)" /> -->
                                    </vs-td>
                                </vs-tr>
                            </tbody>
                        </template>
                    </vs-table>
                </div>
            </vx-card>
        </div>
    </div>

    <!-- LEAD -->
    <div class="lead" v-if="$acl.check('lead')">
        <div class="vx-row">
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3">
                <statistics-card-line hideChart class="mb-base" icon="DollarSignIcon" icon-right statistic="5000$" statisticTitle="Tổng số EA đã bán" />
            </div>
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3">
                <statistics-card-line hideChart class="mb-base" icon="DollarSignIcon" icon-right statistic="1000$" statisticTitle="Tổng tiền" color="success" />
            </div>
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3">
                <statistics-card-line hideChart class="mb-base" icon="DollarSignIcon" icon-right statistic="4000$" statisticTitle="Hoa hồng" color="warning" />
            </div>
        </div>

        <!-- FORM -->
        <div class="vx-row">
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3">
                <vx-card>
                    <div class="vx-row mb-6">
                        <div class="vx-col w-full">
                            <vs-input class="w-full" icon-pack="feather" icon="icon-user" icon-no-border label="ID MT4" v-model="input13" />
                        </div>
                    </div>

                    <div class="vx-row mb-6">
                        <div class="vx-col w-full">
                            <vs-input type="password" class="w-full" icon-pack="feather" icon="icon-lock" icon-no-border label="Mật Khẩu" v-model="input16" />
                        </div>
                    </div>

                    <div class="vx-row mb-6">
                        <div class="vx-col w-full">
                            <label for="" class="vs-input--label">Gói EA</label>
                            <v-select class="w-full v-select" label="Gói EA" :options="[1,2,3,4]" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                        </div>
                    </div>
                    <div class="vx-row mb-6">
                        <div class="vx-col w-full">
                            <vs-input class="w-full" icon-pack="feather" icon="icon-smartphone" icon-no-border label="Tên thành viên" v-model="input15" />
                        </div>
                    </div>

                    <div class="vx-row">
                        <div class="vx-col w-full">
                            <vs-button class="mr-3 mb-2">Submit</vs-button>
                            <vs-button color="warning" type="border" class="mb-2" @click="input13 = input14 = input15 = input16 = ''; check4 = false;">Cancle</vs-button>
                        </div>
                    </div>
                </vx-card>
            </div>

            <!--2-->
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3">
                <vx-card>
                    <div class="vx-row mb-6">
                        <div class="vx-col w-full">
                            <vs-input v-validate="'required'" class="w-full" icon-pack="feather" icon="icon-user" icon-no-border label="ID MT4" v-model="input13" />
                            
                        </div>
                    </div>

                    <div class="vx-row mb-6">
                        <div class="vx-col w-full">
                            <vs-input v-validate="'required'" type="password" class="w-full" icon-pack="feather" icon="icon-lock" icon-no-border label="Mật Khẩu" v-model="input16" />
                        </div>
                    </div>

                    <div class="vx-row mb-6">
                        <div class="vx-col w-full">
                            <vs-input label="Bill" icon-pack="feather" icon="icon-image" icon-after placeholder="Search" v-model="value1" class="w-full is-label-placeholder" />
                        </div>
                    </div>

                    <div class="vx-row">
                        <div class="vx-col w-full">
                            <vs-button class="mr-3 mb-2">Submit</vs-button>
                            <vs-button color="warning" type="border" class="mb-2" @click="input13 = input14 = input15 = input16 = ''; check4 = false;">Cancle</vs-button>
                        </div>
                    </div>
                </vx-card>
            </div>

            <!--3-->
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3">
                <vx-card>
                    <div class="vx-row mb-6">
                        <div class="vx-col w-full">
                            <vs-input class="w-full" icon-pack="feather" icon="icon-user" icon-no-border label="ID MT4" v-model="input13" />
                        </div>
                    </div>

                    <div class="vx-row mb-6">
                        <div class="vx-col w-full">
                            <vs-input type="password" class="w-full" icon-pack="feather" icon="icon-lock" icon-no-border label="Mật Khẩu" v-model="input16" />
                        </div>
                    </div>

                    <div class="vx-row mb-6">
                        <div class="vx-col w-full">
                            <label for="" class="vs-input--label">Gói EA</label>
                            <v-select class="w-full v-select" label="Gói EA" :options="[1,2,3,4]" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                        </div>
                    </div>
                    <div class="vx-row mb-6">
                        <div class="vx-col w-full">
                            <vs-input class="w-full" icon-pack="feather" icon="icon-smartphone" icon-no-border label="Tên thành viên" v-model="input15" />
                        </div>
                    </div>

                    <div class="vx-row">
                        <div class="vx-col w-full">
                            <vs-button class="mr-3 mb-2">Submit</vs-button>
                            <vs-button color="warning" type="border" class="mb-2" @click="input13 = input14 = input15 = input16 = ''; check4 = false;">Cancle</vs-button>
                        </div>
                    </div>
                </vx-card>
            </div>

        </div>

        <!--BIEN DONG TAI KHOAN-->
        <div class="vx-row mb-base">
            <vx-card style="margin:1rem">
                <div id="data-list-list-view" class="data-list-container vx-col w-full sm:w-full md:w-full lg:w-full xl:w-full">
                    <vs-table ref="table" multiple v-model="selected" pagination :max-items="itemsPerPage" search :data="products">
                        <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
                            <div class="flex flex-wrap-reverse items-center data-list-btn-container">
                                <div class="vx-card__title">
                                    <h4 class="">Biến động tài khoản </h4>
                                </div>
                                <div style="width:20px"></div>
                                <!-- ACTION - DROPDOWN -->
                                <vs-dropdown vs-trigger-click class="dd-actions cursor-pointer">
                                    <div class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32 w-full">
                                        <span class="mr-2">Chọn thời gian</span>
                                        <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                                    </div>
                                    <vs-dropdown-menu>
                                        <vs-dropdown-item>
                                            <span class="flex items-center">
                                                <feather-icon icon="TrashIcon" svgClasses="h-4 w-4" class="mr-2" />
                                                <span>Hôm nay</span>
                                            </span>
                                        </vs-dropdown-item>
                                        <vs-dropdown-item>
                                            <span class="flex items-center">
                                                <feather-icon icon="ArchiveIcon" svgClasses="h-4 w-4" class="mr-2" />
                                                <span>Tuần</span>
                                            </span>
                                        </vs-dropdown-item>
                                        <vs-dropdown-item>
                                            <span class="flex items-center">
                                                <feather-icon icon="FileIcon" svgClasses="h-4 w-4" class="mr-2" />
                                                <span>Tháng</span>
                                            </span>
                                        </vs-dropdown-item>
                                    </vs-dropdown-menu>
                                </vs-dropdown>
                            </div>
                        </div>
                        <template slot="thead">
                            <vs-th sort-key="name">Thời gian</vs-th>
                            <vs-th sort-key="category">Trạng thái</vs-th>
                            <vs-th sort-key="order_status">Số tiền</vs-th>
                            <vs-th>Lệnh</vs-th>
                        </template>
                        <template slot-scope="{data}">
                            <tbody>
                                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                                    <vs-td>
                                        <p class="product-name font-medium truncate">{{new Date()}}</p>
                                    </vs-td>
                                    <vs-td>
                                        ${{ tr.price }}
                                    </vs-td>
                                    <vs-td>
                                        <p class="product-price">22/11/2020</p>
                                    </vs-td>
                                    <vs-td class="whitespace-no-wrap">
                                        <vs-chip :color="getOrderStatusColor(tr.order_status)" class="product-order-status">{{ tr.order_status | title }}</vs-chip>
                                        <!-- <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr)" />
                                 <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteData(tr.id)" /> -->
                                    </vs-td>
                                </vs-tr>
                            </tbody>
                        </template>
                    </vs-table>
                </div>
            </vx-card>
        </div>

        <!--Danh sách EA-->
        <div class="vx-row mb-base">
            <vx-card style="margin:1rem">
                <div id="data-list-list-view" class="data-list-container vx-col w-full sm:w-full md:w-full lg:w-full xl:w-full">
                    <vs-table ref="table" multiple v-model="selected" pagination :max-items="itemsPerPage" search :data="products">
                        <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
                            <div class="flex flex-wrap-reverse items-center data-list-btn-container">
                                <div class="vx-card__title">
                                    <h4 class="">Danh sách EA</h4>
                                </div>
                                <div style="width:20px"></div>

                            </div>
                        </div>
                        <template slot="thead">
                            <vs-th sort-key="name">Thời gian</vs-th>
                            <vs-th sort-key="category">Trạng thái</vs-th>
                            <vs-th sort-key="order_status">Số tiền</vs-th>
                            <vs-th>Lệnh</vs-th>
                        </template>
                        <template slot-scope="{data}">
                            <tbody>
                                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                                    <vs-td>
                                        <p class="product-name font-medium truncate">{{new Date()}}</p>
                                    </vs-td>
                                    <vs-td>
                                        ${{ tr.price }}
                                    </vs-td>
                                    <vs-td>
                                        <p class="product-price">22/11/2020</p>
                                    </vs-td>
                                    <vs-td class="whitespace-no-wrap">
                                        <vs-chip :color="getOrderStatusColor(tr.order_status)" class="product-order-status">{{ tr.order_status | title }}</vs-chip>
                                        <!-- <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr)" />
                                 <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteData(tr.id)" /> -->
                                    </vs-td>
                                </vs-tr>
                            </tbody>
                        </template>
                    </vs-table>
                </div>
            </vx-card>
        </div>
    </div>

</div>
</template>

<script lang="js">
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import ChangeTimeStaticDropdown from '@/components/ChangeTimeStaticDropdown/ChangeTimeStaticDropdown.vue'
import moduleDataList from "@/store/data-list/moduleDataList.js"
import vSelect from 'vue-select'

export default {
    name: 'home',
    components: {
        StatisticsCardLine,
        ChangeTimeStaticDropdown,
        vSelect
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

        // alert(this.$acl.get[0])
        //   //Lay du lieu giao dịch
        //   this.$http.get("/api/transaction/")
        //       .then((response) => {
        //           // alert(JSON.stringify(response.data)) 
        //           this.products = response.data
        //       })
        //       .catch((error) => {
        //           console.log(error)
        //       })

        if (!moduleDataList.isRegistered) {
            this.$store.registerModule('dataList', moduleDataList)
            moduleDataList.isRegistered = true
        }

        //Lay du lieu giao dịch
        this.$store.dispatch("dataList/getTransaction")
    },
    mounted: function () {
        console.info(this.$refs.table)
        this.isMounted = true;

    }
}
</script>

<style lang="scss" scoped>
.v-select input {
    padding: 0.7rem 1rem 0.7rem 3rem !important;
}

.greet-user {
    position: relative;

    .decore-left {
        position: absolute;
        left: 0;
        top: 0;
    }

    .decore-right {
        position: absolute;
        right: 0;
        top: 0;
    }
}

.static-baohanh {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    background: transparent !important;
}

@media(max-width: 576px) {

    .decore-left,
    .decore-right {
        width: 140px;
    }
}
</style>
