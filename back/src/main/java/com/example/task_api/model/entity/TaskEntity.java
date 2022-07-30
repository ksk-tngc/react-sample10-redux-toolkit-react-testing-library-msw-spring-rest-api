package com.example.task_api.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

/**
 * タスクエンティティ
 */
@Entity
@Table(name = "tasks")
@Data
public class TaskEntity {

    /** ID */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** タイトル */
    @Column(nullable = false)
    private String title;

    /** 作成日時 */
    @Column(nullable = false)
    private LocalDateTime createdAt;

    /** 更新日時 */
    @Column(nullable = false)
    private LocalDateTime updatedAt;

}
