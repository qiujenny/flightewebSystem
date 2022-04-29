<template>
  <div class="add-or-edit-shop main-padding">
    <div class="add_title">
      <span class="addTitle_txet">
        {{shopId ? '编辑分店' : '新建分店'}}
      </span>
    </div>
    <a-form :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="分店名称">
        <a-input
          v-decorator="[
            'shopName',
            {
              rules: [
                {
                  required: true,
                  pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{1,20}$/,
                  message: '请输入中文、英文、数字且长度小于20'
                },
              ]
            },
          ]"
          placeholder="请输入"
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item label="店长" v-if="shopId">
        <a-select
          show-search
          placeholder="请输入"
          option-filter-prop="children"
          :filter-option="filterOption"
          v-decorator="[
            'managerId',
            { rules: [{ required: true, message: '店长不能为空' }] },
          ]"
          :options="managerOptions"
        >
        </a-select>
      </a-form-item>
      <a-form-item label="省市区">
        <a-cascader
          :options="options"
          placeholder="请选择"
          :fieldNames="{ label: 'label', value: 'label', children: 'children' }"
          v-decorator="[
            'region',
            { rules: [{ required: true, message: '省市区不能为空' }] },
          ]"
        />
      </a-form-item>
      <a-form-item label="详细地址">
        <a-input
          v-decorator="[
            'ptAddr',
            { rules: [{ required: true, message: '详细地址不能为空' }] },
          ]"
          placeholder="请输入"
          autocomplete="off"
        />
        <a-button type="primary" @click="drawMap">
          获取经纬度
        </a-button>
        <span v-if="coordinate">{{`(${coordinate.latitude}, ${coordinate.longitude})`}}</span>
      </a-form-item>
      <div style="color: #f00;" v-if="!shopId">
        提示：请先在账号管理里创建该分店的店长账号后，在分店编辑页面进行配置
      </div>
    </a-form>
    <div class="operate-btn">
      <a-button @click="handleBack">
        取消
      </a-button>
      <a-button type="primary" :loading="subLoading" @click="handleSave">
        保存
      </a-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import options from '@/libs/cascader-address-options';

export default {
  name: 'AddOrEditShop',
  data() {
    return {
      options,
      detailData: {},
      shopId: null,
      mapProps: {
        cityName: '',
        position: ''
      },
      mapModalVisible: false,
      mapPoints: [],
      managerList: [],
      managerOptions: [],
      coordinate: null,
      form: this.$form.createForm(this, { name: 'add_or_edit_shop' }),
      subLoading: false,
    };
  },
  activated() {
    const { shopId } = this.$route.params;
    if (Number(shopId)) {
      this.shopId = Number(shopId);
      this.getShopDetail({ shopId });
      this.getManagerList({ shopId });
    } else {
      this.shopId = null;
    }
  },
  deactivated() {
    this.form.resetFields();
    this.coordinate = null;
  },
  methods: {
    ...mapActions(['managerListAction', 'shopDetailAction', 'saveShopAction', 'updateShopAction']),
    // 获取店铺详情
    getShopDetail(payload) {
      this.shopDetailAction(payload).then(res => {
        this.detailData = res.data || {};
        const { shopName, staffId, region, latitude, longitude, ptAddr } = this.detailData;
        const data = {
          shopName,
          managerId: staffId,
          region: region && region.split('/'),
          ptAddr
        };
        this.coordinate = { latitude, longitude };
        this.form.setFieldsValue(data);
      });
    },
    // 查看地图
    drawMap() {
      this.coordinate = null;
      const { region, ptAddr } = this.form.getFieldsValue();
      if (ptAddr && region) {
        this.mapProps.position = ptAddr;
        this.mapProps.cityName = region.join(',');
        this.mapModalVisible = true;
      } else {
        this.mapModalVisible = false;
        this.$message.warning('选择省市区和填写详细地址');
      }
    },
    // 设置经纬度
    handleSetCoordinate(data) {
      this.coordinate = data ? { ...data } : null;
    },
    // 获取店长下拉列表
    getManagerList(payload) {
      this.managerListAction(payload).then(res => {
        const { code, data } = res;
        if (code === 200) {
          this.managerList = data || [];
          this.managerOptions = (data || []).map(item => ({
            label: item.trueName,
            value: item.staffId
          }));
        }
      });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    // 取消
    handleBack() {
      this.$router.push({ name: 'createShop' });
    },
    // 保存
    handleSave() {
      this.form.validateFields(async (err, values) => {
        if (!this.coordinate) {
          this.$message.warning('请获取经纬度');
          return;
        }
        if (!err) {
          const { ptAddr, region, shopName, managerId } = values;
          const payload = {
            shopId: this.shopId || '',
            shopType: 2,
            shopName,
            addrParam: {
              ptRegion1: region[0],
              ptRegion2: region[1],
              ptRegion3: region[2],
              ptAddr,
              ...this.coordinate
            }
          };
          if (managerId) {
            const currManager = this.managerList.find(item => item.staffId === managerId);
            if (currManager) {
              payload.managerId = currManager.staffId;
              payload.managerName = currManager.trueName;
              payload.workno = currManager.workno;
            }
          }
          let res = {};
          this.subLoading = true;
          try {
            if (this.shopId) {
              res = await this.updateShopAction(payload);
            } else {
              res = await this.saveShopAction(payload);
            }
            if (res.code === 200) {
              this.$message.success('保存成功');
              this.handleBack();
            }
            this.subLoading = false;
          } catch (error) {
            this.subLoading = false;
          }
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.add-or-edit-shop {
  .ant-form {
    width: 500px;
    margin-left: 30px;
  }
  .operate-btn {
    text-align: center;
    margin-top: 40px;
    .ant-btn:first-child {
      margin-right: 30px;
    }
  }
  .add_title{
    text-align: left;
    border: 1px solid #ccc;
    padding-left:5px;
    height: 30px;
    margin-bottom: 10px;
  }
  .addTitle_txet{
    border-left: 2px solid #1890ff;
    line-height: 30px;
    padding: 3px 0 2px 4px;
    font-weight: 800;
  }
}
</style>
