package com.example.task_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.task_api.model.entity.TaskEntity;

/**
 * タスクリポジトリインターフェース
 */
public interface TaskRepository extends JpaRepository<TaskEntity, Long> {
}
