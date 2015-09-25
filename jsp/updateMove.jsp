<!--
<%@ page import="java.io.*" %>
-->
<%@ page import="java.util.LinkedList" %>
<%
// FileWriter fw = null;
// try {
// 	fw = new FileWriter("D:/temp/apache-tomcat-6.0.32/webapps/chess/data/status.dat");

	String resp = request.getParameter("move");
	LinkedList<String> movesQueue = application.getAttribute("move_queue");
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
if(resp != null) {
	movesQueue.add(resp);
	application.setAttribute("move_queue", movesQueue);
	application.setAttribute("move", resp);
}

%>
