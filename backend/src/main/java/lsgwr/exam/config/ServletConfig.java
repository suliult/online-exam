package lsgwr.exam.config;
// * @description: 配置Servlet容器的相关属性和自定义错误页面
//        * 该配置类用于自定义Web服务器工厂，并设置404错误页面的跳转路径
//        *
import org.springframework.boot.web.server.ConfigurableWebServerFactory;
import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;

@Configuration
public class ServletConfig {
    /**
     * 配置 WebServerFactoryCustomizer Bean
     *
     * @return WebServerFactoryCustomizer<ConfigurableWebServerFactory>
     * 自定义 Web 服务器，设置404错误页面的跳转路径为"/"
     */
    @Bean
    public WebServerFactoryCustomizer<ConfigurableWebServerFactory> webServerFactoryCustomizer() {
        return factory -> {
            ErrorPage error404Page = new ErrorPage(HttpStatus.NOT_FOUND, "/");
            factory.addErrorPages(error404Page);
        };
    }
}
