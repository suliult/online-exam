package lsgwr.exam.config;

/**
 * @program: spring-boot-online-exam-master
 * @description:配置 ChatGPT API 的密钥
 * @author: surryliu
 * @create: 2024-07-17 09:14
 **/
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ChatGptConfig {

    @Value("${chatgpt.api.key}")//ChatGPT API 的密钥
    private String apiKey;

    public String getApiKey() {
        return apiKey;
    }
}
