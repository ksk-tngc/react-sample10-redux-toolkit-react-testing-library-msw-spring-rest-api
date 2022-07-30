package com.example.task_api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.task_api.model.entity.UserEntity;

/**
 * ユーザーリポジトリインターフェース
 * 
 * {@code @Query}でクエリを明示的に記述していないクエリメソッドは、Spring Data JPA が
 * メソッド名に含まれるキーワードからクエリを自動生成してくれる。
 */
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    /**
     * ユーザー名とパスワードで存在チェック
     * @param Username 検索対象のユーザー名
     * @param password 検索対象のパスワード
     * @return 存在する場合 true
     */
    boolean existsByUsernameAndPassword(String userName, String password);

    /**
     * ユーザー名とパスワードでユーザーIDを取得する
     * @param Username 検索対象のユーザー名
     * @param password 検索対象のパスワード
     * @return ユーザーID
     */
    Optional<UserEntity> getByUsernameAndPassword(String userName, String password);

}
