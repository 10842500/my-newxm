<template>
    <div class="login-container">
        <el-card class="box-card">
            <img src="../../assets/images/logo_index.png" alt="">
            <!-- 登录表单 -->

      <el-form ref="loginForm" status-icon="true" :rules="loginRules" :model="loginForm">
          <el-form-item prop="mobile">
              <el-input v-model="loginForm.mobile" placeholder="请输入手机号" ></el-input>
          </el-form-item>
          <el-form-item prop="code">
              <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:240px" ></el-input>
              <el-button style="float:right">发送验证码</el-button>
          </el-form-item>
           <el-form-item>
              <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
           <el-form-item>
          <el-button style="width:100%" type="primary" @click="login">登 录</el-button>
        </el-form-item>
      </el-form>
        </el-card>
    </div>
</template>

<script>
export default {

  data () {
    var checkmobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机格式不正确'))
      }
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkmobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 对整个表单进行校验
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // 提交成功发送axiso请求
          // this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
          //   .then(res => {
          //     console.log(res.data)
          //     // 保持会话状态 登录信息进行保存
          //     window.sessionStorage.setItem('newxm', JSON.stringify(res.data.data))
          //     this.$router.push('/')
          //   })
          //   .catch(() => {
          //     this.$message.error('手机号或验证码错误')
          //   })
          // 使用async来发送axios请求
          try {
            const res = await this.$http.post('authorizations', this.loginForm)
            window.sessionStorage.setItem('newxm', JSON.stringify(res.data.data))
            this.$router.push('/')
          } catch (err) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style>
    .login-container {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0px;
        top:0px;
        background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;

    }
     .box-card {
            width: 400px;
            height: 340px;
            position: absolute;
            left:50%;
            top:50%;
             transform: translate(-50%,-50%);

        }
        img {
            display: block;
            width: 200PX;
            margin: 10px auto;
        }
</style>
