<template>
  <div>
    <!-- 筛选表单 -->
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <!-- <el-form :model="reqParams">
        <el-form-item label="状态:">
            <el-redio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            </el-redio-group>
        </el-form-item>
      </el-form>-->
      <el-form :model="reqParams" size="small" label-width="80px">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
           <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
           value-format="yyyy-MM-dd"
          @change="changeData"
            v-model="dateValues"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="serch()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->
    <el-card>
      <div slot="header">
        根据筛选条件共查询到
        <b>{{total}}</b> 条结果：
      </div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:100px;height:75px;">
              <div slot="error">
                <img src="../../assets/images/error.gif" width="100" height="75" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1" >待审核</el-tag>
            <el-tag v-if="scope.row.status === 2"  type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4"  type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row.id)" icon="el-icon-edit" plain type="primary" circle></el-button>
            <el-button @click="del(scope.row.id)" icon="el-icon-delete" plain type="danger" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
        <div class="box">
            <el-pagination background layout="prev, pager, next" :total="total" @current-change="pager" :current-page="reqParams.page"
          :page-size="reqParams.per_page"></el-pagination>

        </div>

    </el-card>
  </div>
</template>

<script>
// import { async } from 'q'
// import MyBread from '@/components/my-bread.vue'
export default {
  // 注册组件
  //   components: { MyBread },
  //   data () {
  //     return {
  //       reqParams: {
  //         status:
  //       }
  //     }
  //   }
  data () {
    return {
      // 提交后的筛选条件数据
      reqParams: {
        // 当前页数
        page: 1,
        // 每页数量
        per_page: 20,
        // 默认数据 '' 与 null 区别
        // 如果是 null 该字段是不会提交给后台的。
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null

      },
      // 频道的选项数组
      // channelOptions: [{ name: 'java', id: 1 }],
      // 日期数据
      dateValues: [],
      // 文章列表数据
      articles: [],
      // 总条数
      total: 0

    }
  },
  created () {
    // this.qnmd()
    this.getArticles()
  },
  methods: {
    // 编辑跳到publish页面
    edit (id) {
      this.$router.push(`/publish?id=${id}`)
    },
    // 删除
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送axios请求
        await this.$http.delete(`articles/${id}`)
        // 提示删除成功
        this.$message.success('删除成功')
        // 更新列表
        this.getArticles()
      }).catch(() => {

      })
    },
    // 请求页数
    pager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    // 选择时间事件
    changeData (dateValues) {
      this.reqParams.begin_pubdate = dateValues[0]
      this.reqParams.end_pubdate = dateValues[1]
    },
    // 搜索功能
    serch () {
      this.getArticles()
    },
    // async qnmd () {
    //   // 下拉列表渲染
    //   // 发送axios请求
    //   const {
    //     data: { data }
    //   } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    // },
    // 获取文章列表数据
    async getArticles () {
      // post 传参  post('url',{参数对象})
      // get 传参 get('url?key=value&....') get('url',{params:{参数对象}})
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      // 获取总条数
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang="less">
    .box {
        text-align: center;
        margin-top: 20px;

    }
</style>
