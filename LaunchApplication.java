package ChromeBrowser;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LaunchApplication {
        public static void main(String[] args) throws Exception {
            System.setProperty("webdriver.chrome.driver", "/Users/william/Downloads/chromedriver-mac-arm64/chromedriver");
            WebDriver driver = new ChromeDriver(new ChromeOptions().addArguments("--headless","--disable-gpu"));
            driver.get("https://www.nytimes.com/games/connections");
            String str = driver.findElement(By.className("flex-grid")).getAttribute("innerHTML");
               Pattern pattern = Pattern.compile("(>[A-Z]{1,9}<)");
                Matcher matcher = pattern.matcher(str);
                ArrayList<String> list = new ArrayList<String>();
                while (matcher.find()) {
                    list.add(matcher.group());
                }
            System.out.println(list);
            driver.quit();
        }
}
