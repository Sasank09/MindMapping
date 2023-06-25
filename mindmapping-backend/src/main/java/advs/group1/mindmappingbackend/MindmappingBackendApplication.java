package advs.group1.mindmappingbackend;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

import java.util.Date;
import java.util.TimeZone;

@SpringBootApplication
public class MindmappingBackendApplication {
	@PostConstruct
	public void init() {
		TimeZone.setDefault(TimeZone.getTimeZone("CST"));   // It will set CST timezone
		System.out.println("Spring boot application running in CST timezone :" + new Date());   // It will print UTC timezone
	}
	public static void main(String[] args) {
		SpringApplication.run(MindmappingBackendApplication.class, args);
	}

}
