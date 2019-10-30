<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">
      
      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>
      <span class="svg-container">
        <svg-svg icon-class="password" />
      </span>
      <el-form-item prop="username">
        <el-input 
        ref="username"
        name="username"
        v-model="loginForm.username" 
        placeholder="用户名称" 
        type="text" 
        tabindex="1" 
        autoComplete="on"
        >
        <!-- <i slot="prefix" class="el-input__icon el-icon-search"></i> -->
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
        ref="password"
        name="password"
        prefix-icon="el-icon-lock"
        v-model="loginForm.password" 
        placeholder="密码" 
        type="text" 
        tabindex="1" 
        autoComplete="on"
        >  
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>  
      </el-form-item>  
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      }
    }
  },
  created () {
    console.log(this.$store.state.token)
  }
}
</script>

<style scoped>

</style>
