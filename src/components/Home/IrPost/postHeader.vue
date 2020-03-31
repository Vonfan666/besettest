<template>
  <div class="hd-header">
    <!-- // draggable 属性规定元素是否可拖动
// dragstart 事件在用户开始拖动元素或选择的文本时触发
// dragover 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
// dragenter - 当被鼠标拖动的对象进入其容器范围内时触发此事件
    // dragend - 用户完成元素拖动后触发-->
    <el-table :data="tableData" style="wight:100%" border>
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
            v-model="tableData[scope.$index].cname"
            :style="{ 'text-indent':indent[scope.$index]+'px'}"
          />
        </template>
      </el-table-column>

      <el-table-column label="是否必填" draggable="true">
        <template slot-scope="scope">
          <el-select v-model="tableData[scope.$index].isrequired">
            <el-option label="true" value="true"></el-option>
            <el-option label="false" value="false"></el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="类型">
        <template slot-scope="scope">
          <el-select v-model="tableData[scope.$index].type">
            <el-option label="true" value="true"></el-option>
            <el-option label="false" value="false"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <!-- <el-table-column label="mock数据">
        <template slot-scope="scope">
          <input
            type="text"
            class="cname"
            v-model="tableData[scope.$index].detail"
            @input="aa(scope.$index,scope.row.name)"
          />
        </template>
      </el-table-column> -->

      <el-table-column label="描述">
        <template slot-scope="scope">
          <input
            type="text"
            class="mock"
            v-model="tableData[scope.$index].mock"
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
          <el-button type="primary" size="small" @click="pushData()">
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
  data() {
    return {
      prop: ["msbox"],
      dragging: null,
      indent: [], //输入框的边距
      tableData: [
        { cname: "a", isrequired: "ture", type: "ture", detail: "这是网站1" },
        { cname: "b", isrequired: "ture", type: "ture", detail: "这是网站2" },
        { cname: "c", isrequired: "ture", type: "ture", detail: "这是网站3" },
        { cname: "d", isrequired: "ture", type: "ture", detail: "这是网站4" },
        { cname: "e", isrequired: "ture", type: "ture", detail: "这是网站5" },
        { cname: "f", isrequired: "ture", type: "ture", detail: "这是网站6" }
      ],
      postHeader: [
        { cname: "a1", isrequired: "ture", type: "ture", detail: "这是网站1"},
        { cname: "b1", isrequired: "ture", type: "ture", detail: "这是网站2" },
        { cname: "c1", isrequired: "ture", type: "ture", detail: "这是网站3" },
        { cname: "d1", isrequired: "ture", type: "ture", detail: "这是网站4"},
        { cname: "e1", isrequired: "ture", type: "ture", detail: "这是网站5" },
        { cname: "f1", isrequired: "ture", type: "ture", detail: "这是网站6"}
      ],
      postData: [
        { cname: "a2", isrequired: "ture", type: "ture", detail: "这是网站1" },
        { cname: "b2", isrequired: "ture", type: "ture" , detail: "这是网站2"},
        { cname: "c2", isrequired: "ture", type: "ture", detail: "这是网站3" },
        { cname: "d2", isrequired: "ture", type: "ture", detail: "这是网站4" },
        { cname: "e2", isrequired: "ture", type: "ture", detail: "这是网站5" },
        { cname: "f2", isrequired: "ture", type: "ture", detail: "这是网站6" }
      ]
    };
  },
  methods: {
    pushData() {
      console.log(this.msbox);
      return this.$emit("update:msbox", (this.msbox = !this.msbox));
    },
    // draggable 属性规定元素是否可拖动
    // dragstart 事件在用户开始拖动元素或选择的文本时触发
    // dragover 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
    // dragenter - 当被鼠标拖动的对象进入其容器范围内时触发此事件
    // dragend - 用户完成元素拖动后触发-->
    handleDragStart(e, item) {
      this.dragging = item; // 元素
      console.log("ceshi1 ", item);
    },
    handleDragEnd(e, item) {
      this.dragging = null;
      console.log("ceshi2 ");
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
      console.log(e, item);
      console.log(this.dragging, "dragging");
      const startEleIndex = this.tableData.indexOf(this.dragging); // 开始的元素位置索引

      const endEleIndex = this.tableData.indexOf(item); // 现在元素位置
      console.log(startEleIndex, endEleIndex, "元素位置");

      if (this.dragging) {
        var startEle = this.tableData[startEleIndex];
        var endEle = this.tableData[endEleIndex];
        console.log(startEle, "初始拖拽值");
        console.log(endEle, "交换拖拽值");
        console.log(this.tableData, "this.table");
        this.tableData.splice(startEleIndex, 1, endEle); //删除初始位置的元素--并向现在所属位置添加初始位置的元素
        // this.indent.splice(startEleIndex,1,this.indent[startEleIndex])

        this.tableData.splice(endEleIndex, 1, startEle); // 删除光标现在所在位置的值---并添加上次光标所在位置的值
        // this.indent.splice(endEleIndex,1,this.indent[endEleIndex])
        // this.dragging = null;
      }

      //   const newItems = [...this.items];
      //   console.log(newItems);
      //   const src = newItems.indexOf(this.dragging);
      //   const dst = newItems.indexOf(item);
      //   // 替换
      //   newItems.splice(dst, 0, ...newItems.splice(src, 1));
      //   // 让item的颜色等于新交换的颜色
      //   this.items = newItems;
    },
    aa() {
      // console.log("按下");
    },
    bb() {
      // console.log("songkai");
    },
    addTS(index, event) {
      console.log(index);
      this.tableData.splice(index + 1, 0, {
        prop: "",
        isrequired: null,
        type: "",
        detail: ""
      });
      var tt = this.indent[index];
      this.indent.splice(index + 1, 0, 15 + tt);
    },
    addTT() {
      this.tableData.push({
        prop: "",
        isrequired: null,
        type: "",
        detail: ""
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
      console.log(index);
      this.tableData.splice(index, 1);
      this.indent.splice(index, 1);
    },
    isListData() {
      if (this.tableData.length == 0) {
        this.$set(this.tableData, 0, {
          prop: "",
          isrequired: "true",
          type: "true",
          detail: ""
        });
      }
    },

    indentMarginLeft() {
      this.tableData.forEach((item, index) => {
        console.log(index, item);
        this.indent[index] = 0;
      });
    }
  },
  created() {
    this.isListData(), //如果列表为空则自动添加一个
      this.indentMarginLeft();
    console.log(this.indent);
  },
  updated() {
    console.log(this.indent);
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