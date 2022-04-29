<template>
  <a-modal
    width="80%"
    class="transfer-modal"
    :visible="visible"
    :bodyStyle="{minHeight: '500px'}"
    :confirmLoading="subLoading"
    title="给当前分店添加商品"
    cancelText="取消"
    okText="确定"
    @ok="handleSubmit"
    @cancel="$emit('close')"
  >
    <a-form :form="form" class="search-form">
      <a-row :gutter="24">
        <a-col :span="5">
          <a-form-item label="商品分类">
            <a-tree-select
              v-decorator="['classParentId']"
              :dropdown-style="{ maxHeight: '300px', overflow: 'auto' }"
              :tree-data="treeData"
              :replaceFields="{ children: 'childList', title: 'name', key: 'id', value: 'id' }"
              placeholder="请选择"
              >
              </a-tree-select>
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item label="商品名称">
            <a-input
              v-decorator="['goodsNameOrSkuCode']"
              placeholder="商品名称/编码"
              autocomplete="off"
              :allowClear="true"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item>
            <a-button type="primary" @click="getData">搜索</a-button>
            <a-button style="margin-left: 20px" @click="handleReset">重置</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-row :gutter="24">
      <a-col :span="10" class="goods-list">
        <a-table
          bordered
          size="small"
          :columns="columns1"
          :data-source="data1"
          :loading="loading"
          :pagination="false"
          rowKey="skuCode"
        />
        <a-pagination
          size="small"
          :total="total"
          :current="page + 1"
          @showSizeChange="changePageSize"
          @change="changePage"
          :show-total="(total) => `共${total}条`"
          show-size-changer
        />
      </a-col>
      <a-col :span="14" class="selected-goods">
        <a-table
          bordered
          size="small"
          :columns="columns2"
          :data-source="data2"
          :pagination="false"
          rowKey="times"
          :scroll="data2.length > 10 ? { y: 488 } : {}"
        />
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'TransferModal',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    treeData: {
      type: Array,
      required: true
    },
    shopId: {
      type: Number,
      required: true
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(bool) {
        if (bool) this.getData();
      }
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'transferModalSearchForm' }),
      params: {},
      columns1: [
        { title: '编码', dataIndex: 'skuCode' },
        { title: '商品名称', dataIndex: 'goodsSkuName' },
        {
          title: '操作',
          key: 'operator',
          width: 80,
          align: 'center',
          customRender: (text, record) => (
            <a-button type="link" onClick={() => this.handleAdd(record)}>
              添加
            </a-button>
          )
        }
      ],
      columns2: [
        { title: '编码', dataIndex: 'skuCode' },
        { title: '商品名称', dataIndex: 'goodsSkuName' },
        {
          title: '包装单位',
          dataIndex: 'pkg',
          width: 90,
          customRender: (text, record, index) => (
            <a-select
              v-model={record.pkg}
              style="width: 100%"
              placeholder="请选择"
              options={this.pkgList}
            />
          )
        },
        {
          title: '包装规格',
          dataIndex: 'pkgQty',
          width: 90,
          customRender: (text, record, index) => (
            <a-input-number
              v-model={record.pkgQty}
              max={99999}
              min={1}
              style="width: 100%"
              placeholder="请输入"
            />
          )
        },
        { title: '成本指导价', dataIndex: 'retailPrice', width: 90 },
        {
          title: '价格',
          dataIndex: 'whsPrice',
          width: 90,
          customRender: (text, record, index) => (
            <a-input-number
              v-model={record.whsPrice}
              max={99999}
              min={0.01}
              precision={2}
              style="width: 100%"
              placeholder="请输入"
            />
          )
        },
        {
          title: '操作',
          key: 'operator',
          width: 70,
          align: 'center',
          customRender: (text, record, index) => (
            <a-button type="link" onClick={() => this.handleDelete(index)}>
              删除
            </a-button>
          )
        }
      ],
      data1: [],
      data2: [],
      page: 0,
      rows: 10,
      total: 0,
      pkgList: [
        { value: '箱', label: '箱' },
        { value: '件', label: '件' },
        { value: '瓶', label: '瓶' },
        { value: '包', label: '包' },
        { value: '个', label: '个' },
      ],
      loading: true,
      subLoading: false
    };
  },
  methods: {
    ...mapActions(['goodsListAction', 'saveGoodsAction']),
    getData() {
      this.loading = true;
      const data = this.form.getFieldsValue();
      const payload = {
        ...data,
        enable: [1, 3],
        newSkuCodeFlag: 1,
        page: this.page,
        rows: this.rows,
      };
      this.goodsListAction(payload).then(res => {
        if (res.code) {
          this.data1 = res.data || [];
          this.total = res.total || 0;
        }
        this.loading = false;
      });
    },
    handleAdd(record) {
      this.data2.push({ ...record, pkg: '箱', times: new Date().getTime() });
    },
    handleDelete(index) {
      this.data2.splice(index, 1);
    },
    // 重置
    handleReset() {
      this.form.resetFields();
      this.getData();
    },
    changePage(page, pageSize) {
      this.page = page - 1;
      this.getData();
    },
    changePageSize(current, size) {
      this.page = 0;
      this.rows = size;
      this.getData();
    },
    // 添加商品弹窗的 '确定'
    handleSubmit() {
      if (!this.data2.length) {
        this.$message.error('请添加商品');
        return;
      }
      const { userId, userName } = this.$store.state.user;
      const arr = [];
      this.data2.map(item => {
        arr.push(item.skuId);
      });
      const goodsObj = {};
      for (let i = 0; i < arr.length; i++) {
        if (goodsObj[arr[i]]) {
          goodsObj[arr[i]]++;
        } else {
          goodsObj[arr[i]] = 1;
        }
      }
      for (const j in goodsObj) {
        if (goodsObj[j] > 1) {
          const repeatGoods =  this.data2.filter(item => {
            console.log(item.skuId, 'd', j);
            return item.skuId === Number(j);
          });
          const selList = [];
          repeatGoods.map(item => {
            selList.push(item.pkgQty);
          });
          const repeatPcs = Array.from(new Set(selList));
          // 去重比对前后两个数组长度，不相等则存在同一种商品，包装数量一样的情况，
          if (repeatPcs.length !== selList.length) {
            this.$message.error('添加的同一商品中存在包装规格相同的情况，请检查包装规格。');
            return;
          }
        }
      }
      const list = [];
      for (let i = 0; i < this.data2.length; i++) {
        const iData = this.data2[i];
        const { skuId, pkg, pkgQty, sku_imgurl, whsPrice, goodsSkuName } = iData;
        if (!iData.whsPrice) {
          this.$message.error(`${goodsSkuName}价格不能为空，请输入!`);
          return;
        } else if (!(/^\d+\.?\d{0,2}$/.test(iData.whsPrice))) {
          this.$message.error(`${goodsSkuName}价格小数点后只能保留两位，请重新输入!`);
          return;
        } else if (!iData.pkgQty) {
          this.$message.error(`${goodsSkuName}包装规格不能为空，请输入!`);
          return;
        }
        const payload = {
          skuId,
          pkg,
          pkgQty,
          picCode: sku_imgurl,
          whsPrice,
          whsGoodsName: goodsSkuName,
          shopId: this.shopId,
          userId,
          userName,
        };
        list.push(payload);
      }
      this.subLoading = true;
      this.saveGoodsAction(list).then(res => {
        if (res.code === 200) {
          this.$message.success('保存成功');
          this.$emit('close');
          this.$emit('reload');
        }
      }).catch(err => {
        this.subLoading = false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.transfer-modal {
  .search-form.ant-form {
    .ant-form-item {
      display: flex;
    }
    /deep/ .ant-form-item-control-wrapper {
      flex: 1;
    }
  }
  .goods-list {
    .ant-pagination {
      text-align: right;
      margin-top: 10px;
      margin-right: -8px;
    }
  }
}
</style>
