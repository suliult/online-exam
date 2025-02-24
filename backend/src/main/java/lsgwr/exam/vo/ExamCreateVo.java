/***********************************************************
 * @Description : 考试的前端展示类。examCreatorId可从token中获取
 ***********************************************************/
package lsgwr.exam.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class ExamCreateVo {

    @JsonProperty("name")
    private String examName;

    @JsonProperty("avatar")
    private String examAvatar;

    @JsonProperty("desc")
    private String examDescription;

    /**
     * 考试时长，单位分钟
     */
    @JsonProperty("elapse")
    private Integer examTimeLimit;


    /**
     * 单选题
     */
    private List<ExamQuestionSelectVo> radios;

    /**
     * 多选题
     */
    private List<ExamQuestionSelectVo> checks;

    /**
     * 判断题
     */
    private List<ExamQuestionSelectVo> judges;

    /**
     * 单选题的分数
     */
    @JsonProperty("radioScore")
    private Integer examScoreRadio;

    /**
     * 多选题的分数
     */
    @JsonProperty("checkScore")
    private Integer examScoreCheck;

    /**
     * 判断题每题的分数
     */
    @JsonProperty("judgeScore")
    private Integer examScoreJudge;
}
