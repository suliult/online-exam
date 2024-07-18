package lsgwr.exam.exception;
/**
 * 自定义异常类，用于处理考试相关的异常。
 */
import lsgwr.exam.enums.ResultEnum;
import lombok.Getter;

@Getter
public class ExamException extends RuntimeException {
    private Integer code;

    /**
     * 使用ResultEnum创建ExamException实例。
     *
     * @param resultEnum 包含错误码和错误消息的枚举。
     */
    public ExamException(ResultEnum resultEnum) {
        super(resultEnum.getMessage());
        this.code = resultEnum.getCode();
    }

    /**
     * 使用自定义错误码和错误消息创建ExamException实例。
     *
     * @param code 错误码。
     * @param message 错误消息。
     */
    public ExamException( Integer code, String message) {
        super(message);
        this.code = code;
    }
}
