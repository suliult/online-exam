//package lsgwr.exam.entity;
//
//
//import com.fasterxml.jackson.annotation.JsonFormat;
//import lombok.Data;
//import org.hibernate.annotations.CreationTimestamp;
//import org.hibernate.annotations.DynamicUpdate;
//
//import javax.persistence.*;
//import java.util.Date;
//
//@Data
//@Entity
//@DynamicUpdate
//public class User {
//    @Id
//    private String userId;
//    private String userUsername;
//    private String userNickname;
//    private String userPassword;
//    private Integer userRoleId;
//    private String userAvatar;
//    private String userDescription;
//    private String userEmail;
//    private String userPhone;
//    /**
//     * 创建时间，默认值为当前时间戳
//     */
//    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
//    @Column(nullable = false, updatable = false)
//    private Date createTime;
//
//    /**
//     * 更新时间，设计表时设置了自动插入当前时间，无需在Java代码中设置了。
//     * 同时@DynamicUpdate注解可以时间当数据库数据变化时自动更新，无需人工维护
//     */
//    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
//    private Date updateTime;
//
//    @PrePersist
//    protected void onCreate() {
//
//    }
//
//    @PreUpdate
//    protected void onUpdate() {
//        this.updateTime = new Date();
//    }
//}



package lsgwr.exam.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@DynamicUpdate
public class User {
    @Id
    private String userId;
    private String userUsername;
    private String userNickname;
    private String userPassword;
    private Integer userRoleId;
    private String userAvatar;
    private String userDescription;
    private String userEmail;
    private String userPhone;

    /**
     * 创建时间，默认值为当前时间戳
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @Column(nullable = false, updatable = false)
    private Date createTime;

    /**
     * 更新时间，设计表时设置了自动插入当前时间，无需在Java代码中设置了。
     * 同时@DynamicUpdate注解可以时间当数据库数据变化时自动更新，无需人工维护
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date updateTime;

    @PrePersist
    protected void onCreate() {
        if (createTime == null) {
            createTime = new Date();
        }
        if (updateTime == null) {
            updateTime = new Date();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updateTime = new Date();
    }
}
