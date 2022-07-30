package com.example.task_api.model.response;

import lombok.Data;

/**
 * ログイン認証APIのレスポンスボディ
 */
@Data
public class AuthResponse {

    /** ID */
    private Long id;

    /** ユーザー名 */
    private String username;

}
