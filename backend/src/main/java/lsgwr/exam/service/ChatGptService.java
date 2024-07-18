package lsgwr.exam.service;

/**
 * @program: spring-boot-online-exam-master
 * @description:用于与ChatGPT API通信的服务类，
 *  * ChatGptService 类用于处理与ChatGPT API的交互。
 *  * 提供生成聊天响应的功能。
 * @author: surryliu
 * @create: 2024-07-17 09:17
 **/
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lsgwr.exam.config.ChatGptConfig;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class ChatGptService {
    // OkHttpClient实例用于发送HTTP请求
    private final OkHttpClient client = new OkHttpClient();
    // ObjectMapper实例用于处理JSON数据
    private final ObjectMapper objectMapper = new ObjectMapper();
    // 注入ChatGptConfig配置类
    @Autowired
    private ChatGptConfig config;
    /**
     * 生成ChatGPT的响应
     *
     * @param model    模型名称
     * @param messages 聊天记录
     * @return ChatGPT的响应内容
     * @throws IOException 如果请求失败或响应无法解析
     */
    public String getChatGptResponse(String model, List<Map<String, String>> messages) throws IOException {
        // 设置请求体的媒体类型为JSON
        MediaType mediaType = MediaType.parse("application/json");
        // 构建请求体JSON对象
        ObjectNode requestBody = objectMapper.createObjectNode();
        requestBody.put("model", model);
        ArrayNode messagesNode = requestBody.putArray("messages");
        for (Map<String, String> message : messages) {
            ObjectNode messageNode = messagesNode.addObject();
            messageNode.put("role", message.get("role"));
            messageNode.put("content", message.get("content"));
        }
        // 将请求体转换为RequestBody对象
        RequestBody body = RequestBody.create(mediaType, requestBody.toString());
        // 构建HTTP请求
        Request request = new Request.Builder()
                .url("https://api.suliult.me/v1/chat/completions")
                .post(body)
                .addHeader("Authorization", "Bearer " + config.getApiKey())
                .addHeader("Content-Type", "application/json")
                .build();
        // 发送请求并处理响应
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);

            String responseBody = response.body().string();
            JsonNode jsonNode = objectMapper.readTree(responseBody);
            return jsonNode.get("choices").get(0).get("message").get("content").asText();
        }
    }
}
