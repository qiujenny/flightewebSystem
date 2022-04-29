<template>
  <a-form :form="form">
    <a-form-item
      v-for="(k, index) in form.getFieldValue('keys')"
      :key="k"
      v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
      :label="index === 0 ? title : ''"
      :required="false"
    >
      <a-select
        show-search
        placeholder="请输入选择"
        option-filter-prop="children"
        :filter-option="filterOption"
        v-decorator="[
          `names[${k}]`,
        ]"
        :options="eqOptions"
        style="width: 60%; margin-right: 8px"
      />
      <a-icon
        class="dynamic-delete-button"
        type="minus-circle-o"
        @click="() => remove(k)"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="dashed" style="width: 60%" @click="add">
        <a-icon type="plus" /> 新增
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'DynamicForm',
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    itemLen: {
      type: Number
    },
    eqList: {
      type: Array
    },
    initValue: {
      type: Object
    }
  },
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      },
      len: this.itemLen || 1,
      eqOptions: []
    };
  },
  created() {
    this.form = this.$form.createForm(this, { name: this.name, onValuesChange: this.formChange });
    this.form.getFieldDecorator('keys', { initialValue: [...Array(this.len).keys()], preserve: true });
    this.$nextTick(() => {
      this.form.setFieldsValue({ ...this.initValue });
    });
  },
  watch: {
    eqList: {
      deep: true,
      immediate: true,
      handler(data) {
        this.eqOptions = [...data];
      }
    }
  },
  methods: {
    remove(k) {
      const { form } = this;
      const keys = form.getFieldValue('keys');
      if (keys.length === 1) {
        form.setFieldsValue({
          keys: [0],
          names: [undefined]
        });
        return;
      }
      form.setFieldsValue({
        keys: keys.filter(key => key !== k),
      });
    },
    add() {
      const { form } = this;
      const keys = form.getFieldValue('keys');
      const nextKeys = keys.concat(this.len++);
      form.setFieldsValue({
        keys: nextKeys,
      });
    },
    // 已选中设备禁选
    formChange(props, values) {
      const { names } = values;
      this.$nextTick(() => {
        const arr = this.form.getFieldValue('names');
        this.eqOptions = (this.eqOptions || []).map(item => ({
          ...item,
          disabled: arr.findIndex(eq => eq === item.value) > -1
        }));
      });
    },
    filterOption(input, option) {
      const data = option.componentOptions.propsData;
      const { value, disabled } = data;
      return (
        value.toLowerCase().indexOf(input.toLowerCase()) >= 0 && !disabled
      );
    },
  },
};
</script>
