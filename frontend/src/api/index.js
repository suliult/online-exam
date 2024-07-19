const api = {
  // 认证相关接口
  Login: '/auth/login',                // 登录
  Logout: '/auth/logout',              // 登出
  ForgePassword: '/auth/forge-password', // 忘记密码
  Register: '/auth/register',          // 注册
  twoStepCode: '/auth/2step-code',     // 两步验证码
  SendSms: '/account/sms',             // 发送短信
  SendSmsErr: '/account/sms_err',      // 发送短信错误
  UserInfo: '/user/info',              // 获取用户信息

  // 用户管理接口
  UserRegister: '/user/register',      // 用户注册
  UserLogin: '/user/login',            // 用户登录
  UserList: '/user',                   // 获取用户列表
  UserUpdate: '/user/:id',             // 更新用户信息，:id 为用户ID
  UserDelete: '/user/:id',             // 删除用户，:id 为用户ID

  // 考试相关接口
  ExamQuestionList: '/exam/question/list',    // 获取考试问题列表
  ExamQuestionAll: '/exam/question/all',      // 获取所有考试问题
  ExamQuestionUpdate: '/exam/question/update', // 更新考试问题
  ExamQuestionSelection: '/exam/question/selection', // 考试问题选择
  ExamQuestionCreate: '/exam/question/create', // 创建考试问题
  ExamList: '/exam/list',              // 获取考试列表
  ExamAll: '/exam/all',                // 获取所有考试
  ExamQuestionTypeList: '/exam/question/type/list', // 获取按类型分类的问题列表
  ExamCreate: '/exam/create',          // 创建考试
  ExamUpdate: '/exam/update',          // 更新考试
  ExamCardList: '/exam/card/list',     // 获取考试卡片列表
  ExamDetail: '/exam/detail/',         // 获取考试详情，需要在后面拼接考试ID
  QuestionDetail: '/exam/question/detail/', // 获取问题详情，需要在后面拼接问题ID
  FinishExam: '/exam/finish/',         // 完成考试（交卷），需要在后面拼接考试ID
  ExamRecordList: '/exam/record/list', // 获取考试记录列表
  recordDetail: '/exam/record/detail/', // 获取考试记录详情，需要在后面拼接记录ID

  // 聊天相关接口
  ChatSendMessage: '/api/chat'         // 发送聊天消息
}

export default api
