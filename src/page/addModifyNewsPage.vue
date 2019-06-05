<!-- 组件代码如下 -->
<template>
  <div id="ReleaseNews">
    <headerNav></headerNav>
   
      
    <el-container class="main">
        <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="box">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/newsManagePage' }">我的新闻</el-breadcrumb-item>
                <el-breadcrumb-item v-if="isModify">修改新闻</el-breadcrumb-item>
                <el-breadcrumb-item v-else>发布新新闻</el-breadcrumb-item>
            </el-breadcrumb> 
            <el-row class="warp">
                    <!--
            Form 组件提供了表单验证的功能，只需要通过 rule 属性传入约定的验证规则，并 Form-Item 的 prop 属性设置为需校验的字段名即可。具体可以参考官网：http://element.eleme.io/#/zh-CN/component/form
            -->
                <el-col :span="24" class="warp-main">
                    <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="50px">
                        <el-form-item label="标题" prop="a_title">
                            <el-input v-model="infoForm.a_title"></el-input>
                        </el-form-item>
                

                        <el-form-item label="类型" prop="a_title">
                            <el-select v-model="infoForm.a_type" placeholder="a_type">
                                <el-option
                                    v-for="item in type"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    
                        <el-form-item label="图片" prop="imageUrl">
                            
                            <el-upload
                                class="avatar-uploader"
                                ref="upload"
                                name="picture"
                                :action="serverUrl"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                                >
                                <img v-if="infoForm.imageUrl" :src="infoForm.imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>

                        </el-form-item>


                        <!--使用编辑器-->
                        <el-form-item label="内容" prop="a_content">
                            <div class="edit_container">
                                <editor @getContent="getContent" :acontent="this.acontent"></editor>
                            </div>
                        </el-form-item>
                

                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">发布</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            
            
            </el-row>        
        </el-main> 
    </el-container>
    
    

  </div>
  
</template>
<script>
import editor from '@/components/editor';
// 导入头部
import headerNav from '../components/headerNav';
import { mapState } from 'vuex';

export default {
    name:'addModifyNewsPage',
    components:{
        editor,headerNav
    },
    mounted() {
        //判断是否是在修改新闻
        let id = this.$route.query.NewsID;
        //console.log(id)
        if(id!=undefined){
          this.isModify=true;
          this.addmodify="modify";
          this.getAjaxNewsInfo();
        }else{
          this.isModify=false;
          this.addmodify="add";
        }
    },
    data() {
      return {
        serverUrl: this.$apiList['imgUpload'],  // 这里写你要上传的图片服务器地址
        infoForm: {
          a_title: '',
          a_type:'时政',
          a_content:'',
          imageUrl: '',
        },
        isModify:false,
        addmodify:'add',
        type: [{
            value: '体育',
            label: '体育'
          }, {
            value: '时政',
            label: '时政'
          }, {
            value: '娱乐',
            label: '娱乐'
          }, {
            value: '科技',
            label: '科技'
          }, {
            value: '财经',
            label: '财经'
          }, {
            value: '生活',
            label: '生活'
          }]
        ,
        // 表单验证
        rules: {
            a_title: [
                {required: true, message: '请将信息填写完整', trigger: 'blur'}
            ],
            a_type: [
                {required: true, message: '请选择类型', trigger: 'blur'}
            ],
            a_content: [
                {required: true, message: '请填写内容', trigger: 'blur'}
            ],
            imageUrl:[
                {required: true, message: '请上传图片', trigger: 'blur'} 
            ]
        },
        acontent:''
      }
    },
    methods: {
     
    onSubmit:function() {
    // 提交
    //this.$refs.infoForm.validate，这是表单验证
        this.$refs.infoForm.validate((valid) => {
            if(valid) {
                // console.log(this.user.username)
                if(this.user.username){
                    if(this.user.power!=1){
                        alert("你没有权限发表新闻！");
                        return;
                    }
                    this.getAjaxAddModifynews();
                }else{
                    alert("登录后才能发表");
                    return;
                }  
            }
        });
    },
    
    // 文件上传成功的钩子函数
    handleAvatarSuccess(res, file) {
        // // res为图片服务器返回的数据
        // // 获取富文本组件实例
        console.log(res);
        // 如果上传成功
        if (res.code == 200 ) {
            // 插入图片  res.url为服务器返回的图片地址
            this.infoForm.imageUrl=res.url;
        } else {
            alert('图片插入失败')
        }
       
    },
    // 文件上传前的前的钩子函数
    // 参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isGIF = file.type === 'image/gif';
        const isPNG = file.type === 'image/png';
        const isBMP = file.type === 'image/bmp';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isGIF && !isPNG && !isBMP) {
            this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
        }
        if (!isLt2M) {
            this.$message.error('上传图片大小不能超过 2MB!');
        }
        return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
    },
    handlePictureCardPreview(file){
        console.log(file.url)
        this.infoForm.imageUrl = file.url;
    },
    getContent:function(content){
        this.infoForm.a_content=content;
    },
    async getAjaxAddModifynews(){
        if(this.addmodify=="add"){
            let param = new URLSearchParams()
                param.append('username',this.user.username)
                param.append('newsTitle',this.infoForm.a_title)
                param.append('newsContent',this.infoForm.a_content)
                param.append('imgUrl',this.infoForm.imageUrl)
                param.append('type',this.infoForm.a_type)
            let addNews = await this.$http({
                method:'post',
                data:param,
                url:this.$apiList['addNews']
            });
            // console.log(addNews.data)
            if(addNews.data){
                alert("发布成功！")
                this.$router.push({ name: 'newsManagePage'});
            }
        }else{
            let param = new URLSearchParams()
                param.append('newsId',this.$route.query.NewsID)
                param.append('username',this.user.username)
                param.append('newsTitle',this.infoForm.a_title)
                param.append('newsContent',this.infoForm.a_content)
                param.append('imgUrl',this.infoForm.imageUrl)
                param.append('type',this.infoForm.a_type)
            let updateNews = await this.$http({
                method:'post',
                data:param,
                url:this.$apiList['updateNews']
            });
            if(updateNews.data){
                alert("修改成功！")
                this.$router.push({ name: 'newsManagePage'});
            }
        }
      },
      async getAjaxNewsInfo(){
            //获取新闻id
            let param = new URLSearchParams()
            param.append('newsId', this.$route.query.NewsID)
            let newsData = await this.$http({
                method:'post',
                data:param,
                url:this.$apiList['newsData']
            });
            console.log(newsData.data)
            this.infoForm.a_title = newsData.data.newsTitle;
            this.infoForm.imageUrl = newsData.data.imgUrl;
            this.acontent = newsData.data.newsContent;
            this.infoForm.a_type = newsData.data.type;
        }
    },
    computed:{
        ...mapState({
            // 获取用户信息
            user:state => state.currentUser
        })
    }



  }
</script>
<style lang="less" scoped> 
@import '../assets/style/mixin';
#ReleaseNews{
    .mx_wh(80%,auto);
    margin: 0 auto;
    .main{
        .mx_wh(100%,auto);
        .el-main {
            background-color: rgb(255, 255, 255);
            .mx_fc(15px,#333);
            text-align: center;
            .mx_wh(80%,auto);
            padding:20px 10%;
            box-sizing:border-box;
            .box{
                margin:20px 0 40px; 
            }
            button{
                float: right;
            }
            .el-select {
                float: left;
            }
            .avatar-uploader{
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                float: left;
                .avatar-uploader-icon {
                    font-size: 28px;
                    color: #8c939d;
                    width: 178px;
                    height: 178px;
                    line-height: 178px;
                    text-align: center;
                }  
                .avatar {
                    width: 178px;
                    height: 178px;
                    display: block;
                }
            }
            .avatar-uploader:hover {
                border-color: #409EFF;
            }
        }
        
    }
    
}

  
</style>