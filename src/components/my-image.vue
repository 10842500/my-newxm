<template>
<div class="image-container">
<div class="img-btn" @click="fn()">
    <img src="../assets/images/default.png" alt=""></div>
<!-- 对话框 -->
<el-dialog :visible.sync="dialogVisible" width="700px">
     <!-- v-model="activeName"  activeName是选项卡标签的name属性的值-->
      <!-- label="用户管理"  选项卡标签的文字 -->
      <!-- el-tab-pane 标签的内容  就是选项卡对应的内容 -->
      <!-- <el-tabs v-model="activeName" type="card">

      </el-tabs> -->
    <el-tabs v-model="activeName" type="card" >
    <el-tab-pane label="素材库" name="pub">
        <div>
            <el-radio-group v-model="reqParams.collect" size="small" @change="search()">
          <!-- 这儿的lable得写成自定义的属性，需要把后面的false和true解析成表达式，而不是字符串 -->
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        </div>
        <!-- 图片列表 -->
        <div class="img-item" :class="{selected:selectedImageUrl===item.url}" @click="selectedImage(item.url)" v-for="item in images" :key="item.id">
            <img :src="item.url" alt />
          </div>
          <el-pagination background layout="prev, pager, next" :total="total" :page-size="reqParams.per_page" :current-page="reqParams.page"  @current-change="pager"></el-pagination>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="photo">
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="headers"
          name="image"
          :show-file-list="false"
          :on-success="handleSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-tab-pane>

  </el-tabs>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </span>

</el-dialog>
</div>

</template>

<script>
export default {
  name: 'my-image',
  data () {
    return {
      // 控制对话框显示隐藏
      dialogVisible: false,
      activeName: 'pub',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 图片上传后预览地址
      imageUrl: null,
      images: [],
      // 总条数
      total: 0,
      // 选中的图片地址
      selectedImageUrl: null,
      // 设置请求头
      headers: {
        // 设置请求头
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('newxm')).token
      }

    }
  },
  methods: {
    // 选中图片
    selectedImage (url) {
    // 思路 :class={selected:条件}
    // 条件 记录上去点击图片的唯一标识 然后 去比对每次遍历的图片的唯一标识
    // 如果一致  选中  不一致  不选中
    // 此时图片地址做为唯一标识  将来提交的数据是地址不是ID
      this.selectedImageUrl = url
    },
    // 上传功能
    handleSuccess (res) {
      this.imageUrl = res.data.url
    },

    fn () {
      this.dialogVisible = true
      // 发送请求
      this.getImage()
    },
    async getImage () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 切换收藏功能
    search () {
      this.reqParams.page = 1
      this.getImage()
    },
    // 分页功能
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImage()
    }

  }
}
</script>

<style scoped lang="less">
.img-item {
    height: 120px;
    width: 150px;
    border:1px dashed #ddd;
    display: inline-block;
    margin-right: 10px;
    position: relative;
     &.selected{
    &::before{
      // .img-item.selected::before{} 加上selected class加遮罩层
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.2) url(../assets/images/selected.png) no-repeat center / 50px 50px;
    }
  }

    img {
        width: 130px;
        height: 100px;
        display: block;
        object-fit: contain;
    }
}
    .img-btn{
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img{
    width: 100%;
    height: 100%;
    display: block;
  }
}

</style>
