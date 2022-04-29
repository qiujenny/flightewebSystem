<template>
  <div class="main-padding">
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="width: 100%">
          <div class="gutter-box-label" style=""><span>角色名称</span></div>
          <a-input v-model="formSearchInfo.name" placeholder="请输入" clearable />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="width: 100%">
          <div class="gutter-box-label" style="width: 80px"><span>状态</span></div>
          <a-select v-model="formSearchInfo.state" style="width:100%">
            <a-select-option :value="item.value" v-for="(item, index) in infoStatusList" :key="index">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="4">
        <a-button type="primary" @click="searchList" >搜索</a-button>
        <a-button style="margin-left: 10px" @click="resetInput">重置</a-button>
      </a-col>
    </a-row>
    <div class="tableContainer">
      <a-table bordered :columns="columnsRole" :data-source="rolesList" :pagination="false">
        <template slot="index" slot-scope="text, record, index">
          <span>{{ pageNumber * pageSize + index + 1 }}</span>
        </template>
        <template slot="action" slot-scope="text, record">
          <a @click="checkDetail(record)">{{ record.name }}</a>
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
    
    <!--&lt;!&ndash;角色详情&ndash;&gt;-->
    <a-modal
      v-model="visibleRole"
      @on-cancel="visibleRole = false"
      :maskClosable="false"
      title="角色详情"
      width="50%"
    >
      <div class="accoutInfo">
        <a-tabs type="card" v-model="tabNameActive">
          <a-tab-pane key="角色" class="infoTabs" tab="角色">
            <a-form :model="roleInfo" :label-width="80" ref="roleInfoForm" :rules="roleInfoRules">
              <a-row :gutter="16">
                <a-col span="6">
                  <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol" prop="name" label="角色">
                    <label>{{ roleInfo.name }}</label>
                  </a-form-item>
                </a-col>
                <a-col span="6">
                  <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol" prop="status" label="状态">
                    <label>{{ roleInfo.status }}</label>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row class="m-t-10">
                <a-col span="24">
                  <a-form-item prop="remark" label="备注">
                    <label>{{ roleInfo.remark }}</label>
                    <!--<a-input v-model="roleInfo.remark" type="textarea"-->
                             <!--:autosize="{minRows: 2,maxRows: 5}" disabled></a-input>-->
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="可选权限" class="authorList" tab="可选权限">
            <a-tabs v-model="tabActive">
              <a-tab-pane key="后台权限" tab="后台权限" v-if="treeLoading">
                <a-tree
                  checkable
                  ref="pcPrivlige"
                  disabled
                  :default-checked-keys="defaultSelectedKeys"
                  :tree-data="allPrivligeList"
                />
              </a-tab-pane>
              <a-tab-pane key="h5端后台权限" tab="h5端后台权限" disabled>
              </a-tab-pane>
            </a-tabs>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div slot="footer">
        <a-button class="m-l-10" @click="visibleRole = false">&nbsp;&nbsp;关闭&nbsp;&nbsp;</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { queryRoleById, queryNavTreeByRole } from '../../api/roles';
import { changePrivligeList, toArray } from '../../libs/tools';

export default {
  name: 'roleInfo',
  components: {

  },
  computed: {
    allPrivligeList() {
      return this.$store.state.role.allPrivligeList;
    },
  },
  data() {
    return {
      treeLoading: false,
      formSearchInfo: {
        name: '',
        state: null
      },
      loadingSubmit: false,
      isLoading: true,
      roleStatus: -1,
      total: 0,
      pageNumber: 0,
      pageSize: 10,
      infoStatusList: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ],
      columnsRole: [
        { title: '序号', align: 'center', key: 'index', width: 80, scopedSlots: { customRender: 'index' } },
        { title: '角色', key: 'name', align: 'center', width: 200, scopedSlots: { customRender: 'action' } },
        { title: '状态', dataIndex: 'status', key: 'status', align: 'center', minWidth: 150 },
        { title: '备注', dataIndex: 'remark', key: 'remark', align: 'center', minWidth: 150 }
      ],
      rolesList: [{ role: 234 }],
      visibleRole: false,
      modelType: 1,
      tabNameActive: '角色',
      tabActive: '后台权限',
      roleInfo: {
        name: '',
        status: 1,
        remark: ''
      },
      privligeList: [],
      defaultSelectedKeys: [],
      roleInfoRules: {
        name: [
          { required: true, message: '请输入角色名', trigger: 'blur' }
        ],
      },
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 8 },
      },
      formTailLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 8, offset: 4 },
      }
    };
  },
  created() {
  
  },
  methods: {
    ...mapActions(['getRoleList', 'getFindPrivligeList']),
    changePage(page, pageSize) {
      console.log(page, pageSize);
      this.pageNumber = page - 1;
      this.getRolesList();
    },
    changePageSize(current, size) {
      console.log(current, size);
      this.pageNumber = 0;
      this.pageSize = size;
      this.getRolesList();
    },
    // 搜索
    searchList() {
      this.pageNumber = 0;
      this.getRolesList();
    },
    // 重置
    resetInput() {
      this.formSearchInfo = this.$options.data().formSearchInfo;
    },
    getRolesList() {
      this.isLoading = true;
      const { pageNumber, pageSize } = this;
      const params = {
        ...this.formSearchInfo,
        pageNumber,
        pageSize
      };
      this.getRoleList(params).then(res => {
        if (res.code === 200) {
          this.isLoading = false;
          this.rolesList = res.data;
          this.total = res.total;
          this.pageNumber = res.pageInfo.pageNumber;
        }
      }).catch(() => {
        this.isLoading = false;
      });
    },
    getPriListByRole() {
      queryNavTreeByRole().then((res) => {
        if (res.code === 200) {
          const obj = changePrivligeList(res.data);
          this.$store.commit('setPrivligeListByRole', obj);
        }
      });
    },
    checkDetail(record) {
      this.visibleRole = true;
      this.treeLoading = false;
      queryRoleById(record.id).then(async res => {
        const { data } = res;
        this.roleInfo = data;
        const privligeListArr = toArray(data.privligeList);
        this.defaultSelectedKeys = [];
        if (privligeListArr.length) {
          privligeListArr.forEach(item => {
            this.defaultSelectedKeys.push(item.id);
          });
        }
        this.treeLoading = true;
      });
    }
  },
  mounted() {
    // 获取权限数据
    this.getRolesList();
    this.getPriListByRole();
  }
};
</script>

<style scoped>
  .authorList{
    height: 400px;
    overflow: scroll;
  }

</style>
