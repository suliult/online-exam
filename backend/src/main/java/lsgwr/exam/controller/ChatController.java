package lsgwr.exam.controller;

/**
 * @program: spring-boot-online-exam-master
 * @description:该类处理与聊天功能相关的HTTP请求。
 * @author: surryliu
 * @create: 2024-07-17 09:18
 **/

import lsgwr.exam.service.ChatGptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatGptService chatGptService;

    /**
     * 处理发起聊天的POST请求。
     *
     * @param request 包含聊天请求参数的映射，如模型和消息。
     * @return 包含聊天响应或错误消息的ResponseEntity。
     */
    @PostMapping
    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, Object> request) {
        try {
            // 从请求中提取模型参数
            String model = (String) request.get("model");
            @SuppressWarnings("unchecked")
            List<Map<String, String>> messages = (List<Map<String, String>>) request.get("messages");
            // 从ChatGptService获取响应
            String response = chatGptService.getChatGptResponse(model, messages);
            // 返回包含状态200 OK的响应实体
            return ResponseEntity.ok(Map.of("content", response));
        } catch (Exception e) {
            // 返回包含状态500 Internal Server Error的错误消息的响应实体
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
