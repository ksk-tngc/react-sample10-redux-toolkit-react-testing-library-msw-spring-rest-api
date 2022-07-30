package com.example.task_api.model.response;

import java.time.LocalDateTime;

import lombok.Data;

/**
 * タスクAPIのレスポンスボディ
 */
@Data
public class TaskResponse {

    /** ID */
    private Long id;

    /** タイトル */
    private String title;

    /** 作成日時 */
    private LocalDateTime createdAt;

    /** 更新日時 */
    private LocalDateTime updatedAt;

}
