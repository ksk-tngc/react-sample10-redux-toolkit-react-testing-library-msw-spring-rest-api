package com.example.task_api.model.request;

import lombok.Data;

/**
 * タスクAPIのリクエストボディー
 */
@Data
public class TaskRequest {

    /** タイトル */
    private String title;

}
