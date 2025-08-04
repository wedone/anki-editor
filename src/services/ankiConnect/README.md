# AnkiConnect 卡片操作功能

本模块提供了完整的 AnkiConnect 卡片操作功能封装，支持卡片的查询、修改、状态管理等操作。

## 功能概览

### 基础查询功能
- `getCardsInDeck(deckName)` - 获取指定牌组中的所有卡片
- `findCards(query)` - 根据查询条件查找卡片
- `getCardInfo(cards)` - 获取卡片的详细信息
- `cardsToNotes(cards)` - 将卡片ID转换为笔记ID
- `getCardFields(cardId)` - 获取单张卡片的字段信息

### 易度因子管理
- `getEaseFactors(cards)` - 获取卡片的易度因子
- `setEaseFactors(cards, easeFactors)` - 设置卡片的易度因子

### 卡片状态管理
- `suspendCards(cards)` - 暂停卡片
- `unsuspendCards(cards)` - 恢复暂停的卡片
- `isCardSuspended(card)` - 检查单张卡片是否暂停
- `areCardsSuspended(cards)` - 检查多张卡片是否暂停
- `areCardsDue(cards)` - 检查卡片是否到期

### 卡片学习管理
- `getCardIntervals(cards, complete)` - 获取卡片间隔信息
- `forgetCards(cards)` - 忘记卡片（重置为新卡片）
- `relearnCards(cards)` - 重新学习卡片
- `answerCard(cardId, ease)` - 回答单张卡片
- `answerCards(answers)` - 批量回答卡片

### 到期日期管理
- `setDueDate(cards, days)` - 设置卡片到期日期
- `setCardDueTime(cardId, dueTime)` - 设置卡片到期时间

### 高级功能
- `setSpecificValueOfCard(card, keys, newValues, warningCheck)` - 设置卡片特定值
- `getCardsModTime(cards)` - 获取卡片修改时间
- `setCardFlag(cardId, flag)` - 设置卡片标志

## 使用示例

### 基础查询

```javascript
import { getCardsInDeck, findCards, getCardInfo } from './cards.js'

// 获取牌组中的卡片
const cards = await getCardsInDeck('Default')

// 查找今天到期的卡片
const dueCards = await findCards('is:due')

// 获取卡片详细信息
const cardInfo = await getCardInfo([1483959291685, 1483959293217])
```

### 易度因子管理

```javascript
import { getEaseFactors, setEaseFactors } from './cards.js'

const cardIds = [1483959291685, 1483959293217]

// 获取易度因子
const easeFactors = await getEaseFactors(cardIds)

// 设置新的易度因子
const newEaseFactors = [4200, 4000]
await setEaseFactors(cardIds, newEaseFactors)
```

### 卡片状态管理

```javascript
import { suspendCards, unsuspendCards, areCardsSuspended } from './cards.js'

const cardIds = [1483959291685, 1483959293217]

// 检查暂停状态
const suspendedStatus = await areCardsSuspended(cardIds)

// 暂停卡片
await suspendCards(cardIds)

// 恢复卡片
await unsuspendCards(cardIds)
```

### 回答卡片

```javascript
import { answerCard, answerCards } from './cards.js'

// 回答单张卡片 (1=Again, 2=Good, 3=Easy, 4=Hard)
await answerCard(1483959291685, 2)

// 批量回答卡片
const answers = [
  { cardId: 1483959291685, ease: 1 }, // Again
  { cardId: 1483959293217, ease: 3 }, // Easy
  { cardId: 1483959294000, ease: 2 }  // Good
]
await answerCards(answers)
```

### 设置到期日期

```javascript
import { setDueDate } from './cards.js'

const cardIds = [1483959291685, 1483959293217]

// 设置为今天到期
await setDueDate(cardIds, 0)

// 设置为明天到期
await setDueDate(cardIds, 1)

// 设置为3-7天后随机到期
await setDueDate(cardIds, '3-7')
```

### 高级操作

```javascript
import { setSpecificValueOfCard, setCardFlag } from './cards.js'

// 设置卡片特定值
await setSpecificValueOfCard(1483959291685, ['flags', 'odue'], ['1', '-100'])

// 设置卡片标志
await setCardFlag(1483959291685, 1)

// 设置卡片到期时间
const dueTime = Math.floor(Date.now() / 1000) + 86400 // 明天
await setCardDueTime(1483959291685, dueTime)
```

## 查询语法

AnkiConnect 支持丰富的查询语法：

### 基础查询
- `deck:"Default"` - 指定牌组
- `is:new` - 新卡片
- `is:due` - 到期的卡片
- `is:suspended` - 暂停的卡片
- `is:review` - 复习卡片

### 组合查询
- `deck:"Default" is:due` - 默认牌组中到期的卡片
- `is:suspended is:new` - 暂停的新卡片
- `deck:"Vocabulary" -is:suspended` - 词汇牌组中未暂停的卡片

### 字段查询
- `front:hello` - 正面包含"hello"的卡片
- `back:world` - 背面包含"world"的卡片
- `tag:important` - 带有"important"标签的卡片

## 错误处理

所有函数都包含完整的错误处理机制：

```javascript
try {
  const cards = await getCardsInDeck('Default')
  console.log('获取成功:', cards)
} catch (error) {
  console.error('获取失败:', error)
  // 处理错误
}
```

## 注意事项

1. **易度因子范围**：易度因子通常在 1300-2500 之间，表示百分比（如 2500 = 250%）
2. **回答选项**：
   - 1 = Again（重来）
   - 2 = Good（良好）
   - 3 = Easy（简单）
   - 4 = Hard（困难）
3. **到期日期格式**：
   - 0 = 今天
   - 1 = 明天
   - "3-7" = 3-7天后随机
4. **警告检查**：某些操作可能需要设置 `warningCheck = true` 来确认操作

## 性能优化

- 使用 `getCardsModTime()` 替代 `getCardInfo()` 来获取修改时间，性能提升约15倍
- 批量操作比单个操作更高效
- 合理使用查询条件来减少数据传输量

## 相关文件

- `cards.js` - 主要功能实现
- `examples/cardActionsExample.js` - 使用示例
- `core.js` - 核心通信模块 