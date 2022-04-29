<template>
  <div class="main-padding">
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="width: 100%">
          <div class="gutter-box-label" style="width: 80px"><span>分店</span></div>
          <a-select v-model="formSearchInfo.shopId" style="width: 150px">
            <a-select-option :value="item.shopId" v-for="(item) in shopList" :key="item.shopId">
              {{ item.shopName }}
            </a-select-option>
          </a-select>
          <!--<a-input v-model="formSearchInfo.shopId" placeholder="请输入" clearable />-->
        </div>
      </a-col>
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="width: 100%">
          <div class="gutter-box-label" style=""><span>姓名</span></div>
          <a-input v-model="formSearchInfo.trueName" placeholder="请输入" clearable />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="width: 100%">
          <div class="gutter-box-label" style=""><span>账号</span></div>
          <a-input v-model="formSearchInfo.loginName" placeholder="请输入" clearable />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="width: 100%">
          <div class="gutter-box-label" style="width: 80px"><span>状态</span></div>
          <a-select v-model="formSearchInfo.state" style="width:100%" clearable>
            <a-select-option :value="item.value" v-for="(item, index) in statusList" :key="index">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="width: 100%">
          <div class="gutter-box-label" style=""><span>用户角色</span></div>
          <a-input v-model="formSearchInfo.roleName" placeholder="请输入" clearable />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="4">
        <a-button type="primary" @click="searchList" >搜索</a-button>
        <a-button style="margin-left: 10px" @click="resetInput">重置</a-button>
      </a-col>
    </a-row>
    <div class="tableContainer">
      <div class="tableBtn">
        <a-button type="primary" @click="modalShow('add')">添加账号</a-button>
      </div>
      <a-table bordered :columns="columnsUser" :data-source="usersList" :pagination="false">
        <template slot="index" slot-scope="text, record, index">
          <span>{{ pageNumber * pageSize + index + 1 }}</span>
        </template>
        <template slot="action" slot-scope="text, record">
          <a @click="modalShow('edit', record)">编辑</a>
          <a @click="inResetUserPassword(record)" style="margin-left: 6px">重置密码</a>
        </template>
      </a-table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <a-pagination
            size="small"
            :total="total"
            :current="pageNumber + 1"
            @showSizeChange="changePageSize"
            @change="changePage"
            :show-total="(total) => `共${total}条`"
            show-size-changer show-quick-jumper />
        </div>
      </div>
    </div>
    
    <!--新增弹窗-->
    <a-modal
      :title="modalTitle"
      v-model="userModal"
      :maskClosable="false"
      width="60%"
      @cancel="closeModal()"
    >
      <a-form :label-width="0" :form="userInfoForm" class="userInfoForm" :rules="userInfoFormRules">
        <a-row :gutter="16">
          <a-col span="6">
            <a-form-item prop="trueName">
              <div class="gutter-box" style="width: 100%">
                <div class="gutter-box-label"><span style="color: red">*</span><span>姓名</span></div>
                <a-input
                  :disabled="openType !== 'add'"
                  placeholder="请输入"
                  v-decorator="['trueName', userInfoFormRules.trueName]"
                />
              </div>
            </a-form-item>
          </a-col>
          <a-col span="6">
            <a-form-item prop="loginName">
              <div class="gutter-box" style="width: 100%">
                <div class="gutter-box-label" style=""><span style="color: red">*</span><span>账号</span></div>
                <a-input placeholder="请输入" v-decorator="['loginName', userInfoFormRules.loginName]" :disabled="openType !== 'add'" />
              </div>
            </a-form-item>
          </a-col>
          <a-col span="6">
            <a-form-item prop="state">
              <div class="gutter-box" style="width: 100%">
                <div class="gutter-box-label" style=""><span style="color: red">*</span><span>状态</span></div>
                <a-select  v-decorator="['state', userInfoFormRules.state]"  style="width: 100%">
                  <a-select-option :value="1">启用</a-select-option>
                  <a-select-option :value="0">禁用</a-select-option>
                </a-select>
              </div>
            </a-form-item>
          </a-col>
          <a-col span="6">
            <a-form-item prop="phone">
              <div class="gutter-box" style="width: 100%">
                <div class="gutter-box-label" style=""><span style="color: red">*</span><span>手机</span></div>
                <a-input v-decorator="['phone', userInfoFormRules.phone]" placeholder="请输入" />
              </div>
            </a-form-item>
          </a-col>
          <a-col span="6" v-if="modalTitle === '新增'">
            <a-form-item prop="loginPw">
              <div class="gutter-box" style="width: 100%">
                <div class="gutter-box-label" style=""><span style="color: red">*</span><span>登录密码</span></div>
                <a-input v-decorator="['loginPw', userInfoFormRules.loginPw]" placeholder="请输入" type="password" />
              </div>
            </a-form-item>
          </a-col>
          <a-col span="6" v-if="modalTitle === '新增'">
            <a-form-item prop="loginPw2">
              <div class="gutter-box" style="width: 100%">
                <div class="gutter-box-label" style=""><span style="color: red">*</span><span>确认密码</span></div>
                <a-input v-decorator="['loginPw2', userInfoFormRules.loginPw2]" placeholder="请输入" type="password" />
              </div>
            </a-form-item>
          </a-col>
          <a-col span="6" v-if="modalTitle !== '新增'">
            <a-form-item prop="workno">
              <div class="gutter-box" style="width: 100%">
                <div class="gutter-box-label" style=""><span style="color: red">*</span><span>编码</span></div>
                <a-input v-model="accountInfo.userInfo.workno" placeholder="请输入" :disabled="openType !== 'add'" />
              </div>
            </a-form-item>
          </a-col>
          <a-col span="6">
            <a-form-item prop="email">
              <div class="gutter-box" style="width: 100%">
                <div class="gutter-box-label" style=""><span>邮箱</span></div>
                <a-input v-model="accountInfo.userInfo.email" placeholder="请输入" />
              </div>
            </a-form-item>
          </a-col>
          <a-col span="6">
            <a-form-item prop="qq">
              <div class="gutter-box" style="width: 100%">
                <div class="gutter-box-label" style=""><span>QQ</span></div>
                <a-input v-decorator="['qq', userInfoFormRules.qq]" placeholder="请输入" />
              </div>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col span="6">
            <a-form-item prop="weixin">
              <div class="gutter-box" style="width: 100%">
                <div class="gutter-box-label" style=""><span>微信</span></div>
                <a-input v-model="accountInfo.userInfo.weixin" placeholder="请输入" />
              </div>
            </a-form-item>
          </a-col>
          <a-col span="6">
            <a-form-item prop="isService">
              <div class="gutter-box" style="width: 100%">
                <div class="gutter-box-label" style=""><span>客服</span></div>
                <a-select  v-model="accountInfo.userInfo.isService"  style="width: 100%" >
                  <a-select-option :value="1">是</a-select-option>
                  <a-select-option :value="0">否</a-select-option>
                </a-select>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
        <a-tabs type="card">
          <a-tab-pane key="关联分店" class="infoTabs" tab="关联分店">
            <div>
              <a-radio-group v-model="accountInfo.userInfo.shopId" name="shop"  @change="onChange">
                <a-radio :style="radioStyle" :value="shop.shopId" v-for="shop in shopList" :key="shop.shopId">
                  {{ shop.shopName }}
                </a-radio>
              </a-radio-group>
            </div>
          </a-tab-pane>
          <a-tab-pane key="关联角色" class="infoTabs" tab="关联角色">
            <div style="min-height: 300px" v-if="treeLoading">
              <a-tree
                :tree-data="roleList"
                checkable
                :default-checked-keys="defaultSelectedKeys"
                @check="roleListCheckChange"
                multiple>
              </a-tree>
            </div>
            <p style="color: red">提示：勾选店长角色，若原关联分店已有店长，将被替换</p>
          </a-tab-pane>
        </a-tabs>
        
      </a-form>
      <div slot="footer">
        <a-button class="m-l-10" @click="closeModal()">&nbsp;&nbsp;关闭&nbsp;&nbsp;</a-button>
        <a-button class="m-l-10" @click="handleSubmit()" type="primary" :loading="loadingSubmit">&nbsp;&nbsp;确定&nbsp;&nbsp;</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { queryRoleByUser } from '../../api/roles';
import { resetUserPassword, queryUserById, editShopStaff, registerShopStaff } from '../../api/user';

export default {
  name: 'users',
  components: {},
  data() {
    // RickPS：以下两个const是前人写法
    const REG = /^[^\u4e00-\u9fa5]{6,14}$/;
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'));
      } else if (!REG.test(value)) {
        callback(new Error('请输入6-14位英文、数字和特殊符号'));
      } else {
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'));
      } else if (!REG.test(value)) {
        callback(new Error('请输入6-14位英文、数字和特殊符号'));
      } else {
        callback();
      }
    };
    const validateQQ = (rule, value, callback) => {
      console.log(value);
      if (value) {
        if (!/^[0-9]*$/.test(value)) {
          callback(new Error('qq号必须都是数字'));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      formSearchInfo: {
        shopId: null,
        roleName: '',
        state: null,
        loginName: '',
        trueName: ''
      },
      loadingSubmit: false,
      isLoading: true,
      total: 0,
      pageNumber: 0,
      pageSize: 10,
      statusList: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ],
      columnsUser: [
        { title: '序号', align: 'center', key: 'index', width: 80, scopedSlots: { customRender: 'index' } },
        { title: '账号', dataIndex: 'loginName', key: 'loginName', align: 'center', width: 100 },
        { title: '姓名', dataIndex: 'trueName', key: 'trueName', align: 'center', minWidth: 100 },
        { title: '编码', dataIndex: 'workno', key: 'workno', align: 'center', minWidth: 100 },
        { title: '所属角色', dataIndex: 'roleNames', key: 'remark', align: 'center', minWidth: 100 },
        { title: '手机', dataIndex: 'phone', key: 'phone', align: 'center', minWidth: 100 },
        { title: '注册时间', dataIndex: 'createTime', key: 'createTime', align: 'center', minWidth: 150 },
        { title: '更新时间', dataIndex: 'lastTime', key: 'lastTime', align: 'center', minWidth: 150 },
        { title: '状态', dataIndex: 'state', key: 'state', align: 'center', minWidth: 100 },
        { title: '操作', key: 'action', align: 'center', minWidth: 180, scopedSlots: { customRender: 'action' } },
      ],
      usersList: [],
      accountInfo: {
        userInfo: {
          email: '',
          weixin: '',
          isService: 0
        }
      },
      roleIds: [],
      defaultSelectedKeys: [],
      shopList: [],
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      },
      roleList: [],
      userInfoForm: this.$form.createForm(this, { name: 'userInfo' }),
      userInfoFormRules: {
        trueName: {
          rules: [
            {
              type: 'string',
              required: true,
              message: '请输入账号',
            },
          ],
        },
        loginName: {
          rules: [
            {
              type: 'string',
              required: true,
              message: '请输入姓名',
            },
          ],
        },
        state: {
          rules: [
            {
              type: 'number',
              required: true,
              message: '请选择状态',
            },
          ],
        },
        phone: {
          rules: [
            {
              type: 'string',
              required: true,
              message: '请输入手机',
            },
          ],
        },
        loginPw: {
          rules: [{ type: 'string', required: true, validator: validatePass }],
        },
        loginPw2: {
          rules: [{ type: 'string', required: true, validator: validatePassCheck }],
        },
        qq: {
          rules: [{ type: 'string', validator: validateQQ }],
        },
      },
      userModal: false,
      openType: '',
      modalTitle: '',
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 8 },
      },
      formTailLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 8, offset: 4 },
      },
      treeLoading: false
    };
  },

  created() {
    this.getShopList();
    this.queryRoleByUser();
  },

  mounted() {},
  methods: {
    ...mapActions(['getQueryUser', 'shopListAction']),
    onChange(e) {
      // this.accountInfo.userInfo.shopId = e.target.value;
      console.log('radio checked', e.target.value);
    },
    changePage(page, pageSize) {
      console.log(page, pageSize);
      this.pageNumber = page - 1;
      this.getUsersList();
    },
    changePageSize(current, size) {
      console.log(current, size);
      this.pageNumber = 0;
      this.pageSize = size;
      this.getUsersList();
    },
    // 搜索
    searchList() {
      this.pageNumber = 0;
      this.getUsersList();
    },
    // 重置
    resetInput() {
      this.formSearchInfo = {
        shopId: this.shopList[0].shopId,
        roleName: '',
        state: null,
        loginName: '',
        trueName: ''
      };
    },
    getShopList() {
      this.shopListAction({ pageNumber: 0, pageSize: 888888 }).then(res => {
        console.log(res);
        const { data } = res;
        if (data.length) {
          data.forEach(shop => {
            shop.key = shop.shopId;
            shop.title = shop.shopName;
            shop.value = shop.shopId;
          });
        }
        this.shopList = data;
        this.formSearchInfo.shopId = this.shopList[0].shopId;
        this.getUsersList();
      });
    },
    queryRoleByUser() {
      queryRoleByUser({ staffId: this.$store.state.user.userId }).then(res => {
        const { data } = res;
        if (data.length) {
          data.forEach(user => {
            user.key = user.id;
            user.title = user.name;
            user.value = user.id;
          });
        }
        this.roleList = data;
      });
    },
    getUsersList() {
      this.isLoading = true;
      const { pageNumber, pageSize } = this;
      const params = {
        ...this.formSearchInfo,
        staffId: this.$store.state.user.userId,
        pageNumber,
        pageSize
      };
      this.getQueryUser(params).then(res => {
        console.log(res, 'reree');
        if (res.code === 200) {
          this.usersList = res.data || [];
          this.total = res.total;
          this.pageNumber = res.pageInfo.pageNumber;
          this.isLoading = false;
        }
      }).catch(() => {
        this.isLoading = false;
      });
    },
    closeModal() {
      this.userInfoForm.resetFields();
      this.roleIds = [];
      this.defaultSelectedKeys = [];
      this.accountInfo = {
        userInfo: {
          email: '',
          weixin: '',
          isService: 0
        }
      };
      this.treeLoading = false;
      this.userModal = false;
    },
   
    // 添加/编辑账户
    modalShow(type, data) {
      this.openType = type;
      this.treeLoading = false;
      if (type !== 'add') {
        this.modalTitle = '编辑';
        this.queryUserById(data.staffId);
      } else {
        this.modalTitle = '新增';
        this.treeLoading = true;
      }
      this.userModal = true;
    },
    // 用户详情
    queryUserById(staffId) {
      queryUserById(staffId).then(res => {
        if (res.code === 200) {
          this.accountInfo = res.data;
          const { trueName, loginName, phone, state, qq } = this.accountInfo.userInfo;
          this.userInfoForm.setFieldsValue({ trueName, loginName, phone, state, qq });
          this.$set(this.accountInfo.userInfo, 'shopId', this.accountInfo.shops[0].shopId || null);
          // this.accountInfo.userInfo.shopId = this.accountInfo.shops[0].shopId || null;
          this.accountInfo.userInfo.staffId = staffId;
          this.defaultSelectedKeys = [];
          this.roleIds = [];
          const { roles } = this.accountInfo;
          if (roles.length) {
            roles.forEach(item => {
              this.defaultSelectedKeys.push(item.id);
            });
            this.roleIds = this.defaultSelectedKeys;
          }
          this.treeLoading = true;
        }
      });
    },
    roleListCheckChange(val) {
      this.roleIds = [];
      this.roleIds = val;
    },
    handleSubmit() {
      this.userInfoForm.validateFieldsAndScroll((err, values) => {
        console.log(err, values);
        const { loginName, trueName, loginPw, loginPw2, qq, state, phone } = values;
        const { email, isService, weixin, shopId, workno, staffId } = this.accountInfo.userInfo;
        const params = {
          shopId,
          loginName,
          trueName,
          state,
          phone,
          qq,
          email,
          weixin,
          isService,
          roleIds: this.roleIds
        };
        if (loginPw === loginPw2) {
          if (!err) {
            this.loadingSubmit = true;
            if (this.openType === 'add') {
              // 添加
              params.loginPw = loginPw;
              params.loginPw2 = loginPw2;
              registerShopStaff(params).then(res => {
                if (res.code === 200) {
                  this.$message.success('创建成功');
                  this.closeModal();
                  this.getUsersList();
                }
                this.loadingSubmit = false;
              }).catch(() => {
                this.loadingSubmit = false;
              });
            } else {
              // 编辑
              params.workno = workno;
              params.staffId = staffId;
              editShopStaff(params).then(res => {
                if (res.code === 200) {
                  this.$message.success('编辑成功');
                  this.closeModal();
                  this.getUsersList();
                }
                this.loadingSubmit = false;
              }).catch(() => {
                this.loadingSubmit = false;
              });
            }
          }
        } else {
          this.$message.error('两次输入密码不一致，请重新输入');
        }
      });
    },
    inResetUserPassword(record) {
      this.$confirm({
        title: '状态更改',
        content: '确定重置密码吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          resetUserPassword({ staffId: record.staffId }).then(res => {
            if (res.code === 200) {
              this.$message.success('重置成功');
            }
          }).catch(() => {
            this.$message.error('重置失败');
          });
        },
      });
    }
  },
};
</script>
<style lang="less">
  .userInfoForm{
    .gutter-box {
      display: flex;
      .gutter-box-label{
        width: 110px!important;
        text-align: center;
        border: 1px solid #d9d9d9;
        height: 32px;
        line-height: 32px;
        border-right: 0;
      }
    }
  }
</style>
