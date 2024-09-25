//package com.moviebookingapp.kafka;
//
//import org.apache.kafka.clients.producer.ProducerConfig;
//import org.apache.kafka.common.serialization.StringSerializer;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.kafka.core.DefaultKafkaProducerFactory;
//import org.springframework.kafka.core.KafkaTemplate;
//import org.springframework.kafka.core.ProducerFactory;
//import org.springframework.kafka.support.serializer.JsonSerializer;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Configuration
//public class KafkaProducerConfig {
//
//    @Value(value = "${spring.kafka.bootstrap-servers}")
//    private String bootstrapAddress;
//
//    @Bean
//    public ProducerFactory<String,Object> producerFactory(){
//        Map<String,Object> configs = new HashMap<>();
//        configs.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,bootstrapAddress);  
//        configs.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
//        configs.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
//        return new DefaultKafkaProducerFactory<String,Object>(configs);
//    }
//
//    @Bean
//    public KafkaTemplate<String,Object> kafkaTemplate(){
//        return new KafkaTemplate<>(producerFactory());
//    }
//
//}
//
////the kafkaTemplate method creates and configure a 'KafkaTemplate' bean and uses the producerFactory() method to obtain the 
////producerFactory and constructs a new kafkaTemplate with it.
