<!--
<%@ page import="java.io.*" %>
-->
<%
// FileWriter fw = null;
// try {
// 	fw = new FileWriter("D:/temp/apache-tomcat-6.0.32/webapps/chess/data/status.dat");

	String resp = request.getParameter("move");
//
// 	fw.write(resp);
// }
// catch(Exception e) {
// 	e.printStackTrace();
// }
// finally {
// 	if(fw != null) {
// 		try {
// 			fw.close();
// 		}
// 		catch(Exception e) {
// 			e.printStackTrace();
// 		}
// 	}
// }

application.setAttribute("move", resp);

%>
