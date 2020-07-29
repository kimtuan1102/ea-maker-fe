<template>
<div>
    <vs-alert color="danger" title="User Not Found" :active.sync="user_not_found">
        <span>User record with id: {{ $route.params.userId }} not found. </span>
        <span>
            <span>Check </span>
            <router-link :to="{name:'page-user-list'}" class="text-inherit underline">All Users</router-link>
        </span>
    </vs-alert>
</div>
</template>

<script>
export default {
    name: 'UserView',
    components: {},
    props: {},
    data() {
        return {}
    },
    mounted() {},
    beforeDestroy() {},
    methods: {}
}
</script>

<style lang="css" scoped></style>
