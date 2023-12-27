import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/DataServlet")
public class DataServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Call LaunchApplication to get the data (assuming it updates some state)
        LaunchApplication.processData();

        // Retrieve the data after LaunchApplication has processed it
        String[] data = LaunchApplication.getProcessedData();

        // Set the data as a request attribute
        request.setAttribute("data", data);

        // Forward the request to the JSP for rendering
        request.getRequestDispatcher("index.jsp").forward(request, response);
    }
}
