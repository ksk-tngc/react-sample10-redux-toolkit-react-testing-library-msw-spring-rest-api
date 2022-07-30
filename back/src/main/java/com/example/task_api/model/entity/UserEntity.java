package com.example.task_api.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

/**
 * ユーザーエンティティ
 */
@Entity
@Table(name = "users")
@Data
public class UserEntity {

    /** ID */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** ユーザー名 */
    @Column(nullable = false)
    private String username;

    /** パスワード */
    @Column(nullable = false)
    private String password;

}
