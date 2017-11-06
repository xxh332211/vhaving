<template>
	<div class="filecontent">
		<label for="">
			合同扫描照：
		</label>
		<input type="input" name="" id="" value="" class="arrt" />
		<a href="javascript:;" class="file">浏览
        <input type="file" :accept="accepts" @change="upload" >
        <slot></slot>
    	</a>
	</div>
	
</template>

<script>
	/* eslint-disable */
	export default {
        name : 'MoUpload',
        props : {
            accepts : { //允许的上传类型
                type : String,
                default : 'image/jpeg,image/jpg,image/png,image/gif'
            },
            flag : [String, Number], //当前上传标识,以便于在同一个监听函数中区分不同的上传域
            maxSize : {
                type : Number,
                default : 0 //上传大小限制
            }, 
        }
//      methods: {
//          upload (event) {
//              let file = event.target.files[0]
//              const self = this
//              const flag = this.flag
//              if (file) {
//                  if (this.maxSize) {
//                      //todo filter file
//                  }
//                  //filter file, 文件大小,类型等过滤
//                  //如果是图片文件
//                  // const reader = new FileReader()
//                  // const imageUrl = reader.readAsDataURL(file)
//                  // img.src = imageUrl //在预览区域插入图片
//
//                  const formData = new FormData()
//                  formData.append('file', file)
//                  
//                  //获取token
//                  this.$http.get(`/api/token/`)
//                  .then(response => {
//                      const result = response.body
//                      formData.append('token', result.token)
//                      formData.append('key', result.key)
//                      //提交给七牛处理
//                      self.$http.post('https://up.qbox.me/', formData, {
//                          progress(event) {
//                              //传递给父组件的progress方法
//                              self.$emit('progress', parseFloat(event.loaded / event.total * 100), flag) 
//                          }
//                      })
//                      .then(response => {
//                          const result = response.body
//                          if (result.hash && result.key) {
//                              //传递给父组件的complete方法
//                              self.$emit('complete', 200 , result, flag)
//                              //让当前target可以重新选择
//                              event.target.value = null
//                          } else {
//                              self.$emit('complete', 500, result, flag)
//                          }
//                      }, error => self.$emit('complete', 500, error.message), flag)
//                  })
//              }
//          }
//      }
    }
	
	
</script>

<style>
.filecontent input{
	width: 3.5rem;
    border:.01rem solid #c6c6c6;
    height: 0.5rem;
    border:.01rem solid #C6C6C6;
    border-radius: .06rem;
}
.file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: .2rem;
    left: -.7rem;
    top: .1rem;
}
.file label{
	position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
}

</style>