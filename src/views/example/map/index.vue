<template>
  <div>
    <div id="allmap" :style="{ height: mapHeight + 'px' }"></div>

    <div class="block">
      <span class="blockspan">根据省份筛选单位</span>
      <el-cascader
        v-model="value"
        :options="options"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"
      ></el-cascader>
    </div>
  </div>
</template>

<script>
import BMap from 'BMap';
import { userList, positionMap } from '../../../mock/user';

const points = userList.data.list;

export default {
  name: 'dashboard',
  data() {
    return {
      value: [],
      mapHeight: 500,
      options: positionMap
    };
  },
  mounted() {
    // 百度地图API功能
    const map = new BMap.Map('allmap', { enableMapClick: false });
    map.centerAndZoom(new BMap.Point(119.3, 26.08), 11);
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
      require('../../../assets/red.png'),
      new BMap.Size(64, 64)
    );
    const yellowIcon = new BMap.Icon(
      require('../../../assets/yellow.png'),
      new BMap.Size(64, 64)
    );
    const greenIcon = new BMap.Icon(
      require('../../../assets/green.png'),
      new BMap.Size(64, 64)
    );

    //  创建标注
    for (var i = 0, pointsLen = points.length; i < pointsLen; i++) {
      const position = points[i].company_position.split(',');
      var point = new BMap.Point(position[0], position[1]); // 将标注点转化成地图上的点

      const temp = points[i].company_status === 1 ? greenIcon : redIcon;
      var marker = new BMap.Marker(point, {
        icon: points[i].company_status === 0 ? yellowIcon : temp
      });

      // 将点转化成标注点
      var content = `
      单位主管：${points[i].company_bu}<br>
      单位名称：${points[i].company_name}<br>
      单位经纬度：${points[i].company_position}<br>
      单位地址：${points[i].company_addr}<br>
      单位状态：${points[i].company_status_label}<br>
      单位进度：${points[i].company_progress}<br>
      `;

      // 将标注点添加到地图上
      map.addOverlay(marker);
      addClickHandler(content, marker);
    }

    var opts = {
      width: 250, // 信息窗口宽度
      title: '标注点信息', // 信息窗口标题
      enableMessage: false // 设置不允许信息窗发送短息
    };

    function addClickHandler(content, marker) {
      marker.addEventListener('click', function(e) {
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
  methods: {
    handleChange(value) {
      const map = new BMap.Map('allmap', { enableMapClick: false });
      const poin = value[0].split(',');
      map.centerAndZoom(new BMap.Point(poin[0], poin[1]), 11);
      map.enableScrollWheelZoom();
      map.panTo({ lng: poin[0], lat: poin[1] });

      this.mapHeight =
        (window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight) - 85;

      const redIcon = new BMap.Icon(
        require('../../../assets/red.png'),
        new BMap.Size(64, 64)
      );
      const yellowIcon = new BMap.Icon(
        require('../../../assets/yellow.png'),
        new BMap.Size(64, 64)
      );
      const greenIcon = new BMap.Icon(
        require('../../../assets/green.png'),
        new BMap.Size(64, 64)
      );

      //  创建标注
      for (var i = 0, pointsLen = points.length; i < pointsLen; i++) {
        const position = points[i].company_position.split(',');
        var point = new BMap.Point(position[0], position[1]); // 将标注点转化成地图上的点

        const temp = points[i].company_status === 1 ? greenIcon : redIcon;
        var marker = new BMap.Marker(point, {
          icon: points[i].company_status === 0 ? yellowIcon : temp
        });

        // 将点转化成标注点
        var content = `
      单位主管：${points[i].company_bu}<br>
      单位名称：${points[i].company_name}<br>
      单位经纬度：${points[i].company_position}<br>
      单位地址：${points[i].company_addr}<br>
      单位状态：${points[i].company_status_label}<br>
      单位进度：${points[i].company_progress}<br>
      `;

        // 将标注点添加到地图上
        map.addOverlay(marker);
        addClickHandler(content, marker);
      }

      var opts = {
        width: 250, // 信息窗口宽度
        title: '标注点信息', // 信息窗口标题
        enableMessage: false // 设置不允许信息窗发送短息
      };

      function addClickHandler(content, marker) {
        marker.addEventListener('click', function(e) {
          openInfo(content, e);
        });
      }

      function openInfo(content, e) {
        var p = e.target;
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
        map.openInfoWindow(infoWindow, point); // 开启信息窗口
      }
    }
  },
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

.block {
  position: fixed;
  top: 100px;
  right: 0px;
  background: #fff;
  width: 250px;
  height: 300px;
  text-align: left;
  border-radius: 10px;
  box-shadow: -5px 5px 5px #ccc;
  padding: 20px;
}
.blockspan {
  margin: 10px 0;
  display: block;
}
</style>
