package db;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;


public class importexport {
	
	public static final String FILENAME = "Collection.txt";
//	public static final String FILENAME = "test.txt";
	
	public static void loadMediaTable(String fileName, SeriesDatabase db) {
		File dataFile = new File(fileName);
		BufferedReader reader;
		try {
			reader = new BufferedReader(new FileReader(dataFile));
			String line = null;
			while ((line = reader.readLine()) != null) {
				String[] data = line.split(",");
				ArrayList<String> list = new ArrayList<String>();
				for (String s : data) {
					s = s.replace("'", "\\'");
					list.add(s.trim());
//					System.out.println(s);
				}
				try {
					Media mediaInfo = new Media(list);
//					System.out.println(mediaInfo.toString());
					db.insertMediaData(mediaInfo);
				} catch (NumberFormatException e) {
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		SeriesDatabase db = new SeriesDatabase();
		db.connectDB();
		db.createDB();
		db.createTables();
		loadMediaTable(FILENAME, db);
		db.closeDB();
	}

}
