package com.example.task_api.model.request;

import lombok.Data;

/**
 * ユーザーAPIのリクエストボディー
 */
@Data
public class UserRequest {

    /** ユーザー名 */
    private String username;

    /** パスワード */
    private String password;

}
