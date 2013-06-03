package db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class SeriesDatabase {
	
	private static final String DB_NAME = "SERIES_DB";
	private static final String DRIVER = "com.mysql.jdbc.Driver";
	private static final String URL = "jdbc:mysql://localhost/" + DB_NAME + "?user=root&password=password";
	
	private Connection conn;
	private Statement statement;
	
	public void connectDB() {
		try {
			Class.forName(DRIVER);
			conn = DriverManager.getConnection(URL);
			statement = conn.createStatement();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("Cannot connect to DB");
		}
	}

	public void closeDB() {
		try {
			statement.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("Cannot close DB");
		}
	}
	
	public void createDB() {
		String createDBString = "CREATE DATABASE IF NOT EXISTS SERIES_DB character set utf8";
		try {
			statement.executeUpdate(createDBString);
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("Cannot create DB");
		}
	}
	
	public void createTables() {
		String createMediaTableString = "CREATE TABLE IF NOT EXISTS Media (" +
											"id int not null AUTO_INCREMENT," +
											"eng_name varchar(255) default null," +
											"chinese_name varchar(255) default null," +
											"release_year int(4) default 0," +
											"eps_length int(4) default 0," +
											"location varchar(255) default null," +
											"status varchar(255) default null," +
											"media_type varchar(255) default null," +
											"media_subtype varchar(255) default null," +
											"PRIMARY KEY (id))";
		
		String createMediaAttrTableString = "CREATE TABLE IF NOT EXISTS MediaAttributes (" +
												"id int not null AUTO_INCREMENT," +
												"attr_name varchar(255) default null," +
												"attr_value varchar(255) default null," +
												"attr_format varchar(255) default null," +
												"m_id int not null," +
												"PRIMARY KEY (id)," +
												"FOREIGN KEY (m_id) REFERENCES Media(id))";
		
		try {
			statement.executeUpdate(createMediaTableString);
			statement.executeUpdate(createMediaAttrTableString);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println("Cannot create tables");
		}
	}
	
	public void insertMediaData(Media mediaInfo) {
		String insertDataString = String.format("INSERT INTO Media (eng_name, chinese_name, release_year, eps_length," +
				"location, status, media_type, media_subtype) VALUES ('%s', '%s', %d, %d, '%s', '%s', '%s', '%s')", mediaInfo.getEngName(),
				mediaInfo.getChineseName(), mediaInfo.getReleaseYear(), mediaInfo.getEpisodeLength(), mediaInfo.getLocation(),
				mediaInfo.getStatus(), mediaInfo.getMediaType(), mediaInfo.getMediaSubType());
		try {
			statement.executeUpdate(insertDataString);
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("Cannot insert data into Media table");
		}
	}
	
	public Media processRow(ResultSet rs) {
		Media mediaInfo = null;
		try {
			mediaInfo = new Media(rs.getInt("id"),
										rs.getString("eng_name"),
										rs.getString("chinese_name"),
										rs.getInt("release_year"),
										rs.getInt("eps_length"),
										rs.getString("location"),
										rs.getString("status"),
										rs.getString("media_type"),
										rs.getString("media_subtype"));
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("Cannot read resultset: " + rs.toString());
		}
		return mediaInfo;
	}
 
	public Statement getStatement() {
		return statement;
	}

	public Connection getConn() {
		return conn;
	}

	
	public ArrayList<Media> findAll() {
		ArrayList<Media> mediaList = new ArrayList<Media>();
		String query = "SELECT * from Media ORDER BY release_year";
		try {
			ResultSet rs = statement.executeQuery(query);
			while (rs.next()) {
				mediaList.add(processRow(rs));
			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("Cannot execute query: " + query);
		}
		return mediaList;
	}
	
	public Media findById(int id) {
		Media media = null;
		String query = "SELECT * from Media where id = ?";
		try {
			PreparedStatement ps = conn.prepareStatement(query);
			ps.setInt(1, id);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				media = processRow(rs);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("Cannot execute query: " + query);
		}
		return media;
	}
	
	public ArrayList<Media> findByStatus(String status) {
		ArrayList<Media> mediaList = new ArrayList<Media>();
		String query = "SELECT * from Media where status = ?";
		try {
			PreparedStatement ps = conn.prepareStatement(query);
			ps.setString(1, status);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				mediaList.add(processRow(rs));
			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("Cannot execute query: " + query);
		}
		return mediaList;
	}
}
