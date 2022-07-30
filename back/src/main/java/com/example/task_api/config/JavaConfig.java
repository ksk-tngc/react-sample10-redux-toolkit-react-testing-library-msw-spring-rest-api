package com.example.task_api.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * DIコンテナにBeanを登録するJavaConfigクラス
 */
@Configuration
public class JavaConfig {

    /**
     * ModelMapperインスタンスをBeanに登録する
     * オブジェクト間で同名フィールドの値をコピーしてくれるライブラリ
     * @return Beanに登録するインスタンス
     */
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

}
