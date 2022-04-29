<template>
  <div class="table-com">
    <a-table
      bordered
      :loading="loading"
      :rowKey="rowKey"
      :columns="columns"
      :data-source="data"
      :pagination="false"
    />
    <a-pagination
      size="small"
      :total="total"
      :current="pageNumber + 1"
      @showSizeChange="changePageSize"
      @change="changePage"
      :show-total="(total) => `共${total}条`"
      show-size-changer
      show-quick-jumper
    />
  </div>
</template>
<script>
export default {
  name: 'TableCom',
  props: {
    columns: {
      type: Array,
      required: true,
      default: () => []
    },
    actions: {
      type: Function,
      required: true,
    },
    params: {
      type: Object,
      required: true,
      default: () => {}
    },
    rowKey: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      data: [],
      total: 0,
      pageNumber: 0,
      pageSize: 10,
      loading: false,
    };
  },
  computed: {
    payload() {
      return {
        ...this.params,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
      };
    }
  },
  watch: {
    payload: {
      deep: true,
      handler() {
        this.getData();
      }
    }
  },
  methods: {
    changePage(page, pageSize) {
      this.pageNumber = page - 1;
    },
    changePageSize(current, size) {
      this.pageNumber = 0;
      this.pageSize = size;
    },
    getData() {
      this.loading = true;
      this.actions(this.payload).then(res => {
        const { code, data, msg, total } = res;
        if (code === 200) {
          this.data = data || [];
          this.total = total;
        } else {
          this.$message.error(msg);
        }
        this.loading = false;
      });
    }
  },
};
</script>

<style lang="less" scoped>
.table-com {
  .ant-pagination {
    margin: 20px 10px;
    text-align: right;
  }
}
</style>
