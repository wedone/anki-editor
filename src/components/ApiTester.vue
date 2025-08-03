<template>
  <div class="api-tester">
    <el-card>
      <template #header>
        <div class="card-header">
          <el-icon><Connection /></el-icon>
          <span>AnkiConnect API 测试工具</span>
        </div>
      </template>
      
      <!-- 连接状态 -->
      <div class="connection-status">
        <el-alert
          :title="connectionStatus.connected ? '已连接到 AnkiConnect' : '未连接到 AnkiConnect'"
          :type="connectionStatus.connected ? 'success' : 'error'"
          :description="connectionStatus.error || '请确保 Anki 已启动并安装了 AnkiConnect 插件'"
          show-icon
          :closable="false"
        />
        <div class="connection-actions">
          <el-button 
            size="small" 
            @click="checkConnectionStatus"
            :loading="checkingConnection"
          >
            <el-icon><Refresh /></el-icon>
            重新检查连接
          </el-button>
          <el-button 
            size="small" 
            type="info"
            @click="showConnectionHelp"
          >
            <el-icon><QuestionFilled /></el-icon>
            连接帮助
          </el-button>
        </div>
      </div>
      
      <!-- API 测试区域 -->
      <div class="api-test-area">
        <el-row :gutter="20">
          <!-- 左侧：API 选择 -->
          <el-col :span="8">
            <div class="api-selector">
              <h3>选择 API 方法</h3>
              <el-select 
                v-model="selectedApi" 
                placeholder="选择要测试的 API"
                style="width: 100%"
                @change="onApiChange"
              >
                <el-option
                  v-for="api in apiList"
                  :key="api.action"
                  :label="api.label"
                  :value="api.action"
                />
              </el-select>
              
              <div v-if="selectedApiInfo" class="api-info">
                <h4>{{ selectedApiInfo.label }}</h4>
                <p>{{ selectedApiInfo.description }}</p>
                <el-tag size="small" type="info">{{ selectedApiInfo.action }}</el-tag>
              </div>
              
              <!-- 预设测试用例 -->
              <div class="preset-tests">
                <h4>快速测试</h4>
                <el-button 
                  v-for="preset in presetTests" 
                  :key="preset.name"
                  size="small"
                  type="info"
                  @click="loadPreset(preset)"
                  style="margin: 4px"
                >
                  {{ preset.name }}
                </el-button>
              </div>
            </div>
          </el-col>
          
          <!-- 右侧：参数配置 -->
          <el-col :span="16">
            <div class="parameter-config">
              <h3>参数配置</h3>
              <div v-if="selectedApiInfo && selectedApiInfo.parameters" class="params-form">
                <el-form :model="requestParams" label-width="120px">
                  <el-form-item 
                    v-for="param in selectedApiInfo.parameters" 
                    :key="param.name"
                    :label="param.name"
                  >
                    <el-input
                      v-if="param.type === 'string'"
                      v-model="requestParams[param.name]"
                      :placeholder="param.description"
                    />
                    <el-input-number
                      v-else-if="param.type === 'number'"
                      v-model="requestParams[param.name]"
                      :placeholder="param.description"
                    />
                    <el-select
                      v-else-if="param.type === 'select'"
                      v-model="requestParams[param.name]"
                      :placeholder="param.description"
                    >
                      <el-option
                        v-for="option in param.options"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      />
                    </el-select>
                    <el-input
                      v-else
                      v-model="requestParams[param.name]"
                      type="textarea"
                      :rows="3"
                      :placeholder="param.description"
                    />
                  </el-form-item>
                </el-form>
              </div>
              
              <div class="action-buttons">
                <el-button 
                  type="primary" 
                  @click="sendRequest"
                  :loading="loading"
                  :disabled="!selectedApi"
                >
                  <el-icon><Right /></el-icon>
                  发送请求
                </el-button>
                <el-button @click="clearResponse">
                  <el-icon><Delete /></el-icon>
                  清除响应
                </el-button>
                <el-button 
                  type="success" 
                  @click="showBatchTest"
                  :disabled="!connectionStatus.connected"
                >
                  <el-icon><Document /></el-icon>
                  批量测试
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      
      <!-- 请求和响应显示 -->
      <div v-if="requestData || responseData" class="data-display">
        <el-row :gutter="20">
          <!-- 请求数据 -->
          <el-col :span="12">
            <div class="data-panel">
              <h3>请求数据</h3>
              <el-input
                v-model="requestData"
                type="textarea"
                :rows="10"
                readonly
                placeholder="请求数据将在这里显示..."
              />
            </div>
          </el-col>
          
          <!-- 响应数据 -->
          <el-col :span="12">
            <div class="data-panel">
              <h3>响应数据</h3>
              <el-input
                v-model="responseData"
                type="textarea"
                :rows="10"
                readonly
                placeholder="响应数据将在这里显示..."
              />
            </div>
          </el-col>
        </el-row>
      </div>
      
      <!-- 历史记录 -->
      <div v-if="history.length > 0" class="history-section">
        <h3>测试历史</h3>
        <el-table :data="history" style="width: 100%">
          <el-table-column prop="timestamp" label="时间" width="180">
            <template #default="scope">
              {{ new Date(scope.row.timestamp).toLocaleString() }}
            </template>
          </el-table-column>
          <el-table-column prop="action" label="API" width="150" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.status === 'success' ? 'success' : 'danger'">
                {{ scope.row.status === 'success' ? '成功' : '失败' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="message" label="消息" />
          <el-table-column label="操作" width="120">
            <template #default="scope">
              <el-button 
                size="small" 
                @click="loadHistoryItem(scope.row)"
              >
                重新加载
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { 
  Connection, 
  Right, 
  Delete, 
  Refresh, 
  QuestionFilled, 
  Document
} from '@element-plus/icons-vue'
import { checkConnection } from '../services/ankiConnect/index.js'

export default {
  name: 'ApiTester',
  components: {
    Connection,
    Right,
    Delete,
    Refresh,
    QuestionFilled,
    Document
  },
  setup() {
    const connectionStatus = reactive({
      connected: false,
      error: null,
      version: null
    })
    
    const selectedApi = ref('')
    const requestParams = reactive({})
    const loading = ref(false)
    const requestData = ref('')
    const responseData = ref('')
    const history = ref([])
    const checkingConnection = ref(false)

    // API 列表定义 - 基于 AnkiConnect 官方文档
    const apiList = [
      // 基础操作
      {
        action: 'version',
        label: '获取版本',
        description: '获取 AnkiConnect 版本信息',
        parameters: []
      },
      {
        action: 'sync',
        label: '同步',
        description: '同步 Anki 集合',
        parameters: []
      },
      
      // 牌组操作
      {
        action: 'deckNames',
        label: '获取牌组列表',
        description: '获取所有牌组名称',
        parameters: []
      },
      {
        action: 'getDeckConfig',
        label: '获取牌组配置',
        description: '获取指定牌组的配置信息',
        parameters: [
          {
            name: 'deck',
            type: 'string',
            description: '牌组名称'
          }
        ]
      },
      {
        action: 'setDeckConfigId',
        label: '设置牌组配置ID',
        description: '设置指定牌组的配置ID',
        parameters: [
          {
            name: 'deck',
            type: 'string',
            description: '牌组名称'
          },
          {
            name: 'configId',
            type: 'number',
            description: '配置ID'
          }
        ]
      },
      {
        action: 'cloneDeckConfigId',
        label: '克隆牌组配置',
        description: '克隆牌组配置并返回新的配置ID',
        parameters: [
          {
            name: 'name',
            type: 'string',
            description: '新配置名称'
          }
        ]
      },
      {
        action: 'removeDeckConfigId',
        label: '删除牌组配置',
        description: '删除指定的牌组配置',
        parameters: [
          {
            name: 'configId',
            type: 'number',
            description: '配置ID'
          }
        ]
      },
      {
        action: 'setDeckConfig',
        label: '设置牌组配置',
        description: '设置牌组配置',
        parameters: [
          {
            name: 'config',
            type: 'textarea',
            description: '配置对象，JSON格式'
          }
        ]
      },
      {
        action: 'getDeckConfig',
        label: '获取牌组配置',
        description: '获取牌组配置',
        parameters: [
          {
            name: 'configId',
            type: 'number',
            description: '配置ID'
          }
        ]
      },
      {
        action: 'createDeck',
        label: '创建牌组',
        description: '创建新的牌组',
        parameters: [
          {
            name: 'deck',
            type: 'string',
            description: '牌组名称'
          }
        ]
      },
      {
        action: 'deleteDecks',
        label: '删除牌组',
        description: '删除指定的牌组',
        parameters: [
          {
            name: 'decks',
            type: 'textarea',
            description: '牌组名称数组，JSON格式'
          },
          {
            name: 'cardsToo',
            type: 'select',
            description: '是否同时删除牌组中的卡片',
            options: [
              { label: '是', value: true },
              { label: '否', value: false }
            ]
          }
        ]
      },
      {
        action: 'getDeckNames',
        label: '获取牌组名称',
        description: '获取牌组名称（包含子牌组）',
        parameters: [
          {
            name: 'includeSubdecks',
            type: 'select',
            description: '是否包含子牌组',
            options: [
              { label: '是', value: true },
              { label: '否', value: false }
            ]
          }
        ]
      },
      {
        action: 'getDeckStudyInfo',
        label: '获取牌组学习信息',
        description: '获取牌组的学习信息',
        parameters: [
          {
            name: 'deck',
            type: 'string',
            description: '牌组名称'
          }
        ]
      },
      
      // 卡片操作
      {
        action: 'findCards',
        label: '查找卡片',
        description: '根据查询条件查找卡片',
        parameters: [
          {
            name: 'query',
            type: 'string',
            description: '查询条件，例如：deck:"英语词汇"'
          }
        ]
      },
      {
        action: 'cardsInfo',
        label: '获取卡片信息',
        description: '获取指定卡片的详细信息',
        parameters: [
          {
            name: 'cards',
            type: 'textarea',
            description: '卡片ID数组，JSON格式'
          }
        ]
      },
      {
        action: 'cardsToNotes',
        label: '卡片转笔记',
        description: '将卡片ID转换为笔记ID',
        parameters: [
          {
            name: 'cards',
            type: 'textarea',
            description: '卡片ID数组，JSON格式'
          }
        ]
      },
      {
        action: 'addNote',
        label: '添加笔记',
        description: '添加新的笔记',
        parameters: [
          {
            name: 'note',
            type: 'textarea',
            description: '笔记对象，JSON格式'
          }
        ]
      },
      {
        action: 'canAddNotes',
        label: '检查是否可以添加笔记',
        description: '检查是否可以添加指定的笔记',
        parameters: [
          {
            name: 'notes',
            type: 'textarea',
            description: '笔记对象数组，JSON格式'
          }
        ]
      },
      {
        action: 'updateNoteFields',
        label: '更新笔记字段',
        description: '更新指定笔记的字段内容',
        parameters: [
          {
            name: 'note',
            type: 'textarea',
            description: '笔记对象，JSON格式'
          }
        ]
      },
      {
        action: 'updateNote',
        label: '更新笔记',
        description: '更新笔记（包括字段和标签）',
        parameters: [
          {
            name: 'note',
            type: 'textarea',
            description: '笔记对象，JSON格式'
          }
        ]
      },
      {
        action: 'addTags',
        label: '添加标签',
        description: '为笔记添加标签',
        parameters: [
          {
            name: 'notes',
            type: 'textarea',
            description: '笔记ID数组，JSON格式'
          },
          {
            name: 'tags',
            type: 'string',
            description: '标签名称'
          }
        ]
      },
      {
        action: 'removeTags',
        label: '移除标签',
        description: '从笔记中移除标签',
        parameters: [
          {
            name: 'notes',
            type: 'textarea',
            description: '笔记ID数组，JSON格式'
          },
          {
            name: 'tags',
            type: 'string',
            description: '标签名称'
          }
        ]
      },
      {
        action: 'getTags',
        label: '获取标签',
        description: '获取所有标签',
        parameters: []
      },
      {
        action: 'clearUnusedTags',
        label: '清理未使用标签',
        description: '清理未使用的标签',
        parameters: []
      },
      {
        action: 'replaceTags',
        label: '替换标签',
        description: '替换笔记中的标签',
        parameters: [
          {
            name: 'notes',
            type: 'textarea',
            description: '笔记ID数组，JSON格式'
          },
          {
            name: 'tag_to_replace',
            type: 'string',
            description: '要替换的标签'
          },
          {
            name: 'replace_with_tag',
            type: 'string',
            description: '替换后的标签'
          }
        ]
      },
      {
        action: 'replaceTagsInAllNotes',
        label: '替换所有笔记中的标签',
        description: '替换所有笔记中的标签',
        parameters: [
          {
            name: 'tag_to_replace',
            type: 'string',
            description: '要替换的标签'
          },
          {
            name: 'replace_with_tag',
            type: 'string',
            description: '替换后的标签'
          }
        ]
      },
      {
        action: 'findNotes',
        label: '查找笔记',
        description: '根据查询条件查找笔记',
        parameters: [
          {
            name: 'query',
            type: 'string',
            description: '查询条件'
          }
        ]
      },
      {
        action: 'notesInfo',
        label: '获取笔记信息',
        description: '获取指定笔记的详细信息',
        parameters: [
          {
            name: 'notes',
            type: 'textarea',
            description: '笔记ID数组，JSON格式'
          }
        ]
      },
      {
        action: 'notesModTime',
        label: '获取笔记修改时间',
        description: '获取笔记的修改时间',
        parameters: [
          {
            name: 'notes',
            type: 'textarea',
            description: '笔记ID数组，JSON格式'
          }
        ]
      },
      {
        action: 'deleteNotes',
        label: '删除笔记',
        description: '删除指定的笔记',
        parameters: [
          {
            name: 'notes',
            type: 'textarea',
            description: '笔记ID数组，JSON格式'
          }
        ]
      },
      {
        action: 'removeEmptyNotes',
        label: '移除空笔记',
        description: '移除所有空笔记',
        parameters: []
      },
      
      // 模型操作
      {
        action: 'getModelNames',
        label: '获取模型名称',
        description: '获取所有笔记类型名称',
        parameters: []
      },
      {
        action: 'getModelFieldNames',
        label: '获取模型字段',
        description: '获取指定笔记类型的字段名称',
        parameters: [
          {
            name: 'modelName',
            type: 'string',
            description: '笔记类型名称'
          }
        ]
      },
      {
        action: 'getModelFieldTypes',
        label: '获取模型字段类型',
        description: '获取指定笔记类型的字段类型',
        parameters: [
          {
            name: 'modelName',
            type: 'string',
            description: '笔记类型名称'
          }
        ]
      },
      {
        action: 'getModelStyling',
        label: '获取模型样式',
        description: '获取指定笔记类型的样式',
        parameters: [
          {
            name: 'modelName',
            type: 'string',
            description: '笔记类型名称'
          }
        ]
      },
      {
        action: 'getModelTemplates',
        label: '获取模型模板',
        description: '获取指定笔记类型的模板',
        parameters: [
          {
            name: 'modelName',
            type: 'string',
            description: '笔记类型名称'
          }
        ]
      },
      {
        action: 'createModel',
        label: '创建模型',
        description: '创建新的笔记类型',
        parameters: [
          {
            name: 'modelName',
            type: 'string',
            description: '模型名称'
          },
          {
            name: 'inOrderFields',
            type: 'textarea',
            description: '字段名称数组，JSON格式'
          },
          {
            name: 'css',
            type: 'string',
            description: 'CSS样式'
          },
          {
            name: 'cardTemplates',
            type: 'textarea',
            description: '卡片模板数组，JSON格式'
          }
        ]
      },
      {
        action: 'updateModelTemplates',
        label: '更新模型模板',
        description: '更新笔记类型的模板',
        parameters: [
          {
            name: 'model',
            type: 'textarea',
            description: '模型对象，JSON格式'
          }
        ]
      },
      {
        action: 'updateModelStyling',
        label: '更新模型样式',
        description: '更新笔记类型的样式',
        parameters: [
          {
            name: 'model',
            type: 'textarea',
            description: '模型对象，JSON格式'
          }
        ]
      },
      {
        action: 'updateModelFields',
        label: '更新模型字段',
        description: '更新笔记类型的字段',
        parameters: [
          {
            name: 'model',
            type: 'textarea',
            description: '模型对象，JSON格式'
          }
        ]
      },
      {
        action: 'updateModel',
        label: '更新模型',
        description: '更新笔记类型',
        parameters: [
          {
            name: 'model',
            type: 'textarea',
            description: '模型对象，JSON格式'
          }
        ]
      },
      {
        action: 'deleteModel',
        label: '删除模型',
        description: '删除笔记类型',
        parameters: [
          {
            name: 'modelName',
            type: 'string',
            description: '模型名称'
          }
        ]
      },
      
      // 统计操作
      {
        action: 'getNumCardsReviewedToday',
        label: '获取今日复习卡片数',
        description: '获取今日复习的卡片数量',
        parameters: []
      },
      {
        action: 'getNumCardsReviewedByDay',
        label: '获取每日复习卡片数',
        description: '获取每日复习的卡片数量',
        parameters: []
      },
      {
        action: 'getCollectionStatsHTML',
        label: '获取集合统计HTML',
        description: '获取集合统计的HTML报告',
        parameters: [
          {
            name: 'wholeCollection',
            type: 'select',
            description: '是否包含整个集合',
            options: [
              { label: '是', value: true },
              { label: '否', value: false }
            ]
          }
        ]
      },
      {
        action: 'cardReviews',
        label: '获取卡片复习记录',
        description: '获取指定牌组的卡片复习记录',
        parameters: [
          {
            name: 'deck',
            type: 'string',
            description: '牌组名称'
          },
          {
            name: 'startID',
            type: 'number',
            description: '开始时间戳'
          }
        ]
      },
      {
        action: 'getReviewsOfCards',
        label: '获取卡片复习详情',
        description: '获取指定卡片的复习详情',
        parameters: [
          {
            name: 'cards',
            type: 'textarea',
            description: '卡片ID数组，JSON格式'
          }
        ]
      },
      {
        action: 'getLatestReviewID',
        label: '获取最新复习ID',
        description: '获取指定牌组的最新复习ID',
        parameters: [
          {
            name: 'deck',
            type: 'string',
            description: '牌组名称'
          }
        ]
      },
      {
        action: 'insertReviews',
        label: '插入复习记录',
        description: '插入复习记录到数据库',
        parameters: [
          {
            name: 'reviews',
            type: 'textarea',
            description: '复习记录数组，JSON格式'
          }
        ]
      },
      
      // 媒体操作
      {
        action: 'storeMediaFile',
        label: '存储媒体文件',
        description: '存储媒体文件',
        parameters: [
          {
            name: 'filename',
            type: 'string',
            description: '文件名'
          },
          {
            name: 'data',
            type: 'string',
            description: '文件数据（base64编码）'
          }
        ]
      },
      {
        action: 'retrieveMediaFile',
        label: '获取媒体文件',
        description: '获取媒体文件',
        parameters: [
          {
            name: 'filename',
            type: 'string',
            description: '文件名'
          }
        ]
      },
      {
        action: 'deleteMediaFile',
        label: '删除媒体文件',
        description: '删除媒体文件',
        parameters: [
          {
            name: 'filename',
            type: 'string',
            description: '文件名'
          }
        ]
      },
      
      // 其他操作
      {
        action: 'getCollectionStats',
        label: '获取集合统计',
        description: '获取整个集合的统计信息',
        parameters: []
      },
      {
        action: 'exportPackage',
        label: '导出包',
        description: '导出指定牌组为 Anki 包文件',
        parameters: [
          {
            name: 'deck',
            type: 'string',
            description: '牌组名称'
          },
          {
            name: 'path',
            type: 'string',
            description: '导出文件路径'
          },
          {
            name: 'includeSched',
            type: 'select',
            description: '是否包含学习进度',
            options: [
              { label: '是', value: true },
              { label: '否', value: false }
            ]
          }
        ]
      },
      {
        action: 'importPackage',
        label: '导入包',
        description: '导入 Anki 包文件',
        parameters: [
          {
            name: 'path',
            type: 'string',
            description: '包文件路径'
          }
        ]
      },
      {
        action: 'reloadCollection',
        label: '重新加载集合',
        description: '重新加载 Anki 集合',
        parameters: []
      }
    ]

    // 预设测试用例 - 基于常用场景
    const presetTests = [
      // 基础连接测试
      { name: '获取版本', action: 'version', params: {} },
      { name: '同步集合', action: 'sync', params: {} },
      
      // 牌组管理测试
      { name: '获取牌组列表', action: 'deckNames', params: {} },
      { name: '获取牌组名称', action: 'getDeckNames', params: { includeSubdecks: true } },
      
      // 模型管理测试
      { name: '获取模型名称', action: 'getModelNames', params: {} },
      
      // 统计信息测试
      { name: '获取集合统计', action: 'getCollectionStats', params: {} },
      { name: '获取今日复习数', action: 'getNumCardsReviewedToday', params: {} },
      { name: '获取每日复习数', action: 'getNumCardsReviewedByDay', params: {} },
      
      // 标签管理测试
      { name: '获取所有标签', action: 'getTags', params: {} },
      { name: '清理未使用标签', action: 'clearUnusedTags', params: {} },
      
      // 笔记管理测试
      { name: '移除空笔记', action: 'removeEmptyNotes', params: {} }
    ]

    // 当前选中的API信息
    const selectedApiInfo = computed(() => {
      return apiList.find(api => api.action === selectedApi.value)
    })

    // 检查连接状态
    const checkConnectionStatus = async () => {
      checkingConnection.value = true
      try {
        const result = await checkConnection()
        connectionStatus.connected = result.connected
        connectionStatus.error = result.error
        connectionStatus.version = result.version
      } catch (error) {
        connectionStatus.connected = false
        connectionStatus.error = error.message
      } finally {
        checkingConnection.value = false
      }
    }

    // API 选择变化
    const onApiChange = () => {
      // 清空参数
      Object.keys(requestParams).forEach(key => {
        delete requestParams[key]
      })
      
      // 设置默认参数
      if (selectedApiInfo.value && selectedApiInfo.value.parameters) {
        selectedApiInfo.value.parameters.forEach(param => {
          requestParams[param.name] = ''
        })
      }
    }

    // 发送请求
    const sendRequest = async () => {
      if (!selectedApi.value) {
        ElMessage.warning('请先选择要测试的 API')
        return
      }

      if (!connectionStatus.connected) {
        ElMessage.error('未连接到 AnkiConnect')
        return
      }

      try {
        loading.value = true
        
        // 构建请求数据
        const request = {
          action: selectedApi.value,
          version: 6,
          params: { ...requestParams }
        }
        
        // 显示请求数据
        requestData.value = JSON.stringify(request, null, 2)
        
        // 发送请求
        const response = await fetch('http://localhost:8765', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request)
        })

        const result = await response.json()
        
        // 显示响应数据
        responseData.value = JSON.stringify(result, null, 2)
        
        // 添加到历史记录
        const historyItem = {
          timestamp: Date.now(),
          action: selectedApi.value,
          status: result.error ? 'error' : 'success',
          message: result.error || '请求成功',
          request: request,
          response: result
        }
        
        history.value.unshift(historyItem)
        
        if (result.error) {
          ElMessage.error(`API 调用失败: ${result.error}`)
        } else {
          ElMessage.success('API 调用成功')
        }
        
      } catch (error) {
        console.error('API 调用失败:', error)
        responseData.value = JSON.stringify({
          error: error.message,
          stack: error.stack
        }, null, 2)
        
        ElMessage.error(`请求失败: ${error.message}`)
        
        // 添加到历史记录
        const historyItem = {
          timestamp: Date.now(),
          action: selectedApi.value,
          status: 'error',
          message: error.message,
          request: requestData.value,
          response: { error: error.message }
        }
        
        history.value.unshift(historyItem)
      } finally {
        loading.value = false
      }
    }

    // 清除响应
    const clearResponse = () => {
      requestData.value = ''
      responseData.value = ''
    }

    // 加载历史记录项
    const loadHistoryItem = (item) => {
      selectedApi.value = item.action
      onApiChange()
      
      if (item.request && typeof item.request === 'object') {
        Object.assign(requestParams, item.request.params || {})
      }
      
      requestData.value = JSON.stringify(item.request, null, 2)
      responseData.value = JSON.stringify(item.response, null, 2)
      
      ElMessage.success('已加载历史记录项')
    }

    // 加载预设测试用例
    const loadPreset = (preset) => {
      selectedApi.value = preset.action
      onApiChange()
      
      if (preset.params) {
        Object.assign(requestParams, preset.params)
      }
      
      requestData.value = JSON.stringify({
        action: preset.action,
        version: 6,
        params: preset.params
      }, null, 2)
      responseData.value = '' // 预设测试用例没有响应数据，清空
      
      ElMessage.success(`已加载预设测试用例: ${preset.name}`)
    }

    // 显示连接帮助
    const showConnectionHelp = () => {
      ElMessage.info('请确保 Anki 已启动并安装了 AnkiConnect 插件。\n' +
                      '插件版本至少为 20230220 或更高。\n' +
                      '插件地址：https://github.com/FooSoft/anki-connect/releases')
    }

    // 显示批量测试对话框
    const showBatchTest = () => {
      ElMessage.info('批量测试功能开发中...')
    }

    onMounted(() => {
      checkConnectionStatus()
    })

    return {
      connectionStatus,
      selectedApi,
      selectedApiInfo,
      requestParams,
      loading,
      requestData,
      responseData,
      history,
      apiList,
      onApiChange,
      sendRequest,
      clearResponse,
      loadHistoryItem,
      presetTests,
      loadPreset,
      checkingConnection,
      showConnectionHelp,
      showBatchTest
    }
  }
}
</script>

<style scoped>
.api-tester {
  padding: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
}

.connection-status {
  margin-bottom: 20px;
}

.connection-actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.api-test-area {
  margin-bottom: 20px;
}

.api-selector h3,
.parameter-config h3 {
  margin: 0 0 16px 0;
  color: #303133;
}

.api-info {
  margin-top: 16px;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e4e7ed;
}

.api-info h4 {
  margin: 0 0 8px 0;
  color: #409EFF;
}

.api-info p {
  margin: 0 0 8px 0;
  color: #606266;
  font-size: 14px;
}

.params-form {
  margin-bottom: 16px;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.preset-tests {
  margin-top: 20px;
}

.preset-tests h4 {
  margin: 0 0 12px 0;
  color: #303133;
}

.data-display {
  margin-bottom: 20px;
}

.data-panel h3 {
  margin: 0 0 12px 0;
  color: #303133;
}

.history-section {
  margin-top: 20px;
}

.history-section h3 {
  margin: 0 0 16px 0;
  color: #303133;
}
</style> 