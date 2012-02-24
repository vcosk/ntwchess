<%@ page import="java.io.*" %>
<%
FileWriter fw = null;
try {
	fw = new FileWriter("D:/temp/apache-tomcat-6.0.32/webapps/chess/data/status.dat");
	fw.write("");
}
catch(Exception e) {
	e.printStackTrace();
}
finally {
	if(fw != null) {
		try {
			fw.flush();
			fw.close();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
}
%>
