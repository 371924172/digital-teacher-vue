# digital-teacher-vue

#### 介绍
数电远程实验平台后台管理系统前端

#### 软件架构
采用vue框架，项目整体架构源自https://panjiachen.gitee.io/vue-element-admin-site/zh/

其中组件大量使用elemengtui，参考https://element.eleme.cn/#/zh-CN/component/menu

###### tips

1. 登录 账号 11，密码11

1. git clone

2. 修改api/host.js 修改

   ```js
    const host =  "后端地址"
    
    需要同时把后端服务开启，否则会报错

3. 在api文件夹下创建自己的 js 接口文件，命名和view下文件夹名字一样，例如problem.js, user.js 等。

   

4. 在文件下引入host 文件和request 文件

- host为ip地址，方便后期修改

- request为request拦截器，为了给每一个请求后端的request 添加token信息

- 写自己的接口函数

  - 后端接口为restful 风格，注意传入的参数以及method，以problem为例进行说明

    - 查询所有 problem 

      ```js
      export function getProblemList() {
          return request({
              url: host + 'problem/',
              method: 'get',
          })
      }
      ```

    - 新增一个problem

      ```js
      export function addProblem(data) {
          return request({
              url: host + 'problem/'
              method: 'post',
              data
          })
      }
      ```

      

    - 查询 id 为 1 的problem

      ```js
      export function getProblem(id) {
          return request({
              url: host + 'problem/'+ id +'/',
              method: 'get',
          })
      }
      ```

    - 删除id 为1的problem

      ```
      export function deleteProblem(id) {
          return request({
              url: host + 'problem/'+ id +'/',
              method: 'delete',
          })
      }
      ```

    - 修改id 为1的problem

      ```js
      export function updateProblem(data) {
          return request({
              url: host + 'problem/'+ id +'/',
              method: 'get',
              data
          })
      }
      ```

5. 在vue中引入，例如 对于 problem

   ```js
   import {getProblemList,addProblem,getProblem,deleteProblem,updateProblem} from from "@/api/problem";
   
   export default{
       data():{
   		return {
       		problemList:[] //加深会绑定到tabledata
   		}
   	}
       method:{
           //这个函数是新写的，这里命名一致是为了识别，当然命名随便你自己
           getProblemList(){ 
               //这个函数是调用的api/problem里的,then表示函数异步执行
               getProblemList().then((response)=>{ 
                   //response 为后端的相应，你可以打印一下看看里面有什么 console.log(response)
                   this.problemList = response.data; //将后端传过来的data赋值为problemList，这样就实现了查所有
               })
               //下面是处理错误的逻辑，可以先不用管
               //.catch((error)=>{
               //		console.log(error)
               //})
           },
               
           //假设这个函数你绑定了提交按钮,并传入相应的参数
            addProblem(data){
                 addProblem(data).then((response)=>{
                    //成功添加后会返回status为200，以下是为了给用户一个页面上的反馈，建议添加，message的使用参考					 //elementui的组件介绍
                    const { status } = response;
             		 if (status == 200)
               		this.$message({
                			message: "添加成功",
                 			type: "success",
               		});
                   })
               }
       	}
          //对于其他函数同理，注意传入的参数
       },
       mounted() {
           //我们在加载页面之前将数据准备好，这里写在钩子函数里面
       	this.getProblemList();
     	},
   }
   ```

   6. 以下为所有表的接口，由于我们定义了host，访问其他接口的时候只需将 4 提供的例子里的problem 换成对应的名称即可。 

```
	"class": "http://127.0.0.1:8000/class/",
    "college": "http://127.0.0.1:8000/college/",
    "lesson": "http://127.0.0.1:8000/lesson/",
    "major": "http://127.0.0.1:8000/major/",
    "organization": "http://127.0.0.1:8000/organization/",
    "selclass": "http://127.0.0.1:8000/selclass/",
    "student": "http://127.0.0.1:8000/student/",
    "instruct": "http://127.0.0.1:8000/instruct/"
    "problem": "http://127.0.0.1:8000/problem/",
    "ptag": "http://127.0.0.1:8000/ptag/",
    "device": "http://127.0.0.1:8000/device/",
    "drecord": "http://127.0.0.1:8000/drecord/",
    "pcategory": "http://127.0.0.1:8000/pcategory/",
    "pgroup": "http://127.0.0.1:8000/propgroup/",
    "poprecord": "http://127.0.0.1:8000/propcate/",
    "propcate": "http://127.0.0.1:8000/propcate/",
    "propgroup": "http://127.0.0.1:8000/propgroup/",
    "proptag": "http://127.0.0.1:8000/proptag/",
    "psource": "http://127.0.0.1:8000/psource/"
```








