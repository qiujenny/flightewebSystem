<template>
  <div class="search-form">
    <a-form :form="form">
      <a-row :gutter="24">
        <a-col
          v-for="(item, index) in this.searchForm"
          :key="index"
          :span="item.span || 4"
        >
          <a-form-item :label="item.label">
            <a-input
              v-if="item.type === 'input'"
              v-bind="item.attrs"
              v-decorator="[`${item.field}`]"
              :placeholder="item.placeholder || '请输入'"
              autocomplete="off"
              :allowClear="true"
            />
            <a-select
              v-if="item.type === 'searchSelect'"
              show-search
              placeholder="请输入选择"
              option-filter-prop="children"
              :filter-option="filterOption"
              v-bind="item.attrs"
              v-decorator="[`${item.field}`]"
              :options="item.options"
              @change="item.change"
            />
            <a-select
              v-if="item.type === 'select'"
              v-decorator="[`${item.field}`]"
              placeholder="请选择"
              option-filter-prop="children"
              v-bind="item.attrs"
              :options="item.options"
            />
            <a-tree-select
              v-if="item.type === 'treeSelect'"
              v-decorator="[`${item.field}`]"
              :dropdown-style="{ maxHeight: '300px', overflow: 'auto' }"
              :tree-data="item.treeData"
              :replaceFields="item.replaceFields"
              placeholder="请选择"
              >
              </a-tree-select>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item>
            <a-button type="primary" @click="handleSearch">搜索</a-button>
            <a-button style="margin-left: 20px" @click="handleReset">重置</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
export default {
  name: 'SearchForm',
  props: {
    name: {
      required: true,
      type: String,
      default: 'searchForm'
    },
    searchForm: {
      required: true,
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: this.name }),
    };
  },
  watch: {
    // 设置默认值
    searchForm: {
      deep: true,
      immediate: true,
      handler(arr) {
        this.handleDefault(arr);
      }
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.handleNullData());
    },

    handleChange(val) {
      console.log(val);
    },

    handleReset() {
      this.form.resetFields();
      this.handleDefault(this.searchForm);
      this.$nextTick(() => {
        this.$emit('reset', this.handleNullData());
      });
    },

    handleDefault(arr) {
      const hasDefaultValueArr = arr.filter(item => item.defaultValue);
      if (hasDefaultValueArr.length) {
        const data = {};
        hasDefaultValueArr.forEach(item => {
          data[item.field] = item.defaultValue;
        });
        this.$nextTick(() => {
          this.form.setFieldsValue({ ...data });
        });
      }
    },

    handleNullData() {
      const data = this.form.getFieldsValue();
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key) && data[key] === undefined) {
          data[key] = null;
        }
      }
      return data;
    },

    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
  },
};
</script>

<style lang="less" scoped>
.search-form {
  .ant-form {
    .ant-form-item {
      display: flex;
    }
    /deep/ .ant-form-item-control-wrapper {
      flex: 1;
    }
  }
}
</style>
