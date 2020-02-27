<template>
  <div id="allmap" :style="{height:mapHeight+'px'}"></div>
</template>

<script>
import BMap from "BMap";
import { userList } from "../../../mock/user";

const points = userList.data.list;

export default {
  name: "dashboard",
  data() {
    return {
      mapHeight: 500
    };
  },
  mounted() {
    // 百度地图API功能
    const map = new BMap.Map("allmap", { enableMapClick: false });
    map.centerAndZoom(new BMap.Point(116.417854, 39.921988), 12);
    map.enableScrollWheelZoom();

    var geolocation = new BMap.Geolocation();
    geolocation.enableSDKLocation();
    geolocation.getCurrentPosition(
      function(r) {
        if (this.getStatus() === 0) {
          map.panTo(r.point);
        }
      },
      { enableHighAccuracy: true }
    );

    this.mapHeight =
      (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight) - 85;

    const redIcon = new BMap.Icon(
      require("../../../assets/red.png"),
      new BMap.Size(64, 64)
    );
    const yellowIcon = new BMap.Icon(
      require("../../../assets/yellow.png"),
      new BMap.Size(64, 64)
    );
    const greenIcon = new BMap.Icon(
      require("../../../assets/green.png"),
      new BMap.Size(64, 64)
    );

    //  创建标注
    for (var i = 0, pointsLen = points.length; i < pointsLen; i++) {
      const position = points[i].company_position.split(",");
      var point = new BMap.Point(position[0], position[1]); //将标注点转化成地图上的点
      var marker = new BMap.Marker(point, {
        icon:
          points[i].company_status == 0
            ? yellowIcon
            : points[i].company_status == 1
            ? greenIcon
            : redIcon
      });
      //将点转化成标注点
      var content = `
      单位主管：${points[i].company_bu}<br>
      单位名称：${points[i].company_name}<br>
      单位经纬度：${points[i].company_position}<br>
      单位地址：${points[i].company_addr}<br>
      单位状态：${points[i].company_status_label}<br>
      单位进度：${points[i].company_progress}<br>
      `;
      map.addOverlay(marker); //将标注点添加到地图上
      addClickHandler(content, marker);
    }

    var opts = {
      width: 250, // 信息窗口宽度
      title: "地图定位Demo", // 信息窗口标题
      enableMessage: false // 设置不允许信息窗发送短息
    };

    function addClickHandler(content, marker) {
      marker.addEventListener("click", function(e) {
        openInfo(content, e);
      });
    }
    function openInfo(content, e) {
      var p = e.target;
      var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
      var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
      map.openInfoWindow(infoWindow, point); // 开启信息窗口
    }
  },
  methods: {},
  computed: {}
};
</script>

<style rel="stylesheet/scss" lang="scss">
#allmap {
  width: 100%;
  height: 100%;

  p {
    margin-left: 5px;
    font-size: 14px;
  }
}
.anchorBL {
  display: none;
}
</style>
