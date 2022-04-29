<template>
  <div class="main-padding">
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="width: 100%">
          <div class="gutter-box-label" style=""><span>昵称</span></div>
          <a-input v-model="formSearchInfo.nickname" placeholder="请输入" clearable />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="width: 100%">
          <div class="gutter-box-label" style=""><span>姓名</span></div>
          <a-input v-model="formSearchInfo.membName" placeholder="请输入" clearable />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="width: 100%">
          <div class="gutter-box-label" style=""><span>手机</span></div>
          <a-input v-model="formSearchInfo.phone" placeholder="请输入" clearable />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="gutter-box" style="width: 100%">
          <div class="gutter-box-label" style=""><span>注册时间</span></div>
          <a-range-picker
            format="YYYY-MM-DD hh:mm:ss"
            :locale="locale"
            v-model="regTime"
            @change="onChangeDate"
          />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <a-button type="primary" @click="searchList" >搜索</a-button>
        <a-button style="margin-left: 10px" @click="resetInput">重置</a-button>
      </a-col>
    </a-row>
    <div class="tableContainer">
      <!--<div class="tableBtn">-->
        <!--<Button type="primary" style="margin-right: 10px" v-if="hasAuthorized('eqArchives', '新增')"-->
                <!--@click="goEqArchives({ equipment_id: null, operateType: 'add' })">新增</Button>-->
        <!--&lt;!&ndash;<Button type="primary" style="margin-right: 10px" v-if="hasAuthorized('eqArchives', '导入')" @click="inExcel">导入</Button>&ndash;&gt;-->
        <!--<Button @click="exportExcelModal"  v-if="hasAuthorized('eqArchives', '导出')">导出</Button>-->
        <!--<Button type="primary" style="margin-right: 10px" v-if="hasAuthorized('eqArchives', '同步卡号')"  @click="devicesModalVisible = true">同步卡号</Button>-->
      <!--</div>-->
      <a-table bordered :columns="columnsMember" :data-source="memberList" :pagination="false">
        <template slot="index" slot-scope="text, record, index">
          <span>{{ pageNumber * pageSize + index + 1 }}</span>
        </template>
      </a-table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <a-pagination
            size="small"
            :total="total"
            :current="pageNumber + 1"
            :pageSize.sync="pageSize"
            @showSizeChange="changePageSize"
            @change="changePage"
            :show-total="(total) => `共${total}条`"
            show-size-changer show-quick-jumper />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import membershipsApi from '@/api/membershipsApi';

export default {
  name: 'MemberShip',
  data() {
    return {
      locale,
      formSearchInfo: {
        nickname: '',
        membName: '',
        phone: '',
        regTimeStart: '',
        regTimeEnd: '',
      },
      regTime: undefined,
      columnsMember: [
        { title: '序号', key: 'index', width: 80, align: 'center', scopedSlots: { customRender: 'index' } },
        { title: '会员编码', dataIndex: 'membCode', key: 'membCode', align: 'center', },
        { title: '昵称', dataIndex: 'nickname', key: 'nickname', align: 'center' },
        { title: '姓名', dataIndex: 'membName', key: 'membName', align: 'center' },
        { title: '手机', dataIndex: 'phone', key: 'phone', align: 'center' },
        { title: '注册时间', dataIndex: 'reg_time', key: 'reg_time', align: 'center' },
        { title: '最后下单时间', dataIndex: 'lastOrderTime', key: 'lastOrderTime', align: 'center' },
      ],
      memberList: [],
      total: 0,
      pageNumber: 0,
      pageSize: 10
    };
  },
  created() {
    this.getMemberList();
  },
  methods: {
    changePage(page, pageSize) {
      console.log(page, pageSize);
      this.pageNumber = page - 1;
      this.getMemberList();
    },
    changePageSize(current, size) {
      console.log(current, size);
      this.pageNumber = 0;
      this.pageSize = size;
      this.getMemberList();
    },
    // 搜索
    searchList() {
      this.pageNumber = 0;
      this.getMemberList();
    },
    // 重置
    resetInput() {
      this.formSearchInfo = this.$options.data().formSearchInfo;
      this.regTime = undefined;
    },
    onChangeDate(date, dateString) {
      this.formSearchInfo.regTimeStart = dateString[0];
      this.formSearchInfo.regTimeEnd = dateString[1];
      console.log(date);
    },
    getMemberList() {
      this.isLoading = true;
      const { pageNumber, pageSize } = this;
      console.log(this.regTime);
      const params = {
        ...this.formSearchInfo,
        pageNumber,
        pageSize
      };
      membershipsApi.getMembershipsList(params).then(res => {
        if (res.code === 200) {
          this.isLoading = false;
          this.memberList = res.data;
          this.total = res.total;
          this.pageNumber = res.pageInfo.pageNumber;
        }
      });
    }
  }
};
</script>

<style scoped>

</style>
