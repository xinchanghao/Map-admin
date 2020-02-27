/* eslint-disable */

<template>
  <div class="dashboard-container">
    <div>
      <el-alert
        title="首页登录成功"
        type="success"
        :closable="false"
        description="模拟不同权限不同经纬度的人员单位在地图中的定位显示"
      ></el-alert>
    </div>
  </div>
</template>




<script>
import { mapGetters } from "vuex";

export default {
  name: "dashboard",
  computed: {
    ...mapGetters(["name", "roles"])
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  mounted() {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        alert("您的经纬度位置：" + r.point.lng + "," + r.point.lat);
      } else {
        alert("failed" + this.getStatus());
      }
    });
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>



<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 20px;
    line-height: 46px;
  }
}
</style>


