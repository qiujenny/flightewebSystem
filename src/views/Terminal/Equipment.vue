<template>
  <div class="main-padding">
    <a-row :gutter="24">
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="width: 100%">
          <div class="gutter-box-label" style=""><span>设备类型</span></div>
          <div>
            <a-select
            placeholder="请选择"
            v-model="equType"
            @change="typeChange"
            style="width: 100%;"
            :options="typeList"
            >
            </a-select>
          </div>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="width: 100%">
          <div class="gutter-box-label" style=""><span>设备编号</span></div>
          <a-input v-model="searchParams.eqmSn" placeholder="请输入" />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="width: 100%">
          <div class="gutter-box-label" style=""><span>分店</span></div>
          <div>
            <a-select
            style="width: 100%;"
            v-model="shopName"
            placeholder="请选择"
            @change="shopChange"
            :options="shopList"
            >
          </a-select>
          </div>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="width: 100%">
          <div class="gutter-box-label" style=""><span>设备状态</span></div>
          <div>
            <a-select
            style="width: 100%;"
            v-model="equStatus"
            placeholder="请选择"
            @change="equStaChange"
            :options="stateList"
            >
          </a-select>
          </div>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="width: 100%">
          <div class="gutter-box-label" style=""><span>网络状态</span></div>
          <div>
            <a-select
            style="width: 100%;"
            v-model="netStatus"
            placeholder="请选择"
            @change="netChange"
            :options="netStateList"
            >
          </a-select>
          </div>
        </div>
      </a-col>
    </a-row>
    <div class="button-group">
        <div class="button-left">
            <a-button type="primary" @click="addList" >新增</a-button>
        </div>
        <div class="button-right">
            <a-button style="margin-left: 10px" type="primary" @click="searchList" >搜索</a-button>
            <a-button style="margin-left: 10px" @click="resetInput">重置</a-button>
        </div>
    </div>
    <div class="table">
       <table-header :columns="columns" :equList='equList' :total='total' :loading='loading' @change="changePage" @onShowSizeChange = 'onShowSizeChange'>
       </table-header>
    </div>
  </div>
</template>

<script>
import tableHeader from './Table';
import { eqList } from '../../api/Ems';
import { shopWrdList } from '../../api/order';

const equList = [];// 数据
const columns = [
  {
    title: '序号',
    dataIndex: 'key',
    width: 80,
  },
  {
    title: '设备编号',
    dataIndex: 'eqmSn',
    width: 150,
    scopedSlots: { customRender: 'eqmSn' },
  },
  {
    title: '设备类型',
    dataIndex: 'productTypeName',
    width: 150,
  },
  {
    title: '所在分店',
    dataIndex: 'shopName',
    width: 150,
  },
  {
    title: '设备状态',
    dataIndex: 'enableName',
    width: 150,
  },
  {
    title: '网络状态',
    dataIndex: 'onlineStatusName',
    ellipsis: true,
  },
  {
    title: '串口信息',
    dataIndex: 'portInfo',
    key: 'portInfo',
    width: 100,
    scopedSlots: { customRender: 'portInfo' },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 100,
    scopedSlots: { customRender: 'operation' },
  },
];// 表头
export default {
  name: 'equipment',
  components: {
    tableHeader
  },
  computed: {
    // allPrivligeList() {
    //   return this.$store.state.role.allPrivligeList
    // },
  },
  data() {
    return {
      loading: true,
      typeList: [
        {
          value: 3,
          label: '中控PC'
        },
        {
          value: 4,
          label: '收银机'
        },
        {
          value: 5,
          label: '手持机'
        },
        {
          value: 6,
          label: '门禁'
        }
      ],
      stateList: [
        {
          value: 0,
          label: '在用'
        },
        {
          value: 2,
          label: '待装'
        },
        {
          value: 3,
          label: '在库'
        },
      ],
      netStateList: [
        {
          value: 0,
          label: '离线'
        },
        {
          value: 1,
          label: '在线'
        },
        {
          value: 2,
          label: '禁用'
        }
      ],
      equList,
      columns,
      equType: undefined, // 设备类型初始化
      shopList: [], // 分店
      equStatus: undefined, // 设备状态初始化
      netStatus: undefined, // 网络状态初始化
      shopName: undefined, // 分店
      total: 0, // 数量
      searchParams: {
        productTypeId: '',
        eqmSn: '',
        shopId: '',
        enable: '',
        enableList: [],
        onlineStatus: '',
        shopName: '',
        pageNum: 0,
        pageSize: 10
      }, // 查询参数

    };
  },
  created() {
    this.getEqList();
    this.getShopWrdList();
  },
  // activated() {
  //   this.getEqList();
  //   this.getShopWrdList();
  // },
  methods: {
    // 选择设备类型
    typeChange(value) {
      this.searchParams.productTypeId	 = value;
    },
    // 分店选择
    shopChange(value) {
      this.searchParams.shopId = value;
    },
    // 设备状态
    equStaChange(value) {
      this.searchParams.enable = value;
    },
    // 网络状态
    netChange(value) {
      this.searchParams.onlineStatus = value;
    },
    // 新增
    addList() {
      this.$router.push({
        name: 'addEqu',
        query: { type: 'add' }
      });
    },
    // 搜索
    searchList() {
      this.getEqList();
    },
    // 重置
    resetInput() {
      this.equType = undefined;
      this.equStatus = undefined;
      this.netStatus = undefined;
      this.shopName = undefined;
      this.searchParams = {
        productTypeId: '',
        eqmSn: '',
        shopId: '',
        enable: '',
        enableList: [],
        onlineStatus: '',
        shopName: '',
        pageNum: 0,
        pageSize: 10
      };// 查询参数
    },
    // 分页
    changePage(page, pageSize) {
      this.searchParams.pageNum = page - 1;
      this.searchParams.pageSize = pageSize;
      this.getEqList();
    },
    onShowSizeChange(current, pageSize) {
      this.searchParams.pageNum = current - 1;
      this.searchParams.pageSize = pageSize;
      this.getEqList();
    },
    // 获取分店
    getShopWrdList() {
      const query = {
        pageNumber: 0,
        pageSize: 10000
      };
      shopWrdList(query).then(res => {
        // console.log(res.data);
        res.data.forEach(val => {
          const option = {
            value: val.shopId,
            label: val.shopName
          };
          this.shopList.push(option);
        });
      });
    },
    // 获取设备列表
    getEqList() {
      eqList(this.searchParams).then(res => {
        const { data, code, pageInfo } = res;
        if (code === 200) {
          this.loading = false;
          data.forEach((item, index) => {
            item.key = index + 1;
            item.operation = '编辑';
            if (item.enable === 0) item.enableName = '在用';
            if (item.enable === 2) item.enableName = '待装';
            if (item.enable === 3) item.enableName = '在库';
            if (item.onlineStatus === 0) item.onlineStatusName = '离线';
            if (item.onlineStatus === 1) item.onlineStatusName = '在线';
            if (item.onlineStatus === 2) item.onlineStatusName = '禁用';
          });
          this.equList = data;
          this.total = pageInfo.total;
        }
      });
    }
  }
};
</script>

<style scoped lang='less'>
.gutter-box-label{
  width: 80px;
}
.button-group{
    padding: 20px 0 10px;
    display: flex;
    justify-content : space-between;
    .button-right{
        padding-right: 0px;
    }
}
</style>
