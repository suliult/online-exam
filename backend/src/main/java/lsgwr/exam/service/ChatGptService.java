package lsgwr.exam.service;

/**
 * @program: spring-boot-online-exam-master
 * @description:
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

    private final OkHttpClient client = new OkHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private ChatGptConfig config;

    public String getChatGptResponse(String model, List<Map<String, String>> messages) throws IOException {
        MediaType mediaType = MediaType.parse("application/json");

        ObjectNode requestBody = objectMapper.createObjectNode();
        requestBody.put("model", model);
        ArrayNode messagesNode = requestBody.putArray("messages");
        for (Map<String, String> message : messages) {
            ObjectNode messageNode = messagesNode.addObject();
            messageNode.put("role", message.get("role"));
            messageNode.put("content", message.get("content"));
        }

        RequestBody body = RequestBody.create(mediaType, requestBody.toString());

        Request request = new Request.Builder()
                .url("https://api.suliult.me/v1/chat/completions")
                .post(body)
                .addHeader("Authorization", "Bearer " + config.getApiKey())
                .addHeader("Content-Type", "application/json")
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);

            String responseBody = response.body().string();
            JsonNode jsonNode = objectMapper.readTree(responseBody);
            return jsonNode.get("choices").get(0).get("message").get("content").asText();
        }
    }
}
