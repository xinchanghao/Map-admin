<template>
  <div class="login-container">
    <el-form
      class="login-form"
      autocomplete="on"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
        <lang-select class="set-language"></lang-select>
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          name="username"
          type="text"
          v-model="loginForm.username"
          autocomplete="on"
          :placeholder="$t('login.username')"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          name="password"
          :type="passwordType"
          @keyup.enter.native="handleLogin"
          v-model="loginForm.password"
          autocomplete="on"
          :placeholder="$t('login.password')"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-button
        type="primary"
        style="width:100%;margin-bottom:30px;"
        :loading="loading"
        @click.native.prevent="handleLogin"
        >{{ $t('login.logIn') }}</el-button
      >

      <el-button
        type="defaults"
        style="width:100%;margin-bottom:30px;margin-left:0"
        :loading="loading"
        @click.native.prevent="handleAdd"
        >{{ $t('login.resIn') }}</el-button
      >
    </el-form>

    <!-- // from dialog -->
    <el-dialog
      title="用户注册"
      :visible.sync="dialogFormVisible"
      width="40%"
      class="register"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editForm"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="editForm.username"
            placeholder="请输用户名"
          ></el-input>
        </el-form-item>

        <el-form-item
          v-if="dialogStatus == 'create'"
          label="密码"
          prop="password"
        >
          <el-input
            type="password"
            v-model="editForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item label="单位名称" prop="company_name">
          <el-input
            v-model="editForm.company_name"
            placeholder="请输单位名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="单位主管" prop="company_bu">
          <el-input
            v-model="editForm.company_bu"
            placeholder="请输单位主管"
          ></el-input>
        </el-form-item>

        <el-form-item label="单位地址" prop="company_addr">
          <el-input
            v-model="editForm.company_addr"
            placeholder="请输单位地址"
          ></el-input>
        </el-form-item>

        <el-form-item label="单位经纬度" prop="company_position">
          <el-input
            v-model="editForm.company_position"
            placeholder="请输单位经纬度"
          ></el-input>
        </el-form-item>

        <el-form-item label="角色" prop="roleId">
          <el-select
            class="filter-item"
            style="width: 250px"
            v-model="editForm.roleId"
            placeholder="请选择角色"
          >
            <el-option
              v-for="item in editRolesOptions"
              :key="item.roleId"
              :label="item.roleDesc"
              :value="item.roleId"
              :disabled="false"
            >
              <span style="float: left">{{ item.roleDesc }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">
                {{ item.roleCode }}
              </span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="单位状态" prop="company_status">
          <el-select
            class="filter-item"
            v-model="editForm.company_status"
            placeholder="请选择单位状态"
            style="width: 250px"
            clearable
            filterable
          >
            <el-option
              v-for="(item, index) in statusOptions"
              :key="index"
              :label="item | statusFilter"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="附件上传" prop="file">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">文件大小不超过10M</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formCancel('editForm')">取 消</el-button>
        <el-button
          v-if="dialogStatus == 'create'"
          type="primary"
          @click="handleLogin()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate';
import LangSelect from '@/components/LangSelect';
import { fetchRoleList } from '@/api/role';

export default {
  components: { LangSelect },
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error(this.$t('tips.error_login_username')));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error(this.$t('tips.error_login_password')));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: 'superAdmin',
        password: 'test1234'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      dialogFormVisible: false, // 表单是否显示
      dialogStatus: '',
      editForm: {
        username: '',
        password: ''
      },
      editFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        company_bu: [
          { required: true, message: '请输入单位主管', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        company_name: [
          { required: true, message: '请输入单位名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        company_position: [
          { required: true, message: '请输入单位经纬度', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        company_addr: [
          { required: true, message: '请输入地址', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        roleId: [{ required: true, message: '请选择角色', trigger: 'blur' }],
        company_status: [
          { required: true, message: '请选择单位状态', trigger: 'blur' }
        ]
      },
      editRolesOptions: [],
      statusOptions: [0, 1, 2],
      fileList: []
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
    },
    getRoleList() {
      fetchRoleList().then(res => {
        this.editRolesOptions = res.data;
      });
    },
    formCancel(_from) {
      this.dialogFormVisible = false;
    },
    formCreate() {
      this.$router.push({ path: '/user' });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push({ path: '/' });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    formReset() {
      this.editForm = {
        username: '',
        password: '',
        statu: '',
        roleId: ''
      };
    },
    handleAdd() {
      this.formReset();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: '筹备',
        1: '在建',
        2: '停止'
      };
      return statusMap[status];
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-form .el-input__inner {
  border: none !important;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;

    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(25, 255, 255, 0.1);
      background: #fff;
      border-radius: 5px;
      color: #454545;
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
