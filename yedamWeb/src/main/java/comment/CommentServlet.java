package comment;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Servlet implementation class CommentServlet
 */
@WebServlet("/CommentServlet")
public class CommentServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public CommentServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8"); // 한글 인코딩
		// 응답 정보들은 respnse
		response.setContentType("text/html;charset=utf-8");
		response.setCharacterEncoding("UTF-8");

		PrintWriter out = response.getWriter();
		String cmd = request.getParameter("cmd");// cmd= insert&id=?

		if (cmd == null) {// 서블릿 했는데 요청 정보 파라미터가 안나오면
			StringBuffer sb = new StringBuffer();
			sb.append("<result>");// xml데이터.. 지금까지는 json...
			sb.append("<code>error</code>");
			sb.append("<data>");
			sb.append("cmd null"); // 명령문 없습니다...
			sb.append("</data>");
			sb.append("</response>");
			out.print(sb.toString()); // <code>error</code> <data>cmd null</data> =>xml 부모, 자식이 됨
									  // json => {"code":"error", data:"cmd null"}=> 데티어 쉽게 가져올 수 ..

		} else if (cmd.equals("selectAll")) {// 전체 조회 기능.
			List<HashMap<String, Object>> list = CommentsDAO.getInstance().selectAll();
			out.print(selectAll(list));

		} else if (cmd.equals("insert")) {
			Comments comment = new Comments();
			comment.setContent(request.getParameter("content"));
			comment.setName(request.getParameter("name"));
			HashMap<String, Object> map = CommentsDAO.getInstance().insert(comment);
			out.println(toXML(map));

		} else if (cmd.equals("update")) {
			response.setContentType("text/xml;charset=utf-8");// xml로 바꾸기
			Comments comment = new Comments();
			comment.setId(request.getParameter("id"));
			comment.setName(request.getParameter("name"));
			comment.setContent(request.getParameter("content"));
			HashMap<String, Object> map = CommentsDAO.getInstance().update(comment);
			out.println(toXML(map));// 아작스 호출위해 xml파일로

		} else if (cmd.equals("delete")) {
			response.setContentType("text/xml;charset=utf-8");
			Comments comment = new Comments();
			comment.setId(request.getParameter("id"));
			HashMap<String, Object> map = CommentsDAO.getInstance().delete(comment);
			out.println(toXML(map));

		}
	}

	// xml로 만들기~
	private String toXML(HashMap<String, Object> map) {
		StringBuilder sb = new StringBuilder();
		sb.append("<result>");
		sb.append("<code>");
		sb.append(map.get("code"));
		sb.append("</code>");

		sb.append("<data>"); // data 영역
		Gson gson = new GsonBuilder().create();
		sb.append(gson.toJson(map));
		sb.append("</data>");
		sb.append("</result>");

		return sb.toString();
	}

	private String selectAll(List<HashMap<String, Object>> list) {
		StringBuffer sb = new StringBuffer();
		sb.append("<result>");
		sb.append("<code>success</code>");
		sb.append("<data>");
		sb.append("[");

		for (int i = 0; i < list.size(); i++) {
			HashMap<String, Object> map = list.get(i);
			sb.append("{");
			sb.append("id:" + map.get("id"));
			sb.append(", name:'" + map.get("name"));
			sb.append("', content:'" + map.get("content"));
			sb.append("'}");
			if (i != list.size() - 1) {
				sb.append(",");
			}
		}
		sb.append("]");
		sb.append("</data>");
		sb.append("</result>");

		return sb.toString();
	}

	// 변경
	public HashMap<String, Object> update(Comments comment) {

		return null;
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
