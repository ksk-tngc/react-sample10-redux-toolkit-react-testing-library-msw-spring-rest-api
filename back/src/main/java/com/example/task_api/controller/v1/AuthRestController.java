package com.example.task_api.controller.v1;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.task_api.model.entity.UserEntity;
import com.example.task_api.model.request.AuthRequest;
import com.example.task_api.model.response.AuthResponse;
import com.example.task_api.repository.UserRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

/**
 * 認証に関わるコントローラ（簡易版）
 */
@RestController
@RequestMapping("/api/v1/auth") // エンドポイント
@CrossOrigin("http://localhost:3000/") // CORSを有効化
@RequiredArgsConstructor // Lombokでコンストラクタ生成
@Tag(name = "auth", description = "認証周りのAPI（簡易版）") // Swagger UI の情報
public class AuthRestController {

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
     * ログイン認証（簡易版）
     * POST /api/v1/auth
     */
    @Operation(summary = "ログイン認証（簡易版）", description = "ユーザー名とパスワードで認証します。") // Swagger UI の情報
    @PostMapping
    public AuthResponse postAuth(@RequestBody AuthRequest req) {
        UserEntity userEntity = userRepository.getByUsernameAndPassword(req.getUsername(), req.getPassword())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "ユーザーが存在しません"));

        AuthResponse res = modelMapper.map(userEntity, AuthResponse.class);
        return res;
    }
}
