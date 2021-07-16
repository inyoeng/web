package comment;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class CommentsDAO extends DAO {
	// 싱글콘 방식(인스턴스 많이 못만들고 , 하나만 만들수 있게 만들기 위함."
	private static CommentsDAO instance;

	public static CommentsDAO getInstance() {
		if (instance != null) {
			return instance;
		}
		return new CommentsDAO();
	}

	// 입력
	public HashMap<String, Object> insert(Comments comment) {
		// 새로운 시퀀스 만들기!현재 시퀀스번호 읽어와서 +1해줘여.,,
		// 그 시퀀스로 입력한 후에 또 당므꺼 +1

		connect();
		int currentId = 0;
		HashMap<String, Object> map = new HashMap<String, Object>();
		try {
			// auto commit 멈춤. 사용자가 해야...
			conn.setAutoCommit(false);

			stmt = conn.createStatement();
			rs = stmt.executeQuery("Select value from id_repository where name ='COMMENT'");
			if (rs.next()) {
				currentId = rs.getInt(1);
			}
			currentId++; // 새로운 시퀀스 번호 부여

			psmt = conn.prepareStatement("update id_repository set value=? where name = 'COMMENT'");
			psmt.setInt(1, currentId);
			psmt.executeUpdate();

			psmt = conn.prepareStatement("insert into comments(id, name, content) values(?,?,?)");
			psmt.setInt(1, currentId);
			psmt.setString(2, comment.getName());
			psmt.setString(3, comment.getContent());
			psmt.executeQuery();
			conn.commit(); // 커밋 홤~!

			map.put("id", currentId);
			map.put("name", comment.getName());
			map.put("content", comment.getContent());
			map.put("code", "Success");

		} catch (SQLException e) {
			e.printStackTrace();
			try {
				conn.rollback();// 예외 발생 시 롤백...
			} catch (SQLException e1) {
				e1.printStackTrace();
			}
			map.put("code", "error");

		} finally {
			disconnect();
		}

		return map;
	}

	// 댓글 목록
	public List<HashMap<String, Object>> selectAll() {
		connect();
		List<HashMap<String, Object>> list = new ArrayList<HashMap<String, Object>>();
		try {
			// psmt와 차이점... ?못씁.
			stmt = conn.createStatement();
			rs = stmt.executeQuery("select * from comments order by id");
			while (rs.next()) {
				HashMap<String, Object> map = new HashMap<String, Object>();
				map.put("id", rs.getInt("id"));// rs이 가지고 있는 id컬럼 가지고 옴.
				map.put("name", rs.getString("name"));
				map.put("content", rs.getString("content"));
				list.add(map);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			disconnect();
		}
		return list;
	}
}
