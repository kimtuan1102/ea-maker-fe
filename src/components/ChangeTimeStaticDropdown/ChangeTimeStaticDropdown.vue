<template functional>
<vs-dropdown vs-trigger-click class="cursor-pointer" :class="data.staticClass">
    <small class="flex cursor-pointer">
        <span>{{parent.selectedStr}}</span>
        <feather-icon icon='ChevronDownIcon' svgClasses='h-4 w-4' class='ml-1' />
    </small>
    <vs-dropdown-menu class="w-32">
        <vs-dropdown-item @click="listeners.timeDurationChanged('day','Theo Ngày')">Theo Ngày</vs-dropdown-item>
        <vs-dropdown-item @click="listeners.timeDurationChanged('week','Theo Tuần')">Theo Tuần</vs-dropdown-item>
        <vs-dropdown-item @click="listeners.timeDurationChanged('month','Theo Tháng')">Theo Tháng</vs-dropdown-item>
        <vs-dropdown-item @click="listeners.timeDurationChanged('year','Theo Năm')">Theo Năm</vs-dropdown-item>
    </vs-dropdown-menu>
</vs-dropdown>
</template>

<script>
export default {
    props: {
        // "valueStatic": {
        //     default: "Theo Ngày"
        // }
    },
    data: function () {
        return {
            
        };
    },
    methods: {
        timeDurationChanged: function (value, des) {
            this.$emit('timeDurationChanged', value,des)
        }
    }
   
};
</script>
