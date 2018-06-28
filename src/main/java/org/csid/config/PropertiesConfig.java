package org.csid.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

@Configuration
@ConfigurationProperties
@PropertySources(value = {
    @PropertySource("file:${CONF_DIR}/dematnotes.properties"),
    @PropertySource("file:${CONF_DIR}/application-dev.yml"),
    @PropertySource("file:${CONF_DIR}/application-prod.yml"),
    @PropertySource("file:${CONF_DIR}/application.yml")
})
public class PropertiesConfig {

    //To resolve ${} in @Value
    @Bean
    public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
        final PropertySourcesPlaceholderConfigurer configurer = new PropertySourcesPlaceholderConfigurer();
        configurer.setOrder(10);
        return configurer;
    }

}
