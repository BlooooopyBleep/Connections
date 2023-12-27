<!-- index.jsp -->
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Display Data</title>
</head>
<body>
    <h1>Data from LaunchApplication</h1>
    <ul>
        <% String[] data = (String[]) request.getAttribute("data"); %>
        <% for (String item : data) { %>
            <li><%= item %></li>
        <% } %>
    </ul>
</body>
</html>
