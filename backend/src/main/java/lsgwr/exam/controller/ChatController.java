package lsgwr.exam.controller;

/**
 * @program: spring-boot-online-exam-master
 * @description:
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

    @PostMapping
    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, Object> request) {
        try {
            String model = (String) request.get("model");
            @SuppressWarnings("unchecked")
            List<Map<String, String>> messages = (List<Map<String, String>>) request.get("messages");
            String response = chatGptService.getChatGptResponse(model, messages);
            return ResponseEntity.ok(Map.of("content", response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
