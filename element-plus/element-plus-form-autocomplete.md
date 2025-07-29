### 13. Autocomplete 自动补全输入框
- **用途**: 自动完成输入
- **特点**: 支持搜索建议、自定义匹配

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearch"
    placeholder="请输入内容"
    class="inline-input w-50"
    @select="handleSelect"
  />

  <!-- 自定义模板 -->
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="请输入内容"
    class="inline-input w-50"
    @select="handleSelect"
  >
    <template #default="{ item }">
      <div class="value">{{ item.value }}</div>
      <span class="link">{{ item.link }}</span>
    </template>
  </el-autocomplete>

  <!-- 远程搜索 -->
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="请输入内容"
    class="inline-input w-50"
    :trigger-on-focus="false"
    @select="handleSelect"
  />

  <!-- 禁用状态 -->
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearch"
    placeholder="请输入内容"
    class="inline-input w-50"
    disabled
  />

  <!-- 可清空 -->
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearch"
    placeholder="请输入内容"
    class="inline-input w-50"
    clearable
  />

  <!-- 不同尺寸 -->
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearch"
    placeholder="请输入内容"
    class="inline-input w-50"
    size="large"
  />
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearch"
    placeholder="请输入内容"
    class="inline-input w-50"
    size="default"
  />
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearch"
    placeholder="请输入内容"
    class="inline-input w-50"
    size="small"
  />
</template>

<script setup>
import { ref, reactive } from 'vue'

const state = ref('')
const restaurants = ref([
  { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
  { value: 'Hot honey 首尔炸鸡（仙霞路）', address: '上海市长宁区淞虹路661号' },
  { value: '新旺角茶餐厅', address: '上海市普陀区真北路988号创邑金沙谷6号楼113' },
  { value: '泷千家(天山西路店)', address: '天山西路438号' },
  { value: '胖仙女纸杯蛋糕（上海凌空店）', address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
  { value: '贡茶', address: '上海市长宁区金钟路633号' },
  { value: '豪大大香鸡排超级奶爸店', address: '上海市嘉定区曹安公路曹安路4805号' },
  { value: '茶芝兰（奶茶，手抓饼）', address: '上海市普陀区同普路1435号' },
  { value: '十二泷町', address: '上海市北翟路1444弄81号B幢-107' },
  { value: '星移浓缩咖啡', address: '上海市嘉定区新郁路817号' },
  { value: '阿姨奶茶/豪大大', address: '嘉定区曹安路1611号' },
  { value: '新麦甜四季甜品炸鸡', address: '嘉定区曹安公路2383弄55号' },
  { value: 'Monica摩托主题咖啡店', address: '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F' },
  { value: '浮生若茶（凌空soho店）', address: '上海长宁区金钟路968号9号楼地下一层' },
  { value: 'NONO JUICE  鲜榨果汁', address: '上海市长宁区天山西路119号' },
  { value: 'CoCo都可(北新泾店）', address: '上海市长宁区仙霞西路' },
  { value: '快乐柠檬（神州智慧店）', address: '上海市长宁区天山西路567号1层R117号店铺' },
  { value: 'Merci Paul cafe', address: '上海市普陀区光复西路丹巴路28弄6号楼819' },
  { value: '猫山王（西郊百联店）', address: '上海市长宁区仙霞西路88号第一层G05-F01-1-306' },
  { value: '枪会山', address: '上海市普陀区棕榈路' },
  { value: '纵食', address: '元丰天山花园(东门) 上海市长宁区天山西路568' },
  { value: '钱记', address: '上海市长宁区天山西路' },
  { value: '壹杯加', address: '上海市长宁区通协路' },
  { value: '唦哇嘀咖', address: '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元' },
  { value: '爱茜茜里(西郊百联)', address: '长宁区仙霞西路88号1305室' },
  { value: '爱茜茜里(近铁广场)', address: '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺' },
  { value: '鲜果榨汁（金沙江路和美广店）', address: '普陀区金沙江路2239号金沙和美广场B1-10-6' },
  { value: '开心丽果（缤谷店）', address: '上海市长宁区威宁路天山路341号' },
  { value: '超级鸡车（丰庄路店）', address: '上海市嘉定区丰庄路240号' },
  { value: '妙生活果园（金沙江路和美广店）', address: '普陀区金沙江路2239号金沙和美广场B1-10-3' },
  { value: '香宜度麻辣香锅', address: '长宁区淞虹路148号' },
  { value: '凡仔汉堡（老真北路店）', address: '上海市普陀区老真北路160号' },
  { value: '港式小铺', address: '上海市长宁区金钟路968号15楼15-105室' },
  { value: '蜀香源麻辣香锅（剑河路店）', address: '剑河路443-1' },
  { value: '北京饺子馆', address: '长宁区北新泾街道天山西路490-1号' },
  { value: '饭典*新简餐（凌空SOHO店）', address: '上海市长宁区金钟路968号9号楼地下一层9-83室' },
  { value: '焦耳·川式快餐（金钟路店）', address: '上海市金钟路633号地下一层甲部' },
  { value: '动力鸡车', address: '长宁区仙霞西路299弄3号101B' },
  { value: '浏阳蒸菜', address: '天山西路430号' },
  { value: '四海游龙（天山西路店）', address: '上海市长宁区天山西路' },
  { value: '樱花食堂（凌空店）', address: '上海市长宁区金钟路968号15楼15-105室' },
  { value: '壹分米客家传统调制米粉(天山店)', address: '天山西路428号' },
  { value: '福荣祥烧腊（平溪路店）', address: '上海市长宁区协和路福泉路255弄57-73号' },
  { value: '速记黄焖鸡米饭', address: '上海市长宁区北新泾街道金钟路180号1层01号摊位' },
  { value: '红辣椒麻辣烫', address: '上海市长宁区天山西路492号' },
  { value: '(小杨生煎) 西郊百联餐厅', address: '长宁区仙霞西路88号百联2楼' },
  { value: '阳阳麻辣烫', address: '天山西路389号' },
  { value: '南拳妈妈龙虾盖浇饭', address: '普陀区金沙江路1699号鑫乐惠美食广场A13' }
])

const querySearch = (queryString, cb) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  // 调用 callback 返回建议列表的数据
  cb(results)
}

const querySearchAsync = (queryString, cb) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value

  clearTimeout(timeout)
  timeout = setTimeout(() => {
    cb(results)
  }, 3000 * Math.random())
}

const createFilter = (queryString) => {
  return (restaurant) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

const handleSelect = (item) => {
  console.log(item)
}

let timeout
</script>

<style scoped>
.inline-input {
  width: 200px;
  margin-right: 10px;
}

.value {
  flex: 1;
  text-overflow: ellipsis;
  overflow: hidden;
}

.link {
  font-size: 12px;
  color: #b4b4b4;
}
</style>

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | string | — | — |
| placeholder | 输入框占位文本 | string | — | — |
| clearable | 是否可清空 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| value-key | 输入建议对象中用于显示的键名 | string | — | value |
| debounce | 获取输入建议的去抖延时 | number | — | 300 |
| placement | 菜单弹出位置 | string | top / top-start / top-end / bottom / bottom-start / bottom-end | bottom-start |
| fetch-suggestions | 获取输入建议的方法， 仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它 | function(queryString, callback) | — | — |
| popper-class | 下拉列表的类名 | string | — | — |
| trigger-on-focus | 是否在输入框 focus 时显示建议列表 | boolean | — | true |
| name | 原生属性 | string | — | — |
| select-when-unmatched | 在输入没有任何匹配建议的情况下，按下回车是否触发 select 事件 | boolean | — | false |
| label | 为屏幕阅读器准备的标签 | string | — | — |
| prefix-icon | 输入框头部图标 | string / Component | — | — |
| suffix-icon | 输入框尾部图标 | string / Component | — | — |
| hide-loading | 是否隐藏加载图标 | boolean | — | false |
| popper-append-to-body | 是否将下拉列表插入至 body 元素。在下拉列表的定位出现问题时，可将该属性设置为 false | boolean | — | true |
| highlight-first-item | 是否默认突出显示远程搜索建议中的第一项 | boolean | — | false |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| select | 点击选中建议项时触发 | 选中建议项 |
| change | 在 Input 值改变时触发 | (value: string \| number) |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| default | 自定义输入建议，参数为 { item } |
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |

#### 使用场景
1. **搜索建议**: 根据用户输入提供搜索建议
2. **地址选择**: 城市、地址等选择
3. **标签输入**: 支持自动补全的标签输入
4. **表单验证**: 限制用户输入范围
5. **数据筛选**: 从大量数据中快速筛选
6. **用户体验**: 提升用户输入效率 