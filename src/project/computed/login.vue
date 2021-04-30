<template>
  <div class="loginbody">
    <div class="login_cnt">
      <div>
        <h3 class="frametitle">欢迎登录</h3>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
          <el-form-item prop="username">
            <div>用户名</div>
            <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
              <template #prefix>
                <svg-icon icon-class="user" class="input-icon" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <div>密码</div>
            <el-input
              v-model="loginForm.password"
              type="password"
              auto-complete="off"
              placeholder="密码"
              @keyup.enter.native="handleLogin"
            >
              <template #prefix>
                <svg-icon icon-class="password" class="input-icon" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item style="width:100%;">
            <el-button
              :loading="loading"
              size="medium"
              type="primary"
              style="width:100%;"
              @click.native.prevent="handleLogin"
            >
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// import { reactive, toRefs, onRenderTriggered  } from 'vue'
import Cookies from "js-cookie";

import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: "Login",

  // setup(props,context){
  //   console.log(props)
  //   console.log(context)
  //   const data = reactive({
  //     loginForm:{
  //       username: "admin",
  //       password: "admin123",
  //     },
  //     loginRules: {
  //         username: [
  //           { required: true, trigger: "blur", message: "用户名不能为空" }
  //         ],
  //         password: [
  //           { required: true, trigger: "blur", message: "密码不能为空" }
  //         ]
  //       },
  //       loading: false
  //   })
  //   const refData = toRefs(data);
  //   onRenderTriggered((event) => {
  //     console.log(event);
  //   });
  //   return {
  //     ...refData
  //   }

  // },
  data() {
    return {
       loginForm: {
        username: "lotutjk",
        password: "lotut8888",
        },
        loginRules: {
          username: [
            { required: true, trigger: "blur", message: "用户名不能为空" }
          ],
          password: [
            { required: true, trigger: "blur", message: "密码不能为空" }
          ]
        },
        loading: false
      }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCookie();
  },
  methods: {
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch("Login", this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
          }).catch(() => {
            this.loading = false;
          });
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.loginbody {
  box-sizing: border-box;
  width: 100%;
  input:-webkit-autofill {
    -webkit-text-fill-color: #333 !important; /*记住密码的字的颜色*/
    transition: background-color 5000s ease-in-out 0s; /*延时渲染背景色来去除背景色*/
    caret-color: #333; /*光标颜色*/
  }
  input::-webkit-input-placeholder {
    color: #ccc;
    font-size: 16px;
  }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #ccc;
    font-size: 16px;
  }
  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #ccc;
    font-size: 16px;
  }
  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #ccc;
    font-size: 16px;
  }
  .login_cnt {
    min-height:100vh;
    background: url("~@/assets/images/login_bot_bg.png") no-repeat center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    > div {
      width: 600px;
      background: #fff;
      box-shadow: 0px 0px 30px 0px rgba(255, 73, 136, 0.08);
      border-radius: 10px;
      min-height: 458px;
      .frametitle {
        color: @primary-color;
        font-size: 26px;
        font-weight: 700;
        text-align: center;
        margin: 30px 0px;
      }
      .login-form {
        width: 500px;
        margin: 0px auto;
        font-size: 18px;
        color: #333;
        .input-icon {
          color: @primary-color;
        }
        ::v-deep(.el-form-item__content) {
          font-size: 18px;
          .el-input--small {
            margin-top: 10px;
            input {
              width: 500px;
              height: 60px;
              line-height: 60px;
              border-radius: 5px;
              border: 1px solid #ddd;
              background: #fff;
              padding-left: 40px;
              padding-right: 20px;
              font-size: 18px;
              & + span {
                font-size: 18px;
                display: flex;
                align-items: center;
                left: 10px;
              }
              &:focus {
                outline: none;
                border: 1px solid @primary-color;
                box-shadow: 0px 0px 10px 0px rgba(255, 73, 136, 0.15);
              }
            }
          }
          button {
            height: 60px;
            background: linear-gradient(90deg, #ff6494 0%, @primary-color 100%);
            box-shadow: 0px 5px 10px 0px rgba(255, 73, 136, 0.2);
            border-radius: 5px;
            width: 400px;
            margin-top: 10px;
            font-size: 18px;
            color: #fff;
            border: none;
          }
        }
      }
    }
  }
}
</style>

