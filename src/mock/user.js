export const userList = {
  msg: "success",
  code: 0,
  data: {
    total: 4,
    pageNo: 0,
    pageNum: 20,
    list: [
      {
        userId: 4,
        username: "张三",
        password:
          "$2a$10$10ntdT66NtRvsw1A0b3veu1g/JE0XGwlVHhS3i2FztgHNmOa/j/oi",
        openId: null,
        mobile: null,
        picUrl:
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        statu: 0,
        createTime: 1520577723000,
        updateTime: 1520577723000,
        company_bu: "商业化研发小组",
        company_name: "百度",
        company_position: "116.45, 39.92",
        company_addr: "北京市中关村大街",
        company_status: 1, // 0：筹备，1：在建 2：停止
        company_status_label: "在建",
        company_progress: "45%",
        roleList: [
          {
            roleId: 2,
            roleName: "测试Test",
            roleCode: "ROLE_TEST",
            roleDesc: "测试",
            createTime: 1520524560000,
            updateTime: 1520524560000,
            statu: 0
          }
        ]
      },
      {
        userId: 3,
        username: "李四",
        password:
          "$2a$10$1QLEolaGWQmXGf7woa8G1.UYT17YV3TWPG/WK9Xlc8xP70prErpsC",
        openId: null,
        mobile: null,
        picUrl:
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        statu: 0,
        createTime: 1520417559000,
        updateTime: 1520430320000,
        company_bu: "单位主管11",
        company_name: "交通研究规划设计院",
        company_position: "116.41, 39.95",
        company_addr: "北京市xxxxxx",
        company_status: 0, // 0：筹备，1：在建 2：停止
        company_status_label: "筹备",
        company_progress: "65%",
        roleList: [
          {
            roleId: 1,
            roleName: "超级管理员",
            roleCode: "ROLE_ADMIN",
            roleDesc: "超级管理员",
            createTime: 1520524560000,
            updateTime: 1520524560000,
            statu: 0
          }
        ]
      },
      {
        userId: 2,
        username: "马云云",
        password:
          "$2a$10$bvIjvNMsFP0d.wkF2yb9puXn00.q086DInosQsCjXIA9zDINbvIBq",
        openId: null,
        mobile: null,
        picUrl:
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        statu: 0,
        createTime: 1519727098000,
        updateTime: 1520430360000,
        company_bu: "单位主管222222",
        company_name: "阿里巴巴客服中心",
        company_position: "116.42, 39.92",
        company_addr: "北京市xxxxxx",
        company_status: 0, // 0：筹备，1：在建 2：停止
        company_status_label: "筹备",
        company_progress: "89%",
        roleList: [
          {
            roleId: 2,
            roleName: "测试Test",
            roleCode: "ROLE_TEST",
            roleDesc: "测试",
            createTime: 1520524560000,
            updateTime: 1520524560000,
            statu: 0
          }
        ]
      },
      {
        userId: 1,
        username: "赵五",
        password:
          "$2a$10$yfpKd9hRpeloL3MTZH4e9ugrsS/rQp0KoVGpXWIBOR4UniBJFj9Sy",
        openId: null,
        mobile: "",
        picUrl:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        statu: 0,
        createTime: 1509263113000,
        updateTime: 1520477219000,
        company_bu: "单位主管888888",
        company_name: "字节跳动科技有限公司",
        company_position: "116.55, 39.93",
        company_addr: "北京市xxxxxx",
        company_status: 2, // 0：筹备，1：在建 2：停止
        company_status_label: "停止",
        company_progress: "65%",
        roleList: [
          {
            roleId: 1,
            roleName: "超级管理员",
            roleCode: "ROLE_ADMIN",
            roleDesc: "超级管理员",
            createTime: 1520524560000,
            updateTime: 1520524560000,
            statu: 0
          }
        ]
      }
    ]
  }
};

export default {
  fetchUserList: config => {
    return userList;
  },
  delByUserId: config => {
    return { msg: "success", code: 0, data: true };
  },
  delByUserId2: config => {
    return { msg: "success", code: 0, data: false };
  },
  addUser: config => {
    return { msg: "success", code: 0, data: true };
  },
  fetchUserByUserId: config => {
    return {
      userId: 1,
      username: "赵五",
      password: "$2a$10$yfpKd9hRpeloL3MTZH4e9ugrsS/rQp0KoVGpXWIBOR4UniBJFj9Sy",
      openId: null,
      mobile: "",
      picUrl:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      statu: 0,
      createTime: 1509263113000,
      updateTime: 1520477219000,
      company_bu: "单位主管888888",
      company_name: "字节跳动科技有限公司",
      company_position: "116.006605, 39.821585",
      company_addr: "北京市xxxxxx",
      company_status: 2, // 0：筹备，1：在建 2：停止
      company_status_label: "停止",
      company_progress: "65%",
      roleList: [
        {
          roleId: 1,
          roleName: "超级管理员",
          roleCode: "ROLE_ADMIN",
          roleDesc: "超级管理员",
          createTime: 1520524560000,
          updateTime: 1520524560000,
          statu: 0
        }
      ]
    };
  },
  updateUser: config => {
    return { msg: "success", code: 0, data: true };
  }
};
