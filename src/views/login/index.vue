<template>
    <div class="login-container">
        <el-card class="box-card">
            <img src="../../assets/images/logo_index.png" alt="">
        </el-card>
    </div>
</template>

<script>
export default {

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
            height: 300px;
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
