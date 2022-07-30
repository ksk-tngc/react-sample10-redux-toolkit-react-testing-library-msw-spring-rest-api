package com.example.task_api.model.request;

import lombok.Data;

/**
 * ログイン認証APIのリクエストボディー
 */
@Data
public class AuthRequest {

    /** ユーザー名 */
    private String username;

    /** パスワード */
    private String password;

}
