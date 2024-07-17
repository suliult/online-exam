package lsgwr.exam.dto;

/**
 * @program: spring-boot-online-exam-master
 * @description:
 * @author: surryliu
 * @create: 2024-07-17 20:52
 **/
// src/main/java/lsgwr/exam/dto/UserDTO.java
import lombok.Data;

@Data
public class UserDTO {
    private String userId;
    private String userUsername;
    private String userNickname;
    private Integer userRoleId;
    private String userEmail;
    private String userPhone;
}
