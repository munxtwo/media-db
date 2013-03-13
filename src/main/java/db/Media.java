package db;

import java.util.ArrayList;

public class Media {
	
	private int id;
	private String engName;
	private String chineseName;
	private int releaseYear;
	private int episodeLength;
	private String location;
	private String status;
	private String mediaType;
	private String mediaSubType;
	
	public Media(ArrayList<String> data) {
		engName = data.get(0);
		chineseName = data.get(1);
		if (data.get(2).isEmpty()) {
			releaseYear = 0;
		}
		else {
			releaseYear = Integer.parseInt(data.get(2));
		}
		episodeLength = Integer.parseInt(data.get(3));
		location = data.get(4);
		status = null;
		mediaType = null;
		mediaSubType = null;
	}
	
	public Media(int id, String engName, String chineseName, int releaseYear, int episodeLength, String location, String status,
			String mediaType, String mediaSubType) {
		this.setId(id);
		this.engName = engName;
		this.chineseName = chineseName;
		this.releaseYear = releaseYear;
		this.episodeLength = episodeLength;
		this.location = location;
		this.status = status;
		this.mediaType = mediaType;
		this.mediaSubType = mediaSubType;
	}
	
	public String getEngName() {
		return engName;
	}
	public void setEngName(String engName) {
		this.engName = engName;
	}
	public String getChineseName() {
		return chineseName;
	}
	public void setChineseName(String chineseName) {
		this.chineseName = chineseName;
	}
	public int getReleaseYear() {
		return releaseYear;
	}
	public void setReleaseYear(int releaseYear) {
		this.releaseYear = releaseYear;
	}
	public int getEpisodeLength() {
		return episodeLength;
	}
	public void setEpisodeLength(int episodeLength) {
		this.episodeLength = episodeLength;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMediaType() {
		return mediaType;
	}

	public void setMediaType(String mediaType) {
		this.mediaType = mediaType;
	}

	public String getMediaSubType() {
		return mediaSubType;
	}

	public void setMediaSubType(String mediaSubType) {
		this.mediaSubType = mediaSubType;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String toString() {
		return String.format("Media info: %s, %s, %d, %d, %s, %s, %s, %s", engName, chineseName, releaseYear, episodeLength,
				location, status, mediaType, mediaSubType);
	}

}
