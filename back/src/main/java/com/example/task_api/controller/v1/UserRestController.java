package com.example.task_api.controller.v1;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
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

import com.example.task_api.model.entity.UserEntity;
import com.example.task_api.model.request.UserRequest;
import com.example.task_api.model.response.UserResponse;
import com.example.task_api.repository.UserRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

/**
 * ユーザーAPIのエンドポイント
 */
@RestController
@RequestMapping("/api/v1/users") // エンドポイント
@CrossOrigin("http://localhost:3000/") // CORSを有効化
@RequiredArgsConstructor // Lombokでコンストラクタ生成
@Tag(name = "users", description = "ユーザーAPI") // Swagger UI の情報
public class UserRestController {

    /////////////////////// フィールド ///////////////////////

    /**
     * ユーザーリポジトリ
     * Lombokでコンストラクタが生成され、コンストラクタインジェクションされる。
     */
    private final UserRepository userRepository;

    /**
     * Model Mapper
     * オブジェクト間で同一フィールド名の値をコピーしてくれるライブラリ。
     * Lombokでコンストラクタが生成され、コンストラクタインジェクションされる。
     */
    private final ModelMapper modelMapper;

    /////////////////////// エンドポイント ///////////////////////

    /**
     * ユーザーを全件取得
     * GET /api/v1/users
     */
    @Operation(summary = "ユーザーを全件取得") // Swagger UI の情報
    @GetMapping
    public List<UserResponse> getUsers() {
        List<UserEntity> entities = userRepository.findAll();
        // MEMO: ModelMapper で List を使用する方法
        // https://www.baeldung.com/java-modelmapper-lists
        List<UserResponse> res = modelMapper.map(entities, new TypeToken<List<UserResponse>>() {
        }.getType());
        return res;
    }

    /**
     * ユーザーを1件取得
     * GET /api/v1/users/{id}
     */
    @Operation(summary = "ユーザーを1件取得") // Swagger UI の情報
    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable Long id) {
        UserEntity entity = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "リソースが存在しません"));
        UserResponse res = modelMapper.map(entity, UserResponse.class);
        return res;
    }

    /**
     * ユーザーを1件登録
     * POST /api/v1/users
     */
    @Operation(summary = "ユーザーを1件登録") // Swagger UI の情報
    @PostMapping
    public UserResponse postUser(@RequestBody UserRequest req) {
        UserEntity entity = modelMapper.map(req, UserEntity.class);
        UserEntity savedEntity = userRepository.save(entity);
        UserResponse res = modelMapper.map(savedEntity, UserResponse.class);
        return res;
    }

    /**
     * ユーザーを1件更新
     * PATCH /api/v1/users/{id}
     */
    @Operation(summary = "ユーザーを1件更新") // Swagger UI の情報
    @PatchMapping("/{id}")
    public UserResponse patchUser(@PathVariable Long id, @RequestBody UserRequest req) {
        UserEntity userEntityToResister = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "リソースが存在しません"));
        userEntityToResister.setUsername(req.getUsername());
        userEntityToResister.setPassword(req.getPassword());
        UserEntity registeredUserEntity = userRepository.save(userEntityToResister);

        UserResponse res = modelMapper.map(registeredUserEntity, UserResponse.class);
        return res;
    }

    /**
     * ユーザーを1件削除
     * DELETE /api/v1/users/{id}
     */
    @Operation(summary = "ユーザーを1件削除") // Swagger UI の情報
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        if (userRepository.findById(id).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "リソースが存在しません");
        }
        userRepository.deleteById(id);
    }
}
