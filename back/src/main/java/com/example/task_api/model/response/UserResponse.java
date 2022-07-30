package com.example.task_api.model.response;

import lombok.Data;

/**
 * ユーザーAPIのレスポンスボディ
 */
@Data
public class UserResponse {

    /** ID */
    private Long id;

    /** ユーザー名 */
    private String username;

}
