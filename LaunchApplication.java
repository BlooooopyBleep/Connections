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
            driver.quit();
        }
            String str1 = list.get(0).substring(1,list.get(0).length()-1);
            String str2 = list.get(1).substring(1,list.get(1).length()-1);
            String str3 = list.get(2).substring(1,list.get(2).length()-1);
            String str4 = list.get(3).substring(1,list.get(3).length()-1);
            String str5 = list.get(4).substring(1,list.get(4).length()-1);
            String str6 = list.get(5).substring(1,list.get(5).length()-1);
            String str7 = list.get(6).substring(1,list.get(6).length()-1);
            String str8 = list.get(7).substring(1,list.get(7).length()-1);
            String str9 = list.get(8).substring(1,list.get(8).length()-1);
            String str10 = list.get(9).substring(1,list.get(9).length()-1);
            String str11 = list.get(10).substring(1,list.get(10).length()-1);
            String str12 = list.get(11).substring(1,list.get(11).length()-1);
            String str13 = list.get(12).substring(1,list.get(12).length()-1);
            String str14 = list.get(13).substring(1,list.get(13).length()-1);
            String str15 = list.get(14).substring(1,list.get(14).length()-1);
            String str16 = list.get(15).substring(1,list.get(15).length()-1);
}
