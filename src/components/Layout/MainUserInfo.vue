<template>
  <div>
    <!--查看账户-->
    <a-modal
      title="账户信息"
      v-model="visible"
      :maskClosable="false"
      width="50%"
      @cancel="closeModal()"
    >
      <a-form :label-width="0" ref="accountInfoForm">
        <a-row :gutter="16">
          <a-col span="4">
            <a-form-item prop="name">
              <div class="gutter-box" style="width: 100%">
                <div class="gutter-box-label" style=""><span>姓名</span></div>
                <a-input v-model="userName" placeholder="请输入" disabled />
              </div>
            </a-form-item>
          </a-col>
          <a-col span="4">
            <a-form-item prop="loginName">
              <div class="gutter-box" style="width: 100%">
                <div class="gutter-box-label" style=""><span>账户</span></div>
                <a-input v-model="loginName" placeholder="请输入" disabled />
              </div>
            </a-form-item>
          </a-col>
          <a-col span="4">
            <a-form-item prop="employeeNo">
              <div class="gutter-box" style="width: 100%">
                <div class="gutter-box-label" style=""><span>手机</span></div>
                <a-input v-model="phone" placeholder="请输入" disabled />
              </div>
            </a-form-item>
          </a-col>
          <a-col span="4">
            <a-form-item prop="employeeNo">
              <div class="gutter-box" style="width: 100%">
                <div class="gutter-box-label" style=""><span>工号</span></div>
                <a-input v-model="employeeNo" placeholder="请输入" disabled />
              </div>
            </a-form-item>
          </a-col>
          <a-col span="4">
            <a-form-item prop="employeeNo">
              <div class="gutter-box" style="width: 100%">
                <div class="gutter-box-label" style=""><span>邮箱</span></div>
                <a-input v-model="email" placeholder="请输入" disabled />
              </div>
            </a-form-item>
          </a-col>
          <a-col span="4">
            <a-form-item prop="employeeNo">
              <div class="gutter-box" style="width: 100%">
                <div class="gutter-box-label" style=""><span>QQ</span></div>
                <a-input v-model="qq" placeholder="请输入" disabled />
              </div>
            </a-form-item>
          </a-col>
          <a-col span="4">
            <a-form-item prop="employeeNo">
              <div class="gutter-box" style="width: 100%">
                <div class="gutter-box-label" style=""><span>微信</span></div>
                <a-input v-model="weixinId" placeholder="请输入" disabled />
              </div>
            </a-form-item>
          </a-col>
          <a-col span="4">
            <a-form-item prop="employeeNo">
              <div class="gutter-box" style="width: 100%">
                <div class="gutter-box-label" style=""><span>客服</span></div>
                <a-select  v-model="isService"  style="width: 120px" disabled>
                  <a-select-option :value="1">是</a-select-option>
                  <a-select-option :value="0">否</a-select-option>
                </a-select>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="m-t-10">
          <a-col span="3">
            <span>角色信息</span>
          </a-col>
          <a-col span="21">
            <div class="model-contentLine">
              <div v-if="roleList && roleList.length>0">
                <a-tag :fade="false" type="border" class="modelTags"  v-for="(role, index) in roleList"
                     :key="index"
                >{{ role.name }}</a-tag>
              </div>
            </div>
          </a-col>
        </a-row>
      </a-form>
      <div slot="footer">
        <a-button class="m-l-10" @click="closeModal()">&nbsp;&nbsp;关闭&nbsp;&nbsp;</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>

export default {
  name: 'MainUserInfo',
  props: {
    roleList: { type: Array, default: () => [] },
    loginName: { type: String, default: '' },
    employeeNo: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    qq: { type: String, default: '' },
    weixinId: { type: String, default: '' },
    isService: { type: Number },
    userName: { type: String, default: '' },
    closeModal: { type: Function },
  },
  data() {
    return {
      visible: true
    };
  },
};
</script>
