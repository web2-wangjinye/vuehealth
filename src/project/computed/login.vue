<template>
  <!-- // <div>
        //   <div class="d_inpu">
        //     <div>手机号</div>
        //     <div>
        //       <img :src="require('@/assets/images/user.png')" />
        //       <input
        //         type="text"
        //         v-model="username"
        //         placeholder="手机号"
        //         autocomplete="off"
        //       />
        //        <div class="error">手机号有误</div>
        //     </div>
           
        //   </div>
        //   <div class="d_inpu">
        //     <div>密码</div>
        //     <div>
        //       <img :src="require('@/assets/images/pass.png')" />
        //       <input
        //         type="password"
        //         v-model="password"
        //         placeholder="请输入登录密码"
        //         autocomplete="off"
        //       />
        //        <div class="error">手机号有误</div>
        //     </div>
        //   </div>
        //   <div class="button_form">
        //     <button @click="submitForm">登录</button>
        //   </div>
  // </div>-->
  <div class="loginbody">
    <div class="login_top">
      <div class="logo_left">
        <img :src="require('@/assets/images/long.png')" />
        <div>
          <b>龍图腾大健康SAAS系统</b>
          <div class="xitong_name">——智慧美业店务管理与营销拓客专家</div>
        </div>
      </div>
      <div>
        <img :src="require('@/assets/images/tel.png')" class="telstyl" />
        <b>0551-62915790</b>
      </div>
    </div>

    <div class="login_cnt">
      <img :src="require('@/assets/images/login_cnt_icon.png')" />
      <div>
        <h3 class="frametitle">欢迎登录系统</h3>

        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
          <el-form-item prop="username">
            <div>手机号：</div>
              <el-input
                placeholder="请输入内容"
                v-model="loginForm.username">
                <template #prefix>
                 <svg-icon icon-class="user" class="el-input__icon input-icon" />
                </template>
              </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <div>密码：</div>
            <el-input
              v-model="loginForm.password"
              type="password"
              auto-complete="off"
              placeholder="密码"
              @keyup.enter="handleLogin"
            >
            <template #prefix>
              <svg-icon icon-class="password" class="el-input__icon input-icon" />
            </template>
            </el-input>
          </el-form-item>
          <el-form-item style="width:100%;">
            <el-button
              :loading="loading"
              size="medium"
              type="primary"
              style="width:100%;"
              @click.prevent="handleLogin"
            >
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="login_bot">
      <ul>
        <li>
          <img :src="require('@/assets/images/bot_icon1.png')" />
          <div>极简开单收银</div>
        </li>
        <li>
          <img :src="require('@/assets/images/bot_icon2.png')" />
          <div>会员精准营销</div>
        </li>
        <li>
          <img :src="require('@/assets/images/bot_icon3.png')" />
          <div>项目售卖/预约</div>
        </li>
        <li>
          <img :src="require('@/assets/images/bot_icon4.png')" />
          <div>精准财务记账</div>
        </li>
        <li>
          <img :src="require('@/assets/images/bot_icon5.png')" />
          <div>社交裂变拓客</div>
        </li>
        <li>
          <img :src="require('@/assets/images/bot_icon6.png')" />
          <div>电商店务管理</div>
        </li>
      </ul>
      <div>©2021 龍图腾健康美肤 地址：合肥市蜀山区融创壹号院三楼商业街323-326 技术热线：17354081302 QQ：157898814 皖ICP备12007331号-2</div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'
export default {
  name: "Login",
  data() {
    return {
       loginForm: {
        username: "",
        password: "",
        loginRules: {
          username: [
            { required: true, trigger: "blur", message: "用户名不能为空" }
          ],
          password: [
            { required: true, trigger: "blur", message: "密码不能为空" }
          ]
        },
        loading: false
      },
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
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
           } else {
            Cookies.remove("username");
            Cookies.remove("password");
          }
          this.$store.dispatch("Login", this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
          }).catch(() => {
            this.loading = false;
            this.getCode();
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
  .login_top {
    min-height: 9.25vh;
    background: #fff;
    width: 1200px;
    margin: 0px auto;
    display: flex;
    justify-content: space-between;
    font-size: 26px;
    align-items: center;
    color: #000;
    .logo_left {
      display: flex;
      align-items: center;
      img {
        width: 60px;
        margin-right: 10px;
      }
      > div {
        width: 343px;
      }
      .xitong_name {
        font-size: 16px;
        text-align: right;
        margin-top: 10px;
      }
    }
    .telstyl {
      width: 34px;
      vertical-align: middle;
      margin-right: 10px;
      & + b {
        font-size: 24px;
        color: #ff4988;
      }
    }
  }
  .login_cnt {
    min-height: 52.75vh;
    background: url("~@/assets/images/login_cnt_bg.png") no-repeat center;
    background-size: 100% 100%;
    padding:0px 18%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > img {
      width: 540px;
      margin-left: 40px;
    }
    > div {
      background: #fff;
      width: 500px;
      box-shadow: 0px 0px 30px 0px rgba(255, 73, 136, 0.08);
      border-radius: 10px;
      height: 458px;
    }
    .frametitle {
      color: #ff4988;
      font-size: 24px;
      font-weight: 700;
      text-align: center;
      margin: 30px 0px;
    }
    .d_inpu {
      width: 400px;
      margin: 0px auto;
      > div {
        font-size: 18px;
        color: #333;
        position: relative;
        margin-bottom: 10px;
        .error {
          font-size: 12px;
          color: @red-color;
          line-height: 24px;
        }
      }
      img {
        position: absolute;
        width: 20px;
        top: 20px;
        left: 15px;
      }

      input {
        width: 400px;
        height: 60px;
        border-radius: 5px;
        border: 1px solid #ddd;
        background: #fff;
        padding-left: 50px;
        padding-right: 20px;
        &:focus {
          outline: none;
          border: 1px solid #ff4988;
          border-color: #ff4988 !important;
          box-shadow: 0px 0px 10px 0px rgba(255, 73, 136, 0.15);
        }
      }
    }

    .button_form {
      text-align: center;
      button {
        height: 60px;
        background: linear-gradient(90deg, #ff6494 0%, #ff4988 100%);
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
  .login_bot {
    min-height: 38vh;
    background: url("~@/assets/images/login_bot_bg.png") no-repeat center;
    background-size: 100% 100%;
    font-size: 16px;
    color: #333;
    position: relative;
    ul {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 50px 360px;
      li {
        text-align: center;
        img {
          width: 45px;
          margin-bottom: 20px;
        }
      }
    }
    > div {
      width: 1200px;
      text-align: center;
      position: absolute;
      bottom: 30px;
      left: 50%;
      margin-left: -600px;
    }
  }
}
</style>

