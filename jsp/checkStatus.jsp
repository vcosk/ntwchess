<%@ page import="java.io.*" %>
<%
FileInputStream is = null;
try {
	is = new FileInputStream("D:/temp/apache-tomcat-6.0.32/webapps/chess/data/status.dat");

	int len = is.available();
	byte[] b = new byte[len];
	is.read(b);

	String resp = new String(b);
	if(resp.length > 0) {
		out.println("updateStatus("+resp+");");
	}
	else {
		out.println("");
	}
}
catch(Exception e) {
	e.printStackTrace();
}
finally {
	if(is != null) {
		try {
			is.close();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
}

%>
