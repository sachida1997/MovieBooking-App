//package com.moviebookingapp.kafka;
//
//import org.apache.kafka.clients.admin.AdminClientConfig;
//import org.apache.kafka.clients.admin.NewTopic;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.kafka.core.KafkaAdmin;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Configuration
//public class KafkaTopicConfig {
//
//    @Value(value = "${spring.kafka.bootstrap-servers}")
//    private String bootstrapAddress;
//
//    //kafkaAdmin method creates and configure a kafkaAdmin bean.the kafkaAdmin class is provided by spring kafka and is used
//    //for administrative operations on kafka clusters.
//    @Bean
//    public KafkaAdmin kafkaAdmin() {
//        Map<String, Object> configs = new HashMap<>();
//        configs.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
//        return new KafkaAdmin(configs);
//    }
//
//    @Bean
//    public NewTopic topic1() {
//        return new NewTopic("movieapptopic", 1, (short) 1);
//    }
//}