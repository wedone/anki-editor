# 模块化拆分实际示例

## 示例：用户管理服务模块化

假设我们有一个大型的 `userService.js` 文件（500+ 行），需要进行模块化拆分。

### 原始文件结构
```javascript
// src/services/userService.js (500+ 行)
const API_URL = 'http://localhost:3000/api'

// 用户认证相关
export async function login(username, password) { /* ... */ }
export async function logout() { /* ... */ }
export async function register(userData) { /* ... */ }
export async function refreshToken() { /* ... */ }

// 用户信息相关
export async function getUserProfile(userId) { /* ... */ }
export async function updateUserProfile(userId, data) { /* ... */ }
export async function deleteUser(userId) { /* ... */ }
export async function getUserList(params) { /* ... */ }

// 用户权限相关
export async function getUserRoles(userId) { /* ... */ }
export async function assignRole(userId, roleId) { /* ... */ }
export async function removeRole(userId, roleId) { /* ... */ }
export async function checkPermission(userId, permission) { /* ... */ }

// 用户设置相关
export async function getUserSettings(userId) { /* ... */ }
export async function updateUserSettings(userId, settings) { /* ... */ }
export async function resetUserSettings(userId) { /* ... */ }

// 用户统计相关
export async function getUserStats(userId) { /* ... */ }
export async function getActiveUsers() { /* ... */ }
export async function getUserActivity(userId) { /* ... */ }

// 用户文件相关
export async function uploadUserAvatar(userId, file) { /* ... */ }
export async function downloadUserFile(userId, fileId) { /* ... */ }
export async function deleteUserFile(userId, fileId) { /* ... */ }
```

### 模块化拆分后

#### 1. 创建目录结构
```bash
mkdir -p src/services/userService
```

#### 2. 核心模块
```javascript
// src/services/userService/core.js
const API_URL = 'http://localhost:3000/api'

export async function invoke(endpoint, options = {}) {
  try {
    console.log(`UserService API 调用: ${endpoint}`, options)
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: options.body ? JSON.stringify(options.body) : undefined
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log(`UserService API 响应: ${endpoint}`, result)
    
    return result
  } catch (error) {
    console.error(`UserService API Error (${endpoint}):`, error)
    throw error
  }
}
```

#### 3. 认证模块
```javascript
// src/services/userService/auth.js
import { invoke } from './core.js'

export async function login(username, password) {
  return await invoke('/auth/login', {
    method: 'POST',
    body: { username, password }
  })
}

export async function logout() {
  return await invoke('/auth/logout', { method: 'POST' })
}

export async function register(userData) {
  return await invoke('/auth/register', {
    method: 'POST',
    body: userData
  })
}

export async function refreshToken() {
  return await invoke('/auth/refresh', { method: 'POST' })
}
```

#### 4. 用户信息模块
```javascript
// src/services/userService/profile.js
import { invoke } from './core.js'

export async function getUserProfile(userId) {
  return await invoke(`/users/${userId}/profile`)
}

export async function updateUserProfile(userId, data) {
  return await invoke(`/users/${userId}/profile`, {
    method: 'PUT',
    body: data
  })
}

export async function deleteUser(userId) {
  return await invoke(`/users/${userId}`, { method: 'DELETE' })
}

export async function getUserList(params) {
  const queryString = new URLSearchParams(params).toString()
  return await invoke(`/users?${queryString}`)
}
```

#### 5. 权限模块
```javascript
// src/services/userService/permissions.js
import { invoke } from './core.js'

export async function getUserRoles(userId) {
  return await invoke(`/users/${userId}/roles`)
}

export async function assignRole(userId, roleId) {
  return await invoke(`/users/${userId}/roles`, {
    method: 'POST',
    body: { roleId }
  })
}

export async function removeRole(userId, roleId) {
  return await invoke(`/users/${userId}/roles/${roleId}`, {
    method: 'DELETE'
  })
}

export async function checkPermission(userId, permission) {
  return await invoke(`/users/${userId}/permissions/check`, {
    method: 'POST',
    body: { permission }
  })
}
```

#### 6. 设置模块
```javascript
// src/services/userService/settings.js
import { invoke } from './core.js'

export async function getUserSettings(userId) {
  return await invoke(`/users/${userId}/settings`)
}

export async function updateUserSettings(userId, settings) {
  return await invoke(`/users/${userId}/settings`, {
    method: 'PUT',
    body: settings
  })
}

export async function resetUserSettings(userId) {
  return await invoke(`/users/${userId}/settings`, { method: 'DELETE' })
}
```

#### 7. 统计模块
```javascript
// src/services/userService/statistics.js
import { invoke } from './core.js'

export async function getUserStats(userId) {
  return await invoke(`/users/${userId}/stats`)
}

export async function getActiveUsers() {
  return await invoke('/users/active')
}

export async function getUserActivity(userId) {
  return await invoke(`/users/${userId}/activity`)
}
```

#### 8. 文件模块
```javascript
// src/services/userService/files.js
import { invoke } from './core.js'

export async function uploadUserAvatar(userId, file) {
  const formData = new FormData()
  formData.append('avatar', file)
  
  return await invoke(`/users/${userId}/avatar`, {
    method: 'POST',
    headers: {}, // 让浏览器自动设置 Content-Type
    body: formData
  })
}

export async function downloadUserFile(userId, fileId) {
  return await invoke(`/users/${userId}/files/${fileId}/download`)
}

export async function deleteUserFile(userId, fileId) {
  return await invoke(`/users/${userId}/files/${fileId}`, {
    method: 'DELETE'
  })
}
```

#### 9. 主入口文件
```javascript
// src/services/userService/index.js
export { default as checkConnection } from './connection.js'

// 认证相关
export {
  login,
  logout,
  register,
  refreshToken
} from './auth.js'

// 用户信息相关
export {
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUserList
} from './profile.js'

// 权限相关
export {
  getUserRoles,
  assignRole,
  removeRole,
  checkPermission
} from './permissions.js'

// 设置相关
export {
  getUserSettings,
  updateUserSettings,
  resetUserSettings
} from './settings.js'

// 统计相关
export {
  getUserStats,
  getActiveUsers,
  getUserActivity
} from './statistics.js'

// 文件相关
export {
  uploadUserAvatar,
  downloadUserFile,
  deleteUserFile
} from './files.js'

// 默认导出所有方法
export { default } from './all.js'
```

#### 10. 默认导出文件
```javascript
// src/services/userService/all.js
import { login, logout, register, refreshToken } from './auth.js'
import { getUserProfile, updateUserProfile, deleteUser, getUserList } from './profile.js'
import { getUserRoles, assignRole, removeRole, checkPermission } from './permissions.js'
import { getUserSettings, updateUserSettings, resetUserSettings } from './settings.js'
import { getUserStats, getActiveUsers, getUserActivity } from './statistics.js'
import { uploadUserAvatar, downloadUserFile, deleteUserFile } from './files.js'

export default {
  // 认证相关
  login,
  logout,
  register,
  refreshToken,
  
  // 用户信息相关
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUserList,
  
  // 权限相关
  getUserRoles,
  assignRole,
  removeRole,
  checkPermission,
  
  // 设置相关
  getUserSettings,
  updateUserSettings,
  resetUserSettings,
  
  // 统计相关
  getUserStats,
  getActiveUsers,
  getUserActivity,
  
  // 文件相关
  uploadUserAvatar,
  downloadUserFile,
  deleteUserFile
}
```

### 使用示例

#### 更新前
```javascript
import { login, getUserProfile, updateUserSettings } from '../services/userService.js'

// 使用
await login(username, password)
await getUserProfile(userId)
await updateUserSettings(userId, settings)
```

#### 更新后
```javascript
import { login, getUserProfile, updateUserSettings } from '../services/userService/index.js'

// 使用方式完全相同
await login(username, password)
await getUserProfile(userId)
await updateUserSettings(userId, settings)
```

### 优势对比

#### 拆分前
- ❌ 单个文件 500+ 行，难以维护
- ❌ 功能混杂，职责不清
- ❌ 团队协作容易冲突
- ❌ 难以进行单元测试

#### 拆分后
- ✅ 每个文件 < 50 行，职责清晰
- ✅ 按功能分类，高内聚低耦合
- ✅ 团队可以并行开发不同模块
- ✅ 便于进行单元测试
- ✅ 支持按需导入，优化打包体积

### 测试示例

#### 单元测试
```javascript
// tests/services/userService/auth.test.js
import { login, logout } from '../../src/services/userService/auth.js'

describe('UserService Auth', () => {
  it('should login successfully', async () => {
    const result = await login('testuser', 'password')
    expect(result).toBeDefined()
  })
  
  it('should logout successfully', async () => {
    const result = await logout()
    expect(result).toBeDefined()
  })
})
```

#### 集成测试
```javascript
// tests/services/userService/integration.test.js
import { login, getUserProfile, updateUserSettings } from '../../src/services/userService/index.js'

describe('UserService Integration', () => {
  it('should work with all modules', async () => {
    const loginResult = await login('testuser', 'password')
    const profileResult = await getUserProfile(loginResult.userId)
    const settingsResult = await updateUserSettings(loginResult.userId, { theme: 'dark' })
    
    expect(loginResult).toBeDefined()
    expect(profileResult).toBeDefined()
    expect(settingsResult).toBeDefined()
  })
})
```

这个示例展示了如何将一个大型的服务文件进行模块化拆分，遵循了项目的命名规范和模块化原则，可以作为其他项目模块化拆分的参考。 