<template>
    <div class="login">
        <h1>WELCOME TO STARFLEET</h1>
        <p>please login to continue:</p>
        <!-- Add error message if login fails -->
        <h5 class="text-danger" v-if="error"><b>{{error}}</b></h5>
        <div v-if="loginForm" class="login">
            <form class="form" @submit.prevent="submitLogin">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input class="form-control" type="email" name="email" placeholder="YOUREMAIL@starfleet.co" v-model='login.email' required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input class="form-control" type="password" name="password" v-model='login.password' required>
                </div>
                <div class="form-group">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
        <div v-else class="register">
            <form class="form" @submit.prevent="submitRegister">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input class="form-control" type="text" name="name" placeholder="name" v-model='register.name' required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input class="form-control" type="email" name="email" placeholder="YOUREMAIL@starfleet.co" v-model='register.email' required>
                </div>
                <div class="form-group">
                    <label for="rank">Rank</label>
                    <input class="form-control" type="text" name="rank" v-model='register.rank' required>
                </div>
                <div class="form-group">
                    <label for="division">Division</label>
                    <input class="form-control" type="text" name="division" v-model='register.division'>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input class="form-control" type="password" name="password" v-model='register.password' required>
                </div>
                <div class="form-group">
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>

        <p v-if="loginForm" @click="toggleLoginForm" class="action">Not a user? Click here to register</p>
        <p v-else @click="toggleLoginForm" class="action">Already a user? Click here to login</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loginForm: true,
                login: {
                    email: '',
                    password: ''
                },
                register: {
                    name: '',
                    email: '',
                    password: '',
                    rank: '',
                    division: ''
                }
            }
        },
        methods: {
            toggleLoginForm(){
                this.loginForm = !this.loginForm
            },
            submitLogin(){
                this.$store.dispatch('login', this.login)
                this.login = {
                    email: '',
                    password: ''
                }
            },
            submitRegister(){
                this.$store.dispatch('register', this.register)
                this.register = {
                    name: '',
                    email: '',
                    password: '',
                    rank: '',
                    division: ''
                }
            }
        },
        computed: {
            error(){
                return this.$store.state.error.message
            }
        }
    }
</script>

<style>
    .action{
        cursor: pointer;
        opacity: .7;
        transition: all .3s linear;
    }
    .action:hover{
        opacity: 1
    }
</style>