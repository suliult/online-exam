
package lsgwr.exam.controller;

import lsgwr.exam.dto.RegisterDTO;
import lsgwr.exam.entity.User;
import lsgwr.exam.enums.ResultEnum;
import lsgwr.exam.qo.LoginQo;
import lsgwr.exam.service.UserService;
import lsgwr.exam.vo.ResultVO;
import lsgwr.exam.vo.UserInfoVo;
import lsgwr.exam.vo.UserVo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@Api(tags = "User APIs")
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JavaMailSender mailSender;

//    @PostMapping("/register")
//    @ApiOperation("注册")
//    ResultVO<User> register(@RequestBody RegisterDTO registerDTO) {
//        ResultVO<User> resultVO = new ResultVO<>();
//        // 注册信息的完善，还有唯一性校验没(用户名、邮箱和手机号)已经在user表中通过unique来设置了
//        User user = userService.register(registerDTO);
//        if (user != null) {
//            // 注册成功
//            resultVO = new ResultVO<>(ResultEnum.REGISTER_SUCCESS.getCode(), ResultEnum.REGISTER_SUCCESS.getMessage(), user);
//        } else {
//            resultVO = new ResultVO<>(ResultEnum.REGISTER_FAILED.getCode(), ResultEnum.REGISTER_FAILED.getMessage(), null);
//        }
//        return resultVO;
//    }


    @PostMapping("/register")
    @ApiOperation("注册")
    ResultVO<User> register(@RequestBody RegisterDTO registerDTO) {
        ResultVO<User> resultVO = new ResultVO<>();
        // 注册信息的完善，还有唯一性校验没(用户名、邮箱和手机号)已经在user表中通过unique来设置了
        User user = userService.register(registerDTO);
        if (user != null) {
            // 注册成功
            resultVO.setCode(ResultEnum.REGISTER_SUCCESS.getCode());
            resultVO.setMsg(ResultEnum.REGISTER_SUCCESS.getMessage());
            resultVO.setData(user);
        } else {
            // 用户名已经存在
            resultVO.setCode(ResultEnum.USER_EXISTS.getCode());
            resultVO.setMsg(ResultEnum.USER_EXISTS.getMessage());
        }
        return resultVO;
    }

    @PostMapping("/login")
    @ApiOperation("根据用户名或邮箱登录,登录成功返回token")
    ResultVO<String> login(@RequestBody LoginQo loginQo) { // 这里不用手机号是因为手机号和用户名难以进行格式区分，而用户名和
        // 用户登录
        ResultVO<String> resultVO;
        String token = userService.login(loginQo);
        if (token != null) {
            // 登录成功
            resultVO = new ResultVO<>(ResultEnum.LOGIN_SUCCESS.getCode(), ResultEnum.LOGIN_SUCCESS.getMessage(), token);
        } else {
            // 登录失败
            resultVO = new ResultVO<>(ResultEnum.LOGIN_FAILED.getCode(), ResultEnum.LOGIN_FAILED.getMessage(), null);
        }
        return resultVO;
    }

    @GetMapping("/user-info")
    @ApiOperation("获取用户信息")
    ResultVO<UserVo> getUserInfo(HttpServletRequest request) {
        String userId = (String) request.getAttribute("user_id");
        UserVo userVo = userService.getUserInfo(userId);
        return new ResultVO<>(ResultEnum.GET_INFO_SUCCESS.getCode(), ResultEnum.GET_INFO_SUCCESS.getMessage(), userVo);
    }

    @GetMapping("/info")
    @ApiOperation("获取用户的详细信息，包括个人信息页面和操作权限")
    ResultVO<UserInfoVo> getInfo(HttpServletRequest request) {
        System.out.println("进入/user/info的获取用户信息的接口");
        String userId = (String) request.getAttribute("user_id");
        UserInfoVo userInfoVo = userService.getInfo(userId);
        return new ResultVO<>(ResultEnum.GET_INFO_SUCCESS.getCode(), ResultEnum.GET_INFO_SUCCESS.getMessage(), userInfoVo);
    }
    @GetMapping("/{id}")
    @ApiOperation("获取用户信息")
    public ResultVO<UserVo> getUserInfo(@PathVariable String id) {
        UserVo userVo = userService.getUserInfo(id);
        return new ResultVO<>(ResultEnum.GET_INFO_SUCCESS.getCode(), ResultEnum.GET_INFO_SUCCESS.getMessage(), userVo);
    }

    @GetMapping("/{id}/info")
    @ApiOperation("获取用户的详细信息，包括个人信息页面和操作权限")
    public ResultVO<UserInfoVo> getInfo(@PathVariable String id) {
        UserInfoVo userInfoVo = userService.getInfo(id);
        return new ResultVO<>(ResultEnum.GET_INFO_SUCCESS.getCode(), ResultEnum.GET_INFO_SUCCESS.getMessage(), userInfoVo);
    }

    @GetMapping
    @ApiOperation("获取所有用户")
    public ResultVO<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResultVO<>(ResultEnum.GET_INFO_SUCCESS.getCode(), ResultEnum.GET_INFO_SUCCESS.getMessage(), users);
    }

    @PutMapping("/{id}")
    @ApiOperation("更新用户信息")
    public ResultVO<User> updateUser(@PathVariable String id, @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
        return new ResultVO<>(ResultEnum.GET_INFO_SUCCESS.getCode(), ResultEnum.GET_INFO_SUCCESS.getMessage(), updatedUser);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("删除用户")
    public ResultVO<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return new ResultVO<>(ResultEnum.GET_INFO_SUCCESS.getCode(), ResultEnum.GET_INFO_SUCCESS.getMessage(), null);
    }


    @GetMapping("/test")
    @ApiOperation("测试接口")
    String test(HttpServletRequest request) {
        // 下面这两个属性都是登录拦截器从token中解析地，当用户名不对或者token过期时是走不到接口内的
        String userId = (String) request.getAttribute("user_id");
        String username = (String) request.getAttribute("username");
        System.out.println("用户id：" + userId);
        System.out.println("用户名：" + username);
        return "用户id：" + userId + "\n用户名：" + username;
    }
    @PostMapping("/sendSMS")
    public ResponseEntity<String> sendSMS(@RequestBody RegisterDTO request) {
        // 处理验证码发送逻辑
        System.out.println("发送验证码到邮箱: " + request.getEmail());
        System.out.println("生成的验证码: " + request.getCode());
        // 发送人的邮箱比如 155156641XX@163.com
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("1423562528@qq.com"); // 发送人的邮箱
        message.setSubject("在线考试系统验证码"); // 标题
        message.setTo(request.getEmail()); // 发给谁  对方邮箱
        message.setText("您的在线考试系统验证码为：" + request.getCode());// 内容
        mailSender.send(message); // 发送
        return ResponseEntity.ok("验证码发送成功");
    }
}
