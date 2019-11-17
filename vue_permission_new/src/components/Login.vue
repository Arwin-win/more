<template>
  <div class="login">
    <div class="login_box">
      <Form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-position="top">
        <FormItem label="用户名" prop="username">
          <Input v-model="loginForm.username" placeholder="请输入用户名"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model="loginForm.password" placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit">登录</Button>
          <Button type="default" @click="handleReset">重置</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginFormRules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleReset() {
      this.$refs.loginFormRef.resetFields();
    },
    handleSubmit() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return this.$Message.error("用户名或密码不能为空!");
        //普通管理员
        if(this.loginForm.username == 'admin' && this.loginForm.password == '123456'){
          window.sessionStorage.setItem('token','oihwefihweifhwiefhwefwe')
          window.sessionStorage.setItem('role','admin')
          this.$router.push('/home')
        }else if(this.loginForm.username == 'super' && this.loginForm.password == '123456'){
          //超级管理员
          window.sessionStorage.setItem('token','oihwefihweifhwiefhwefwe')
          window.sessionStorage.setItem('role','super')
          this.$router.push('/home')
        }else{
          this.$Message.error('账号密码不正确')
          this.$refs.loginFormRef.resetFields()
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}
.login_box {
  color: #fff;
  width: 600px;
  height: 300px;
  padding: 20px;
  padding-top: 80px;
  box-sizing: border-box;
  box-shadow: 0px 0px 0px #ccc;
  background-color: #0097a7;
  position: relative;
  &::after {
    display: block;
    content: "";
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: #0097a7;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -50%);
  }
}
.ivu-btn {
  margin-right: 20px;
}
</style>