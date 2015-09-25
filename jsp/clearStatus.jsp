<!--
<%@ page import="java.io.*" %>
-->
<%@ page import="java.util.LinkedList" %>
<%
// FileWriter fw = null;
// try {
// 	fw = new FileWriter("D:/temp/apache-tomcat-6.0.32/webapps/chess/data/status.dat");
// 	fw.write("");
// }
// catch(Exception e) {
// 	e.printStackTrace();
// }
// finally {
// 	if(fw != null) {
// 		try {
// 			fw.flush();
// 			fw.close();
// 		}
// 		catch(Exception e) {
// 			e.printStackTrace();
// 		}
// 	}
// }
out.println(application.getAttribute("move"));
application.setAttribute("move", null);
application.setAttribute("move_queue", new LinkedList<String>());
%>
