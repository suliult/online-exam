// 考试相关的接口，包括考试、问题、选项和评分等接口

import api from './index'
import { axios } from '../utils/request'

/**
 * 获取问题列表
 * @param {Object} parameter - 查询参数
 * @returns {Promise} 返回问题列表的 Promise
 */
export function getQuestionList (parameter) {
  return axios({
    url: api.ExamQuestionList,
    method: 'get',
    params: parameter
  })
}

/**
 * 获取所有问题
 * @returns {Promise} 返回所有问题的 Promise
 */
export function getQuestionAll () {
  return axios({
    url: api.ExamQuestionAll,
    method: 'get'
  })
}

/**
 * 更新问题
 * @param {Object} parameter - 更新的问题数据
 * @returns {Promise} 返回更新结果的 Promise
 */
export function questionUpdate (parameter) {
  console.log(parameter)
  return axios({
    url: api.ExamQuestionUpdate,
    method: 'post',
    data: parameter
  })
}

/**
 * 获取问题选项
 * @returns {Promise} 返回问题选项的 Promise
 */
export function getQuestionSelection () {
  return axios({
    url: api.ExamQuestionSelection,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * 创建新问题
 * @param {Object} parameter - 新问题的数据
 * @returns {Promise} 返回创建结果的 Promise
 */
export function questionCreate (parameter) {
  console.log(parameter)
  return axios({
    url: api.ExamQuestionCreate,
    method: 'post',
    data: parameter
  })
}

/**
 * 获取考试列表
 * @param {Object} parameter - 查询参数
 * @returns {Promise} 返回考试列表的 Promise
 */
export function getExamList (parameter) {
  return axios({
    url: api.ExamList,
    method: 'get',
    params: parameter
  })
}

/**
 * 获取所有考试
 * @returns {Promise} 返回所有考试的 Promise
 */
export function getExamAll () {
  return axios({
    url: api.ExamAll,
    method: 'get'
  })
}

/**
 * 获取按类型分类的问题列表（单选、多选和判断）
 * @returns {Promise} 返回分类后的问题列表的 Promise
 */
export function getExamQuestionTypeList () {
  return axios({
    url: api.ExamQuestionTypeList,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * 获取考试卡片列表
 * @returns {Promise} 返回考试卡片列表的 Promise
 */
export function getExamCardList () {
  return axios({
    url: api.ExamCardList,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * 创建新考试
 * @param {Object} parameter - 新考试的数据
 * @returns {Promise} 返回创建结果的 Promise
 */
export function examCreate (parameter) {
  console.log(parameter)
  return axios({
    url: api.ExamCreate,
    method: 'post',
    data: parameter
  })
}

/**
 * 更新考试
 * @param {Object} parameter - 更新的考试数据
 * @returns {Promise} 返回更新结果的 Promise
 */
export function examUpdate (parameter) {
  console.log(parameter)
  return axios({
    url: api.ExamUpdate,
    method: 'post',
    data: parameter
  })
}

/**
 * 获取考试详情
 * @param {string|number} examId - 考试ID
 * @returns {Promise} 返回考试详情的 Promise
 */
export function getExamDetail (examId) {
  return axios({
    url: api.ExamDetail + examId,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * 获取考试记录详情
 * @param {string|number} recordId - 记录ID
 * @returns {Promise} 返回考试记录详情的 Promise
 */
export function getExamRecordDetail (recordId) {
  return axios({
    url: api.recordDetail + recordId,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * 获取问题详情
 * @param {string|number} questionId - 问题ID
 * @returns {Promise} 返回问题详情的 Promise
 */
export function getQuestionDetail (questionId) {
  return axios({
    url: api.QuestionDetail + questionId,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * 完成考试（交卷）
 * @param {string|number} examId - 考试ID
 * @param {Object} answersMap - 答案映射
 * @returns {Promise} 返回完成考试结果的 Promise
 */
export function finishExam (examId, answersMap) {
  console.log(answersMap)
  return axios({
    url: api.FinishExam + examId,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: answersMap
  })
}

/**
 * 获取考试记录列表
 * @returns {Promise} 返回考试记录列表的 Promise
 */
export function getExamRecordList () {
  return axios({
    url: api.ExamRecordList,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
