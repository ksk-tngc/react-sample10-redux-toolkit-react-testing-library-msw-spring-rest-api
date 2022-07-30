package com.example.task_api.controller.v1;

import java.time.LocalDateTime;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.task_api.model.entity.TaskEntity;
import com.example.task_api.model.request.TaskRequest;
import com.example.task_api.model.response.TaskResponse;
import com.example.task_api.repository.TaskRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

/**
 * タスクAPIのエンドポイント
 */
@RestController
@RequestMapping("/api/v1/tasks") // エンドポイント
@CrossOrigin("http://localhost:3000/") // CORSを有効化
@RequiredArgsConstructor // Lombokでコンストラクタ生成
@Tag(name = "tasks", description = "タスクAPI") // Swagger UI の情報
public class TaskRestController {

    /////////////////////// フィールド ///////////////////////

    /**
     * タスクリポジトリ
     * Lombokでコンストラクタが生成され、コンストラクタインジェクションされる。
     */
    private final TaskRepository taskRepository;

    /**
    * Model Mapper
    * オブジェクト間で同一フィールド名の値をコピーしてくれるライブラリ。
    * Lombokでコンストラクタが生成され、コンストラクタインジェクションされる。
    */
    private final ModelMapper modelMapper;

    /////////////////////// エンドポイント ///////////////////////

    /**
     * タスクを全件取得
     * GET /api/v1/tasks
     */
    @Operation(summary = "タスクを全件取得") // Swagger UI の情報
    @GetMapping
    public List<TaskResponse> getTasks() {
        List<TaskEntity> entities = taskRepository.findAll(Sort.by(Direction.DESC, "updatedAt"));
        // MEMO: ModelMapper で List を使用する方法
        // https://www.baeldung.com/java-modelmapper-lists
        List<TaskResponse> res = modelMapper.map(entities, new TypeToken<List<TaskResponse>>() {
        }.getType());
        return res;
    }

    /**
     * タスクを1件取得
     * GET /api/v1/tasks/{id}
     */
    @Operation(summary = "タスクを1件取得") // Swagger UI の情報
    @GetMapping("/{id}")
    public TaskResponse getTask(@PathVariable Long id) {
        TaskEntity entity = taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "リソースが存在しません"));
        TaskResponse res = modelMapper.map(entity, TaskResponse.class);
        return res;
    }

    /**
     * タスクを1件登録
     * POST /api/v1/tasks
     */
    @Operation(summary = "タスクを1件登録") // Swagger UI の情報
    @PostMapping
    public TaskResponse postTask(@RequestBody TaskRequest req) {
        TaskEntity entity = modelMapper.map(req, TaskEntity.class);
        entity.setCreatedAt(LocalDateTime.now());
        entity.setUpdatedAt(LocalDateTime.now());
        TaskEntity savedEntity = taskRepository.save(entity);

        TaskResponse res = modelMapper.map(savedEntity, TaskResponse.class);
        return res;
    }

    /**
     * タスクを1件更新
     * PATCH /api/v1/tasks/{id}
     */
    @Operation(summary = "タスクを1件更新") // Swagger UI の情報
    @PatchMapping("/{id}")
    public TaskResponse patchTask(@PathVariable Long id, @RequestBody TaskRequest req) {
        TaskEntity entity = taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "リソースが存在しません"));

        entity.setTitle(req.getTitle());
        entity.setUpdatedAt(LocalDateTime.now());
        TaskEntity savedEntity = taskRepository.save(entity);

        TaskResponse res = modelMapper.map(savedEntity, TaskResponse.class);
        return res;
    }

    /**
     * タスクを1件削除
     * DELETE /api/v1/tasks/{id}
     */
    @Operation(summary = "タスクを1件削除") // Swagger UI の情報
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        if (taskRepository.findById(id).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "リソースが存在しません");
        }
        taskRepository.deleteById(id);
    }
}
