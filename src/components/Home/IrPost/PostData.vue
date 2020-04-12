<template>
  <div class="hd-header">
    <!-- // draggable 属性规定元素是否可拖动
// dragstart 事件在用户开始拖动元素或选择的文本时触发
// dragover 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
// dragenter - 当被鼠标拖动的对象进入其容器范围内时触发此事件
    // dragend - 用户完成元素拖动后触发-->
    <el-table :data="postData" style="wight:100%" border>
      <el-table-column label="操作">
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

      <el-table-column label="参数名称" draggable="true">
        <template slot-scope="scope">
          <input
            type="text"
            class="cname"
            v-model="postData[scope.$index].cname"
            :style="{ 'text-indent':indent[scope.$index]+'px'}"
          />
        </template>
      </el-table-column>

      <el-table-column label="是否必填" draggable="true">
        <template slot-scope="scope">
          <el-select v-model="postData[scope.$index].isrequired">
            <el-option label="true" value="true"></el-option>
            <el-option label="false" value="false"></el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="类型">
        <template slot-scope="scope">
          <el-select v-model="postData[scope.$index].type">
            <el-option label="true" value="true"></el-option>
            <el-option label="false" value="false"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="mock数据">
        <template slot-scope="scope">
          <input
            type="text"
            class="mock"
            v-model="postData[scope.$index].mockValue"
            @input="aa(scope.$index,scope.row.name)"
          />
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          <input
            type="text"
            class="cname"
            v-model="postData[scope.$index].detail"
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
        <span class="apbt"  @click="pushData()">
          <el-button type="primary" size="small">
            <span class="el-icon-sort"></span> 导入json数据
          </el-button>
        </span>
      </div>
    </div>
    <!-- <el-button :plain="true" @click="open2()">成功</el-button> -->
  </div>
</template>

<script>
export default {
  props:['msbox',"indextp","postData"],
  data() {
    
    return {
      
      dragging: null,
      indent: [], //输入框的边距
      // postData: [
      //   {
      //     cname: "a",
      //     isrequired: "ture",
      //     type: "ture",
      //     mock: "11",
      //     detail: "这是网站1"
      //   },
      //   {
      //     cname: "b",
      //     isrequired: "ture",
      //     type: "ture",
      //     mock: "11",
      //     detail: "这是网站2"
      //   },
      //   {
      //     cname: "c",
      //     isrequired: "ture",
      //     type: "ture",
      //     mock: "11",
      //     detail: "这是网站3"
      //   },
      //   {
      //     cname: "d",
      //     isrequired: "ture",
      //     type: "ture",
      //     mock: "11",
      //     detail: "这是网站4"
      //   },
      //   {
      //     cname: "e",
      //     isrequired: "ture",
      //     type: "ture",
      //     mock: "11",
      //     detail: "这是网站5"
      //   },
      //   {
      //     cname: "f",
      //     isrequired: "ture",
      //     type: "ture",
      //     mock: "11",
      //     detail: "这是网站6"
      //   }
      // ]
    };
  },
  methods: {
    pushData() {
      this.$parent.postType = this.indextp;

      return this.$emit("update:msbox", !this.msbox);
    },
    // draggable 属性规定元素是否可拖动
    // dragstart 事件在用户开始拖动元素或选择的文本时触发
    // dragover 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
    // dragenter - 当被鼠标拖动的对象进入其容器范围内时触发此事件
    // dragend - 用户完成元素拖动后触发-->
    handleDragStart(e, item) {
      this.dragging = item;
    },
    handleDragEnd(e, item) {
      this.dragging = null;
    },
    //首先把div变成可以放置的元素，即重写dragenter/dragover
    // DataTransfer 对象用来保存，通过拖放动作，拖动到浏览器的数据。
    // 如果dropEffect 属性设定为none,则不允许被拖放到目标元素中。
    handleDragOver(e) {
      e.dataTransfer.dropEffect = "move"; // e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
    },
    handleDragEnter(e, item) {
      e.dataTransfer.effectAllowed = "move"; //为需要移动的元素设置dragstart事件
      if (item === this.dragging) {
        return;
      }

      const startEleIndex = this.postData.indexOf(this.dragging);
      const endEleIndex = this.postData.indexOf(item);

      if (this.dragging) {
        var startEle = this.postData[startEleIndex];
        var endEle = this.postData[endEleIndex];
        var startParentId = this.postData[startEleIndex].parentId;
        var startId = this.postData[startEleIndex].id;


        var endParentId = this.postData[endEleIndex].parentId;
        var endId = this.postData[endEleIndex].id;

        this.postData[startEleIndex].parentId = endParentId;
        this.postData[startEleIndex].id = endId;
        this.postData[endEleIndex].parentId = startParentId;
        this.postData[endEleIndex].id = startId;


        this.postData.splice(startEleIndex, 1, endEle);
        this.postData.splice(endEleIndex, 1, startEle);
        // this.indent.splice(endEleIndex,1,startEle)
        // this.dragging=null
        
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
    addTS(index, event) {
      console.log(this.$parent.postType)
       if(this.$parent.postType="data-com"){
        var id=this.postData.length
        var parentId=this.postData[index].id
      }
      if(this.$parent.postType="data-com2"){
        var id=this.postData.length
        var parentId=this.postData[index].id
      }
      this.postData.splice(index + 1, 0, {
        cname: "",
        isrequired: "true",
        type: "true",
        detail: "",
        id: id,
        parentId: parentId,
        mockValue:"22",
        children: [],
      });
      var tt = this.indent[index];
      this.indent.splice(index + 1, 0, 15 + tt);
    },
    addTT() {
      if(this.$parent.postType="data-com"){
        var id=this.postData.length
      }
      if(this.$parent.postType="data-com2"){
        var id=this.postData.length
      }
      this.postData.push({
        cname: "",
        isrequired: "true",
        type: "true",
        detail: "",
        id: id,
        parentId: 0,
        mockValue:"22",
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
      var id = this.postData[index].id

      this.postData.splice(index, 1);
      this.indent.splice(index, 1);
      this.findChild(id)

    },
    findChild(id){
      
      for(var n=0;n<this.postData.length;n++){

         if(this.postData[n].parentId==id){
          this.findChild(this.postData[n].id) //如果找到和删除id相关的之后-继续遍历以找到的这个，直到找完位置

          this.postData.splice(n, 1);  //找完之后再做删除--先做删除索引会变
          this.indent.splice(n, 1);
          n--
        }
      }

    },
    isListData() {
     
      if (this.postData.length == 0  && this.postData.length==undefined) {
        this.$set(this.postData, 0, {
          prop: "",
          isrequired: "true",
          type: "true",
          detail: ""
        });
      }
    },

    indentMarginLeft() {
      this.postData.forEach((item, index) => {
        this.indent[index] = 0;
      });
    }
  },
  created() {
    this.isListData(), //如果列表为空则自动添加一个
      this.indentMarginLeft();
  },
  updated() {
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

.hd-header .cname,
.mock {
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
.hd-com .cell .el-select__caret {
  height: 25px;
  line-height: 25px;
}
.hd-header .addParm {
  margin: 10px 0 10px 0;
}
.hd-header .addParm .apbt {
  width: 20px;
  margin-right: 10px;
}
</style>