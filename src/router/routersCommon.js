import Main from '../views/Main/Index.vue';
import { baseRouter_path } from '../libs/comment';

export default [
  {
    path: '/flighteweb',
    name: 'flighteweb',
    meta: {
      icon: 'gk-ywcd',
      title: '订舱信息'
    },
    component: Main,
    children: [
      {
        path: `${baseRouter_path}Home`,
        name: 'Home',
        meta: {
          icon: 'desktop',
          title: '首页',
          hide: true
        },
        component: () => import('@/views/Home/Index.vue'),
        children: [
          {
            path: `${baseRouter_path}home`,
            name: 'home',
            meta: {
              title: '首页',
              hide: true,
              fatherName: 'Home',
            },
            component: () => import('../views/Home/Home.vue')
          }
        ]
      },
      {
        path: `${baseRouter_path}BaseData`,
        name: 'BaseData',
        meta: {
          icon: 'desktop',
          title: '基础数据',
        },
        component: () => import('@/views/BaseData/Index.vue'),
        children: [
          {
            path: `${baseRouter_path}companyMainBody`,
            name: 'companyMainBody',
            meta: {
              title: '公司主体',
              fatherName: 'BaseData',
            },
            component: () => import('@/views/BaseData/CompanyMainBody.vue')
          },
          {
            path: `${baseRouter_path}addOrEditShop/:shopId`,
            name: 'addOrEditShop',
            meta: {
              hide: true,
              title: '开店',
              fatherName: 'BaseData',
            },
            component: () => import('@/views/BaseData/AddOrEditShop.vue')
          },
          {
            path: `${baseRouter_path}shopDetail/:shopId`,
            name: 'shopDetail',
            meta: {
              hide: true,
              title: '分店详情',
              fatherName: 'BaseData',
            },
            component: () => import('@/components/Shop/ShopDetail.vue')
          },
          {
            path: `${baseRouter_path}departmentManagement`,
            name: 'departmentManagement',
            meta: {
              title: '部门管理',
              fatherName: 'BaseData',
            },
            component: () => import('@/views/BaseData/DepartmentManagement.vue')
          },
          {
            path: `${baseRouter_path}postmentManagement`,
            name: 'postmentManagement',
            meta: {
              title: '岗位管理',
              fatherName: 'BaseData',
            },
            component: () => import('@/views/BaseData/PostmentManagement.vue')
          },
          {
            path: `${baseRouter_path}staffManagement`,
            name: 'staffManagement',
            meta: {
              title: '员工管理',
              fatherName: 'BaseData',
            },
            component: () => import('@/views/BaseData/StaffManagement.vue')
          },
          {
            path: `${baseRouter_path}staffAuthorize`,
            name: 'staffAuthorize',
            meta: {
              title: '员工授权',
              fatherName: 'BaseData',
            },
            component: () => import('@/views/BaseData/StaffAuthorize.vue')
          },
          {
            path: `${baseRouter_path}postAuthorize`,
            name: 'postAuthorize',
            meta: {
              title: '岗位授权',
              fatherName: 'BaseData',
            },
            component: () => import('@/views/BaseData/PostAuthorize.vue')
          },
          {
            path: `${baseRouter_path}correspondenceUnit`,
            name: 'correspondenceUnit',
            meta: {
              title: '往来单位',
              fatherName: 'BaseData',
            },
            component: () => import('@/views/BaseData/CorrespondenceUnit.vue')
          },
        ]
      },
      {
        path: `${baseRouter_path}BookingInfo`,
        name: 'BookingInfo',
        meta: {
          icon: 'user',
          title: '订舱信息',
        },
        component: () => import('@/views/BookingInfo/Index.vue'),
        children: [
          {
            path: `${baseRouter_path}bookingManagement`,
            name: 'bookingManagement',
            meta: {
              title: '订单管理',
              fatherName: 'BookingInfo',
            },
            component: () => import('@/views/BookingInfo/BookingManagement.vue'),
          },
          {
            path: `${baseRouter_path}orderDetails`,
            name: 'orderDetails',
            meta: {
              hide: true,
              fatherName: 'BookingInfo',
              title: '订单详情',
            },
            component: () => import('@/views/BookingInfo/OrderDetails.vue')
          },
          {
            path: `${baseRouter_path}ladingBillManagement`,
            name: 'ladingBillManagement',
            meta: {
              title: '提单管理',
              fatherName: 'BookingInfo',
            },
            component: () => import('@/views/BookingInfo/LadingBillManagement.vue'),
          },
          {
            path: `${baseRouter_path}warehouseRegistration`,
            name: 'warehouseRegistration',
            meta: {
              title: '留仓登记',
              fatherName: 'BookingInfo',
            },
            component: () => import('@/views/BookingInfo/WarehouseRegistration.vue'),
          },
        ]
      },
      {
        path: `${baseRouter_path}contract`,
        name: 'contract',
        meta: {
          icon: 'user',
          title: '合同管理',
        },
        component: () => import('@/views/Contract/Index.vue'),
        children: [
          {
            path: `${baseRouter_path}businessContract`,
            name: 'businessContract',
            meta: {
              title: '业务合同管理',
              fatherName: 'contract',
            },
            component: () => import('@/views/Contract/BusinessContract.vue'),
          },
          {
            path: `${baseRouter_path}administrationContract`,
            name: 'administrationContract',
            meta: {
              title: '行政合同管理',
              fatherName: 'contract',
            },
            component: () => import('@/views/Contract/AdministrationContract.vue'),
          },
        ]
      },
      {
        path: `${baseRouter_path}transportCapacity`,
        name: 'transportCapacity',
        meta: {
          icon: 'user',
          title: '运力管理',
        },
        component: () => import('@/views/TransportCapacity/Index.vue'),
        children: [
          {
            path: `${baseRouter_path}plateFoundationWeight`,
            name: 'plateFoundationWeight',
            meta: {
              title: '板基重管理',
              fatherName: 'transportCapacity',
            },
            component: () => import('@/views/TransportCapacity/PlateFoundationWeight.vue'),
          },
          {
            path: `${baseRouter_path}aviationBoard`,
            name: 'aviationBoard',
            meta: {
              title: '板基重管理',
              fatherName: 'transportCapacity',
            },
            component: () => import('@/views/TransportCapacity/AviationBoard.vue'),
          },
          {
            path: `${baseRouter_path}capacityInfo`,
            name: 'capacityInfo',
            meta: {
              title: '运力信息管理',
              fatherName: 'transportCapacity',
            },
            component: () => import('@/views/TransportCapacity/CapacityInfo.vue'),
          },
          {
            path: `${baseRouter_path}guidePrice`,
            name: 'guidePrice',
            meta: {
              title: '指导价查看',
              fatherName: 'transportCapacity',
            },
            component: () => import('@/views/TransportCapacity/GuidePrice.vue'),
          },
        ]
      },
      {
        path: `${baseRouter_path}report`,
        name: 'report',
        meta: {
          icon: 'shop',
          title: '报表统计',
        },
        component: () => import('@/views/Report/Index.vue'),
        children: [
          {
            path: `${baseRouter_path}revenueBulletinBoard`,
            name: 'revenueBulletinBoard',
            meta: {
              title: '收入看板',
              fatherName: 'report',
            },
            component: () => import('@/views/Report/RevenueBulletinBoard.vue')
          },
          {
            path: `${baseRouter_path}volumeBulletinBoard`,
            name: 'volumeBulletinBoard',
            meta: {
              title: '货量看板',
              fatherName: 'report',
            },
            component: () => import('@/views/Report/VolumeBulletinBoard.vue')
          },
          {
            path: `${baseRouter_path}capacityReport`,
            name: 'capacityReport',
            meta: {
              title: '运力报表',
              fatherName: 'report',
            },
            component: () => import('@/views/Report/CapacityReport.vue')
          },
        ]
      },
      {
        path: `${baseRouter_path}userManagement`,
        name: 'userManagement',
        meta: {
          icon: 'user',
          title: '客户管理',
        },
        component: () => import('@/views/UserManagement/Index.vue'),
        children: [
          {
            path: `${baseRouter_path}users`,
            name: 'users',
            meta: {
              title: '客户系统账号',
              fatherName: 'userManagement',
            },
            component: () => import('@/views/UserManagement/AccountInfo.vue')
          },
          {
            path: `${baseRouter_path}users`,
            name: 'users',
            meta: {
              title: '客户信息管理',
              fatherName: 'userManagement',
            },
            component: () => import('@/views/UserManagement/AccountInfo.vue')
          },
          {
            path: `${baseRouter_path}roles`,
            name: 'roles',
            meta: {
              title: '历史客户导入',
              fatherName: 'userManagement',
            },
            component: () => import('@/views/UserManagement/RoleInfo.vue')
          },
        ]
      },
      {
        path: `${baseRouter_path}pickUpGoods`,
        name: 'pickUpGoods',
        meta: {
          icon: 'user',
          title: '提货管理',
        },
        component: () => import('@/views/PickUpGoods/Index.vue'),
        children: [
          {
            path: `${baseRouter_path}ladingBill`,
            name: 'ladingBill',
            meta: {
              title: '提货单',
              fatherName: 'pickUpGoods',
            },
            component: () => import('@/views/PickUpGoods/LadingBill.vue')
          },
          {
            path: `${baseRouter_path}vehicleInfo`,
            name: 'vehicleInfo',
            meta: {
              title: '车辆信息管理',
              fatherName: 'pickUpGoods',
            },
            component: () => import('@/views/PickUpGoods/VehicleInfo.vue')
          },
          {
            path: `${baseRouter_path}warehouse`,
            name: 'warehouse',
            meta: {
              title: '仓库管理',
              fatherName: 'pickUpGoods',
            },
            component: () => import('@/views/PickUpGoods/Warehouse.vue')
          },
        ]
      },
      {
        path: `${baseRouter_path}cost`,
        name: 'cost',
        meta: {
          icon: 'user',
          title: '费用管理',
        },
        component: () => import('@/views/Cost/Index.vue'),
        children: [
          {
            path: `${baseRouter_path}costCode`,
            name: 'costCode',
            meta: {
              title: '费用代码管理',
              fatherName: 'cost',
            },
            component: () => import('@/views/Cost/CostCode.vue')
          },
          {
            path: `${baseRouter_path}billingBasis`,
            name: 'billingBasis',
            meta: {
              title: '计费基础管理',
              fatherName: 'cost',
            },
            component: () => import('@/views/Cost/BillingBasis.vue')
          },
          {
            path: `${baseRouter_path}costDetailsQuery`,
            name: 'costDetailsQuery',
            meta: {
              title: '成本费用明细查询',
              fatherName: 'cost',
            },
            component: () => import('@/views/Cost/CostDetailsQuery.vue')
          },
          {
            path: `${baseRouter_path}revenueDetailsQuery`,
            name: 'revenueDetailsQuery',
            meta: {
              title: '收入费用明细查询',
              fatherName: 'cost',
            },
            component: () => import('@/views/Cost/RevenueDetailsQuery.vue')
          },
          {
            path: `${baseRouter_path}workProfitQueryReport`,
            name: 'workProfitQueryReport',
            meta: {
              title: '工作利润查询报表',
              fatherName: 'cost',
            },
            component: () => import('@/views/Cost/WorkProfitQueryReport.vue')
          },
        ]
      },
      {
        path: `${baseRouter_path}receivableManagement`,
        name: 'receivableManagement',
        meta: {
          icon: 'user',
          title: '应收管理',
        },
        component: () => import('@/views/ReceivableManagement/Index.vue'),
        children: [
          {
            path: `${baseRouter_path}bankCardQuery`,
            name: 'bankCardQuery',
            meta: {
              title: '银行卡号查询',
              fatherName: 'receivableManagement',
            },
            component: () => import('@/views/ReceivableManagement/BankCardQuery.vue')
          },
          {
            path: `${baseRouter_path}receivableBills`,
            name: 'receivableBills',
            meta: {
              title: '应收单',
              fatherName: 'receivableManagement',
            },
            component: () => import('@/views/ReceivableManagement/ReceivableBills.vue')
          },
          {
            path: `${baseRouter_path}receipt`,
            name: 'receipt',
            meta: {
              title: '收款单',
              fatherName: 'receivableManagement',
            },
            component: () => import('@/views/ReceivableManagement/Receipt.vue')
          },
          {
            path: `${baseRouter_path}accountsReceivableWriteOff`,
            name: 'accountsReceivableWriteOff',
            meta: {
              title: '应收账款核销',
              fatherName: 'receivableManagement',
            },
            component: () => import('@/views/ReceivableManagement/AccountsReceivableWriteOff.vue')
          },
          {
            path: `${baseRouter_path}accountsReceivableWriteOffBill`,
            name: 'accountsReceivableWriteOffBill',
            meta: {
              title: '应收账款核销单',
              fatherName: 'receivableManagement',
            },
            component: () => import('@/views/ReceivableManagement/AccountsReceivableWriteOffBill.vue')
          },
          {
            path: `${baseRouter_path}invoicesReceivable`,
            name: 'invoicesReceivable',
            meta: {
              title: '应收发票',
              fatherName: 'receivableManagement',
            },
            component: () => import('@/views/ReceivableManagement/InvoicesReceivable.vue')
          },
          {
            path: `${baseRouter_path}invoicingReceivable`,
            name: 'invoicingReceivable',
            meta: {
              title: '应收开票',
              fatherName: 'receivableManagement',
            },
            component: () => import('@/views/ReceivableManagement/InvoicingReceivable.vue')
          },
        ]
      },
      {
        path: `${baseRouter_path}payableManagement`,
        name: 'payableManagement',
        meta: {
          icon: 'user',
          title: '应付管理',
        },
        component: () => import('@/views/PayableManagement/Index.vue'),
        children: [
          {
            path: `${baseRouter_path}reviewCostDetails`,
            name: 'reviewCostDetails',
            meta: {
              title: '成本费用明细审核',
              fatherName: 'payableManagement',
            },
            component: () => import('@/views/PayableManagement/ReviewCostDetails.vue')
          },
          {
            path: `${baseRouter_path}payableBills`,
            name: 'payableBills',
            meta: {
              title: '应付单',
              fatherName: 'payableManagement',
            },
            component: () => import('@/views/PayableManagement/PayableBills.vue')
          },
          {
            path: `${baseRouter_path}receipt`,
            name: 'receipt',
            meta: {
              title: '付款单',
              fatherName: 'payableManagement',
            },
            component: () => import('@/views/PayableManagement/Receipt.vue')
          },
          {
            path: `${baseRouter_path}accountsPayableWriteOff`,
            name: 'accountsPayableWriteOff',
            meta: {
              title: '应付账款核销',
              fatherName: 'payableManagement',
            },
            component: () => import('@/views/PayableManagement/AccountsPayableWriteOff.vue')
          },
          {
            path: `${baseRouter_path}accountsPayableWriteOffBill`,
            name: 'accountsPayableWriteOffBill',
            meta: {
              title: '应付账款核销单',
              fatherName: 'payableManagement',
            },
            component: () => import('@/views/PayableManagement/AccountsPayableWriteOffBill.vue')
          },
          {
            path: `${baseRouter_path}invoicesPayable`,
            name: 'invoicesPayable',
            meta: {
              title: '应付发票',
              fatherName: 'payableManagement',
            },
            component: () => import('@/views/PayableManagement/InvoicesPayable.vue')
          }
        ]
      },
      {
        path: `${baseRouter_path}financialStatements`,
        name: 'financialStatements',
        meta: {
          icon: 'user',
          title: '财务报表',
        },
        component: () => import('@/views/FinancialStatements/Index.vue'),
        children: [
          {
            path: `${baseRouter_path}accountsReceivableStatement`,
            name: 'accountsReceivableStatement',
            meta: {
              title: '应收账款对账单',
              fatherName: 'financialStatements',
            },
            component: () => import('@/views/FinancialStatements/AccountsReceivableStatement.vue')
          },
          {
            path: `${baseRouter_path}receivableSummaryQuery`,
            name: 'receivableSummaryQuery',
            meta: {
              title: '应收汇总查询',
              fatherName: 'financialStatements',
            },
            component: () => import('@/views/FinancialStatements/ReceivableSummaryQuery.vue')
          },
          {
            path: `${baseRouter_path}payableSummaryQuery`,
            name: 'payableSummaryQuery',
            meta: {
              title: '应付汇总查询',
              fatherName: 'financialStatements',
            },
            component: () => import('@/views/FinancialStatements/PayableSummaryQuery.vue')
          },
          {
            path: `${baseRouter_path}grossProfitStatement`,
            name: 'grossProfitStatement',
            meta: {
              title: '毛利表',
              fatherName: 'financialStatements',
            },
            component: () => import('@/views/FinancialStatements/GrossProfitStatement.vue')
          },
        ]
      },
    ]
  }
];
