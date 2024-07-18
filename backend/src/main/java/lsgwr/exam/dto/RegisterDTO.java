
//@Description : 注册接口参数

package lsgwr.exam.dto;

import lombok.Data;

@Data
public class RegisterDTO {

    private String email;//邮箱
    private String password;//密码
    private String password2;
    private String mobile;//手机号码
    private String code;//验证码
    private String captcha;
}
