<template>
<div>
  <Login v-if="!isLogin" @emitHasToken="changeIsLogin"></Login>
  <Home v-else-if="!changePage" @emitChangePage="doChangePage"></Home>
  <EditTask v-else-if="editValue" :editValue="editValue" @getEdit="getEdit"></EditTask>
</div>
</template>

<script>
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import EditTask from './views/EditTask.vue'
import axios from 'axios'

export default {
    name: "app",
    data() {
        return {
            message: "HALLO VUE",
            isLogin: false,
            changePage: false,
            editValue: {}
        }
    },
    components: {
        Home,
        Login,
        EditTask
    },
    methods: {
        changeIsLogin(val) {
            this.isLogin = val
        },
        doChangePage(val) {
            this.changePage = val
            this.editValue = val
        },
        getEdit() {
            this.changePage = true
            axios({
                method: 'PUT',
                url: `http://localhost:3000/tasks/${this.editValue.id}`,
                data: {
                    title: this.editValue.title,
                    description: this.editValue.description,
                    dueDate: this.editValue.dueDate,
                    priority: this.editValue.priority,
                    category: this.editValue.category
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(({ data }) => {
                console.log(data)
                this.changePage = false
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },
    created() {
        if(localStorage.access_token) {
            this.isLogin = true
        } else {
            this.isLogin = false
        }
    }

}
</script>

<style>

</style>