<template>
  <div class="hd-header">
    <!-- // draggable 属性规定元素是否可拖动
// dragstart 事件在用户开始拖动元素或选择的文本时触发
// dragover 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
// dragenter - 当被鼠标拖动的对象进入其容器范围内时触发此事件
    // dragend - 用户完成元素拖动后触发-->
    <el-table :data="tableData" style="wight:100%" border>
      <el-table-column label="操作" width="110">
        <template slot-scope="scope">
          <span class="el-icon-close" @click="removeTS(scope.$index)"></span>
          <span class="el-icon-plus" style="margin:0px  15px" @click="addTS(scope.$index,$event)"></span>
          <span
            class="el-icon-rank"
            draggable="true"
            @dragstart="handleDragStart($event, scope.row)"
            @dragover.prevent="handleDragOver($event, scope.row)"
            @dragenter="handleDragEnter($event, scope.row)"
            @dragend="handleDragEnd($event, scope.row)"
            @mousedown="aa()"
            @mouseup="bb()"
          ></span>
        </template>
      </el-table-column>

      <el-table-column label="参数名称" draggable="true" width="200">
        <template slot-scope="scope">
          <input
            type="text"
            class="cname"
            v-model="tableData[scope.$index].cname"
            :style="{ 'text-indent':indent[scope.$index]+'px'}"
          />
        </template>
      </el-table-column>

      <el-table-column label="是否必填" draggable="true" width="100">
        <template slot-scope="scope">
          <el-select v-model="tableData[scope.$index].isrequired">
            <el-option label="true" value="true"></el-option>
            <el-option label="false" value="false"></el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="类型" width="110">
        <template slot-scope="scope">
          <el-select v-model="tableData[scope.$index].type">
            <el-option 
            v-for="(item,index) in type"
            :key="index"
            :label="item.name"
            :value="item.id">
             </el-option>
            
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="mock数据" width="200">
        <template slot-scope="scope">
          <input
            type="text"
            class="mock"
            v-model="tableData[scope.$index].mockValue"
            @input="aa(scope.$index,scope.row.name)"
          />
        </template>
      </el-table-column>

      <el-table-column label="描述">
        <template slot-scope="scope">
          <input
            type="text"
            class="mock"
            v-model="tableData[scope.$index].detail"
            @input="aa(scope.$index,scope.row.name)"
          />
        </template>
      </el-table-column>
    </el-table>

    <div>
      <div class="addParm">
        <span class="apbt" @click="addTT()">
          <el-button type="primary" size="small">
            <span class="el-icon-circle-plus-outline"></span>&#12288;添加参数
          </el-button>
        </span>
        <span class="apbt">
          <el-button type="primary" size="small" @click="pushData($event)">
            <span class="el-icon-sort"></span> 导入数据
          </el-button>
        </span>
      </div>
    </div>
    <!-- <el-button :plain="true" @click="open2()">成功</el-button> -->
  </div>
</template>

<script>
export default {
  props: ["msbox", "indextp", "tableData"], //消息弹窗
  data() {
    return {
      type: [
        {id:1,name: "string"},
        {id:2,name: "number"},
        {id:3,name: "boolean"},
        {id:4,name: "object"},
        {id:5,name: "array"},
        {id:6,name: "file"},
        {id:7,name: "null"},
        ],
      dragging: null,
      indent: [] //输入框的边距
      // tableData: [
      //   { cname: "aaa", isrequired: "ture", type: "ture", detail: "这是请求头1" },
      //   { cname: "b", isrequired: "ture", type: "ture", detail: "这是请求头2" },
      //   { cname: "c", isrequired: "ture", type: "ture", detail: "这是请求头3" },
      //   { cname: "d", isrequired: "ture", type: "ture", detail: "这是请求头4" },
      //   { cname: "e", isrequired: "ture", type: "ture", detail: "这是请求头5" },
      //   { cname: "f", isrequired: "ture", type: "ture", detail: "这是请求头6" }
      // ],
      // postHeader: [
      //   { cname: "a1", isrequired: "ture", type: "ture", detail: "这是网站1"},
      //   { cname: "b1", isrequired: "ture", type: "ture", detail: "这是网站2" },
      //   { cname: "c1", isrequired: "ture", type: "ture", detail: "这是网站3" },
      //   { cname: "d1", isrequired: "ture", type: "ture", detail: "这是网站4"},
      //   { cname: "e1", isrequired: "ture", type: "ture", detail: "这是网站5" },
      //   { cname: "f1", isrequired: "ture", type: "ture", detail: "这是网站6"}
      // ],
      // postData: [
      //   { cname: "a2", isrequired: "ture", type: "ture", detail: "这是请求参数1" },
      //   { cname: "b2", isrequired: "ture", type: "ture" , detail: "这是请求参数2"},
      //   { cname: "c2", isrequired: "ture", type: "ture", detail: "这是请求参数3" },
      //   { cname: "d2", isrequired: "ture", type: "ture", detail: "这是请求参数4" },
      //   { cname: "e2", isrequired: "ture", type: "ture", detail: "这是请求参数5" },
      //   { cname: "f2", isrequired: "ture", type: "ture", detail: "这是请求参数6" }
      // ]
    };
  },
  methods: {
    pushData(a) {
      this.$parent.postType = this.indextp;
      return this.$emit("update:msbox", !this.msbox);
    },
    // draggable 属性规定元素是否可拖动
    // dragstart 事件在用户开始拖动元素或选择的文本时触发
    // dragover 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
    // dragenter - 当被鼠标拖动的对象进入其容器范围内时触发此事件
    // dragend - 用户完成元素拖动后触发-->
    handleDragStart(e, item) {
      this.dragging = item; // 元素
    },
    handleDragEnd(e, item) {
      this.dragging = null;
    },
    //首先把div变成可以放置的元素，即重写dragenter/dragover
    // DataTransfer 对象用来保存，通过拖放动作，拖动到浏览器的数据。
    // 如果dropEffect 属性设定为none,则不允许被拖放到目标元素中。
    handleDragOver(e) {
      e.dataTransfer.dropEffect = "all"; // e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
    },
    handleDragEnter(e, item) {
      e.dataTransfer.effectAllowed = "all"; //为需要移动的元素设置dragstart事件
      if (item === this.dragging) {
        return;
      }
      const startEleIndex = this.tableData.indexOf(this.dragging); // 开始的元素位置索引

      const endEleIndex = this.tableData.indexOf(item); // 现在元素位置

      //交换父级id
      if (this.dragging) {
        
        var startEle = this.tableData[startEleIndex];
        var endEle = this.tableData[endEleIndex];
        var startParentId = this.tableData[startEleIndex].parentId;
        var startId = this.tableData[startEleIndex].id;

        var endParentId = this.tableData[endEleIndex].parentId;
        var endId = this.tableData[endEleIndex].id;
        //交换拖拽前后的parentId和Id  一定要在替换整个元素前做处理
        this.tableData[startEleIndex].parentId = endParentId;
        this.tableData[startEleIndex].id = endId;
        this.tableData[endEleIndex].parentId = startParentId;
        this.tableData[endEleIndex].id = startId;

        this.tableData.splice(startEleIndex, 1, endEle); //删除初始位置的元素--并向现在所属位置添加初始位置的元素
        // this.indent.splice(startEleIndex,1,this.indent[startEleIndex])

        this.tableData.splice(endEleIndex, 1, startEle); // 删除光标现在所在位置的值---并添加上次光标所在位置的值
        // this.indent.splice(endEleIndex,1,this.indent[endEleIndex])
        // this.dragging = null;
        console.log(this.tableData)
        
      }

      //   const newItems = [...this.items];
      //   const src = newItems.indexOf(this.dragging);
      //   const dst = newItems.indexOf(item);
      //   // 替换
      //   newItems.splice(dst, 0, ...newItems.splice(src, 1));
      //   // 让item的颜色等于新交换的颜色
      //   this.items = newItems;
    },
    aa() {
    },
    bb() {
    },
    addTS(index, event) {  //添加子级请求头
      if(this.$parent.postType="header-com"){
        var id=this.tableData.length+1
        var parentId=this.tableData[index].id
      }
      if(this.$parent.postType="header-com2"){
        var id=this.tableData.length+1
        var parentId=this.tableData[index].id
      }
      this.tableData.splice(index + 1, 0, {
        cname: "",
        isrequired: "true",
        type: 1,
        detail: "",
        id: id,
        parentId: parentId,
        mockValue:"",
        children: [],
      });
      var tt = this.indent[index];
      this.indent.splice(index + 1, 0, 15 + tt);
      console.log(JSON.stringify(this.tableData))
    },
    addTT() {  //添加请求头顶级
      if(this.$parent.postType="header-com"){
        var id=this.tableData.length+1
      }
      if(this.$parent.postType="header-com2"){
        var id=this.tableData.length+1
      }
      this.tableData.push({
        cname: "",
        isrequired: "true",
        type: 1,
        detail: "",
        id: id,
        parentId: 0,
        mockValue:"",
        children: [],
      });
      this.indent.push(0);
      this.open2();

    },
    open2() {
      this.$message({
        message: "新增成功",
        type: "success",
        duration: 500
      });
    },
    removeTS(index) {

      
      // if(this.$parent.postType="header-com"){
        
      // }
      // if(this.$parent.postType="header-com2"){

      // }

      var id = this.tableData[index].id
      this.tableData.splice(index, 1);
      this.indent.splice(index, 1);
      //这里删除需要坐下处理--如果删除的类容有下级则删除所有下级
      if (id!=0){  //Id等于0就删除所有字段了
        this.findChild(id)
      }
    },
//0, 0, 0, 0, 0, 0, 15, 30,
    //循环遍历查找下级
    findChild(id){
      
      for(var n=0;n<this.tableData.length;n++){

         if(this.tableData[n].parentId==id){
          this.findChild(this.tableData[n].id) //如果找到和删除id相关的之后-继续遍历以找到的这个，直到找完位置

          this.tableData.splice(n, 1);  //找完之后再做删除--先做删除索引会变
          this.indent.splice(n, 1);
          n--
        }
      }

    },
    isListData() {
      console.log(this.tableData)
      if (this.tableData.length == 0 ) {
        this.$set(this.tableData, 0, {
          prop: "",
          isrequired: "true",
          type: "true",
          detail: ""
        });
      }
    },

    indentMarginLeft(data,mariginLeft) {
      for(var n=0;data.length>n;n++){
          this.indent.push(mariginLeft)
          this.indentMarginLeftChild(data,data[n].id,mariginLeft+15)
          data.splice(n,1)
          n--
        }

    },
    indentMarginLeftChild(data,id,mariginLeft){
      for(var n=0;data.length>n;n++){
        if(id==data[n].parentId){
          this.indent.push(mariginLeft)
          this.indentMarginLeftChild(data,data[n].id,mariginLeft+15)   
          // var id=
          data.splice(n,1)
          n--
        }
      }
   
  },
  created() {
    
  },
  updated() {
    // this.isListData(), //如果列表为空则自动添加一个
     this.indent.splice(0,this.indent.length)
        var  data=JSON.parse(JSON.stringify(this.postData))
        this.indentMarginLeft(data,0)
  },
  }
};

</script>

<style lang="scss" scoped>

</style>

<style>
.hd-header {
  margin-top: 20px;
  min-width: 100px;
}
.hd-header .cell {
  text-align: center;
  /* overflow:none !important; */
}

.hd-header .cname {
  position: relative;
  /* overflow: visible; */
  border: 1px solid #ffffff;
  outline: none;
  width: 90%;
  height: 36px;
  margin-left: 0px;
}
/* .el-table__row:hover .cname{
    background: rgb(245, 247, 250);
    border: 2px solid rgb(245, 247, 250)
} */

.hd-header .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #ffffff !important;
}
.hd-com tbody .el-table__row td {
  padding: 0px !important;
}
.hd-com .el-input .el-input__icon {
  height: 33px;
}
.hd-com .el-input .el-input__inner {
  height: 25px;
}
.hd-header .addParm {
  margin: 10px 0 10px 0;
}
.hd-header .addParm .apbt {
  width: 20px;
  margin-right: 10px;
}
</style>