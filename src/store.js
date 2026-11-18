import { reactive, watch } from 'vue'

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const seedUsers = [
  { id: 1, name: '林小满', level: '黄金会员', phone: '138****2048', city: '杭州', joined: '2026-01-12', status: 'active', spend: 12880 },
  { id: 2, name: '陈一诺', level: '白银会员', phone: '139****7712', city: '上海', joined: '2026-02-03', status: 'active', spend: 6420 },
  { id: 3, name: '苏晚晴', level: '钻石会员', phone: '137****0091', city: '成都', joined: '2025-11-28', status: 'active', spend: 30560 },
  { id: 4, name: '周慕白', level: '普通会员', phone: '186****3320', city: '北京', joined: '2026-03-19', status: 'disabled', spend: 890 },
  { id: 5, name: '赵元气', level: '黄金会员', phone: '135****5528', city: '广州', joined: '2026-01-30', status: 'active', spend: 15230 },
  { id: 6, name: '许知夏', level: '白银会员', phone: '188****4167', city: '南京', joined: '2026-04-08', status: 'active', spend: 3980 }
]

const seedGoods = [
  { id: 1001, name: '云感蓝牙耳机 Pro', category: '数码', price: 299, stock: 128, sold: 862, tag: '热卖' },
  { id: 1002, name: '纯棉宽松短袖', category: '服饰', price: 89, stock: 46, sold: 1340, tag: '' },
  { id: 1003, name: '每日坚果礼盒', category: '食品', price: 138, stock: 210, sold: 521, tag: '新品' },
  { id: 1004, name: '机械键盘 87 键', category: '数码', price: 349, stock: 18, sold: 407, tag: '' },
  { id: 1005, name: '北欧香薰蜡烛', category: '家居', price: 79, stock: 96, sold: 733, tag: '' },
  { id: 1006, name: '轻量保温水杯', category: '家居', price: 119, stock: 7, sold: 288, tag: '补货' }
]

const seedOrders = [
  { id: 'DD20260601', customer: '林小满', goods: '云感蓝牙耳机 Pro', amount: 299, status: 'pending' },
  { id: 'DD20260602', customer: '陈一诺', goods: '机械键盘 87 键', amount: 349, status: 'paid' },
  { id: 'DD20260603', customer: '苏晚晴', goods: '每日坚果礼盒', amount: 276, status: 'shipped' },
  { id: 'DD20260604', customer: '许知夏', goods: '北欧香薰蜡烛', amount: 158, status: 'pending' },
  { id: 'DD20260605', customer: '赵元气', goods: '轻量保温水杯', amount: 238, status: 'done' }
]

const seedRights = [
  { id: 1, name: '查看数据看板', role: '管理员', desc: '访问经营概览与统计图表', enabled: true },
  { id: 2, name: '用户管理', role: '管理员', desc: '增删改查平台用户', enabled: true },
  { id: 3, name: '商品上架 / 编辑', role: '运营', desc: '维护商品与库存', enabled: true },
  { id: 4, name: '订单处理', role: '运营', desc: '确认收款与发货', enabled: true },
  { id: 5, name: '导出报表', role: '财务', desc: '下载经营数据报表', enabled: false },
  { id: 6, name: '系统设置', role: '管理员', desc: '修改站点基础参数', enabled: false }
]

export const store = reactive({
  users: read('nd_users', seedUsers),
  goods: read('nd_goods', seedGoods),
  orders: read('nd_orders', seedOrders),
  rights: read('nd_rights', seedRights),
  settings: read('nd_settings', {
    siteName: '奶娃商城', phone: '400-888-6666', pageSize: 10,
    openRegister: true, currency: '¥'
  }),
  dark: read('nd_dark', false),
  activities: [
    { text: '苏晚晴 下单了 每日坚果礼盒', time: '2 分钟前', type: 'order' },
    { text: '商品「轻量保温水杯」库存偏低', time: '18 分钟前', type: 'warn' },
    { text: '新用户 许知夏 完成注册', time: '1 小时前', type: 'user' },
    { text: '订单 DD20260603 已发货', time: '3 小时前', type: 'order' }
  ]
})

watch(() => store.users, v => localStorage.setItem('nd_users', JSON.stringify(v)), { deep: true })
watch(() => store.goods, v => localStorage.setItem('nd_goods', JSON.stringify(v)), { deep: true })
watch(() => store.orders, v => localStorage.setItem('nd_orders', JSON.stringify(v)), { deep: true })
watch(() => store.rights, v => localStorage.setItem('nd_rights', JSON.stringify(v)), { deep: true })
watch(() => store.settings, v => localStorage.setItem('nd_settings', JSON.stringify(v)), { deep: true })
watch(() => store.dark, v => {
  localStorage.setItem('nd_dark', JSON.stringify(v))
  document.body.classList.toggle('dark', v)
})

export const nextId = list => (list.length ? Math.max(...list.map(i => Number(i.id))) : 1000) + 1

export const statusMeta = {
  pending: { label: '待付款', cls: 's-pending' },
  paid: { label: '已付款', cls: 's-paid' },
  shipped: { label: '已发货', cls: 's-shipped' },
  done: { label: '已完成', cls: 's-done' }
}

export const money = n => `${store.settings.currency || '¥'}${Number(n).toLocaleString('zh-CN')}`
