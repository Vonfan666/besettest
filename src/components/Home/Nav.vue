
<!--导航栏 -->
<template>
  <div class="nav-div">
    <div class="nav-ul">
      <div v-for="(item,index) in listCode" :key="index" class="first-li">
        <div
          class="nav-frist"
          @click="navOpen(index,$event);postNav(item.id,index);activeCode(index,$event)"
        >
          <span class="frist-title">{{item.name}}</span>
          <span :class="classCode" title="icon" @click="iconClick(item.id)"></span>
        </div>
        <nav-child :listCode="item.list" v-if="navOpenStatus[index]" class="nav-child-cao"></nav-child>
      </div>
    </div>
  </div>
</template>

<script>
import storage from "../../libs/storage";
export default {
  name: "nav-child",
  props: ["listCode"],
  data() {
    return {
      classCode: "el-icon-arrow-down icon",
      flagstatus: false,
      count: 1,
      navChildStatus: [], //判断下面有是否存在子级list
      navOpenStatus: [] //判断父级是否展开
    };
  },
  methods: {
    judgechild() {
      this.listCode.forEach((item, index) => {
        //  document.querySelector("h4").add("h")
        // item.classList.remove("el-icon-arrow-down")
        if ("list" in item) {
          this.navChildStatus[index] = true;
          this.navOpenStatus[index] = false;
        } else {
          this.navChildStatus[index] = false;
          this.navOpenStatus[index] = false;
        }
      });
    },
    navOpen(index, a) {
      //点击效果
      console.log("点击效果", a);
      if (a.target.className == "nav-frist") {
        var ele = a.srcElement;
      } else if (
        a.target.className == "frist-title" ||
        a.target.title == "icon"
      ) {
        var ele = a.srcElement.parentNode;
      }
      if (this.navChildStatus[index]) {
        this.$set(this.navOpenStatus, index, !this.navOpenStatus[index]);
        if (this.navOpenStatus[index]) {
          //控制箭头方向
          ele
            .querySelector(".icon")
            .classList.replace("el-icon-arrow-down", "el-icon-arrow-up");
        } else {
          ele
            .querySelector(".icon")
            .classList.replace("el-icon-arrow-up", "el-icon-arrow-down");
        }
      }
    },
    postNav(value, index) {
      //传入参数index判断-是否有下级--有下级则不请求
      // if (!this.navChildStatus[index])
      // {
      console.log(value, "zheshivalue");
      switch (value) {
        case "11":
          this.$router.push({
            name: "infaterText",
            query: { projectId: storage.get("projectId") }
          });
          break;
        case "12":
          this.$router.push("/BesetTest/home/infater/projectPop");
          break;
        case "13":
          this.$router.push("/BesetTest/home/infater/globalVariables");
          break;
        case "14":
          this.$router.push("/BesetTest/home/infater/history");
          break;
        case "21":
          this.$router.push("/BesetTest/case");
          break;
        case "22":
          this.$router.push("/BesetTest/runCase");
          break;
        case "23":
          this.$router.push("/BesetTest/runLog");
          break;
        case "24":
          this.$router.push("/BesetTest/manageSql");
          break;
        case "51":
          this.$router.push("/BesetTest/timedTask");
          break;
        case "11":
          this.$router.push("/BesetTest/home/infater/text");
          break;
        case "11":
          this.$router.push("/BesetTest/home/infater/text");
          break;
        case "11":
          this.$router.push("/BesetTest/home/infater/text");
          break;
        case "11":
          this.$router.push("/BesetTest/home/infater/text");
          break;
        default:
          console.log(111);
      }
      // }else{
      //   console.log(value,"111");
      // }

      //请求接
    },
    activeCode(index, self) {
      console.log("test");

      var ele = self.srcElement;
      if (!this.navChildStatus[index]) {
        if (document.querySelector(".activeCode")) {
          document.querySelector(".activeCode").classList.remove("activeCode");
        }

        if (self.target.className != "nav-frist") {
          self.srcElement.parentElement.classList.add("activeCode");
        } else {
          ele.classList.add("activeCode");
        }
      }
    },
    test() {},
    iconClick(id) {
      switch (id) {
        case "11":
          this.test();
          break;
        case "12":
          console.log(id);
          break;
        default:
          console.log(id);
      }
    },
    removeChildClass() {
      var ele = document.querySelectorAll(".nav-child-cao");
      ele.forEach((item, index) => {
        item.querySelectorAll(".icon").forEach((item, index) => {
          item.remove("el-icon-arrow-down");
        });
      });
    }
  },
  created() {
    // console.log(this.listCode);
    this.judgechild();
    // console.log("kaishi ", this.navOpenStatus);
  },
  mounted() {
    document.querySelectorAll("h4").forEach(function(ele) {
      ele.classList.add("h1");
    });
    this.projectId = storage.get("projectId");
    this.removeChildClass()
  },
  watch: {
    projectId(newValue, oldVlue) {
      console.log(newValue, oldVlue, "---");
    }
  }
};
</script>

<style lang="scss" scoped>
li {
  list-style-type: none;
}

.nav-frist {
  padding: 15px;
  color: white;
  cursor: pointer;
}

.nav-child-cao .nav-ul .first-li .nav-frist {
  text-align: left;
  //   margin-right: 10px;
  // padding:0 10px;
}
.nav-child-cao .frist-title {
  margin-left: 80px;
}

.nav-frist:hover,
.nav-child-cao .first-li:hover {
  background: #bbb;
}

.icon {
  color: white;
  float: right;
  margin-right: 10px;
  // margin-left: 25px
  // padding: 0 0 0 25px;
}

.activeCode {
  background-color: grey;
}
// .nav-ul li{
//     border: 1px solid red
// }
// .frist-title{
//    margin-left:-65px;
//    font-size: 16px;
//    color: white;

//    li{
//     list-style-type:none;
//     // margin:40px 0
//     margin-bottom: 10px;
//     margin-right: 30px;

// }
// }

// // .h1{
// //
// // }
// .nav-frist{
//     margin: auto;
//     top:0;
//     bottom: 0;
//     left: 0;
//     right: 0;
// }
// .nav-div{
//     margin-left: 35px
// }
</style>