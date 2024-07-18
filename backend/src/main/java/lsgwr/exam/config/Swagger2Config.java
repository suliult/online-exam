package lsgwr.exam.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.Parameter;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableSwagger2
public class Swagger2Config {
    /**
     * 配置Swagger2相关信息
     * @return Docket对象
     */
    @Bean
    public Docket api() {
        // 添加全局参数
        ParameterBuilder ticketPar = new ParameterBuilder();
        List<Parameter> pars = new ArrayList<>();
        ticketPar.name("Access-Token").description("Rest接口权限认证token,无需鉴权可为空")
                .modelRef(new ModelRef("string")).parameterType("header")
                //header中的ticket参数非必填，传空也可以
                .required(false).build();
        //根据每个方法名也知道当前方法在设置什么参数
        pars.add(ticketPar.build());

        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                // 自行修改为自己的包路径
                .apis(RequestHandlerSelectors.basePackage("lsgwr"))
                .paths(PathSelectors.any())
                .build()
                // 设置全局参数
                .globalOperationParameters(pars);
    }

    /**
     * 构建API文档的详细信息函数
     * @return ApiInfo
     */
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("online exam by springboot")
                .description("在线考试系统")
                .termsOfServiceUrl("https://github.com/suliult/online-exam")
                .version("2.0")
                .contact(new Contact("liangshanguang", "https://github.com/suliult/online-exam", "2306934678@qq.com"))
                .build();
    }
}
