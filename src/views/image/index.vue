<template>
  <!-- 使用 v-loading  指定某个区域的加载效果 -->
  <div class="container" v-loading="loading">
    <el-card>
      <!-- 头部部分 -->
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 主体部分 -->
      <div style="margin-bottom:20px">
        <!-- 按钮式的单选框 -->
        <el-radio-group v-model="reqParams.collect" size="small" @change="search()">
          <!-- 这儿的lable得写成自定义的属性，需要把后面的false和true解析成表达式，而不是字符串 -->
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 绿色按钮 -->
        <el-button
          type="success"
          style="float:right"
          size="small"
          @click="dialogVisible = true"
        >上传素材</el-button>
      </div>
      <!-- 图片列表 -->
      <ul class="img_list">
        <li v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <!-- 剔除操作栏： -->
          <div class="fot" v-if="!reqParams.collect">
            <span
              @click="toggleFav(item)"
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
            ></span>
            <span class="el-icon-delete" @click="delImage(item.id)"></span>
          </div>
        </li>
      </ul>
      <!-- 分页 -->
      <el-pagination
        v-if="total>reqParams.per_page"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
      <!-- 添加素材 -->
      <!-- title="提示"  对话框的标题 -->
      <!-- :visible="dialogVisible" 显示隐藏 -->
      <el-dialog title="添加素材" :visible.sync="dialogVisible" width="400px">
        <!-- action 上传素材的接口地址，是完整地址，原因：el-upload不基于axios -->
        <!-- headers  值是对象，在请求头需要携带token -->
        <!-- on-success 上传成功的钩子函数（回调函数） -->
        <!-- name 指定上传文件的字段名称 符合后台的要求 -->
        <!-- imageUrl 数据 预览图片 隐藏上传按钮 -->
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
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 发送给后台的数据
      reqParams: {
        collect: false, // 是否是收藏的图片
        page: 1, // 当前页数
        per_page: 12 // 每页数量
      },
      images: [], // 素材管理
      loading: false, // 加载数据
      total: 0, // 图品总数量
      dialogVisible: false, // 控制对话框显示隐藏的
      imageUrl: null,
      headers: {
        // 设置请求头
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('newxm')).token
      }
    }
  },
  created () {
    //  获取素材列表
    this.getImages()
  },
  methods: {
    //  获取素材列表
    async getImages () {
      this.loading = true
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      //   获取数据成功
      this.images = data.results
      this.total = data.total_count
      this.loading = false
    },
    // 获取收藏列表数据
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 上传成功
    handleSuccess (res) {
      // - 预览 2s 钟 ，提示上传成功
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        // - 自动关闭对话框，更新列表数据。
        this.dialogVisible = false
        this.getImages()
        // 再次打开对话框的时候，预览的是上传按钮 而不是 之前的图片
        this.imageUrl = null
      }, 2000)
    },
    // 收藏素材功能
    async toggleFav (item) {
      const {
        data: { data }
      } = await this.$http.put('user/images/' + item.id, {
        collect: !item.is_collected
      })
      // 成功
      this.$message.success('操作成功')
      // 把当前的图片的状态改成操作后后台给的状态
      item.is_collected = data.collect
    },
    // 删除素材功能
    delImage (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete('user/images/' + id)
          this.$message.success('删除成功')
          this.getImages()
        })
        .catch(() => {})
    }
  },
  components: {}
}
</script>

<style scoped lang='less'>
.img_list {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
  li {
    width: 200px;
    height: 200px;
    border: 1px dashed #ddd;
    float: left;
    margin-right: 50px;
    margin-bottom: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .fot {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
