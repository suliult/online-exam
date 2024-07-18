/***********************************************************
 * @Description : 用户接口
 ***********************************************************/
package lsgwr.exam.service;

import lsgwr.exam.dto.RegisterDTO;
import lsgwr.exam.entity.User;
import lsgwr.exam.qo.LoginQo;
import lsgwr.exam.vo.UserInfoVo;
import lsgwr.exam.vo.UserVo;
import org.springframework.mail.SimpleMailMessage;

import java.util.List;

public interface UserService {
    /**
     * 注册
     *
     * @param registerDTO 注册参数
     * @return 注册成功后的用户信息
     */
    User register(RegisterDTO registerDTO);

    /**
     * 登录接口，登录成功返回token
     *
     * @param loginQo 登录参数
     * @return 成功返回token，失败返回null
     */
    String login(LoginQo loginQo);

    /**
     * 根据用户id获取用户信息
     *
     * @return 用户实体
     */
    UserVo getUserInfo(String userId);

    /**
     * 获取用户详细信息(主要是权限相关的)
     * @param userId 用户的id
     * @return 用户信息组装的实体
     */
    UserInfoVo getInfo(String userId);
    List<User> getAllUsers();

    User updateUser(String userId, User user);

    void deleteUser(String userId);

}
