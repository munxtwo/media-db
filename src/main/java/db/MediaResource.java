package db;

import java.util.ArrayList;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/media")
public class MediaResource {

	SeriesDatabase db = new SeriesDatabase();
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public ArrayList<Media> findAll() {
		db.connectDB();
		ArrayList<Media> mediaList = db.findAll();
		db.closeDB();
		return mediaList;
	}
	
	@GET @Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Media findById(@PathParam("id") String id) {
		db.connectDB();
		Media media = db.findById(Integer.parseInt(id));
		db.closeDB();
		return media;
	}
	
	@GET @Path("status/{status}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public ArrayList<Media> findByStatus(@PathParam("status") String status) {
		db.connectDB();
		ArrayList<Media> media = db.findByStatus(status);
		db.closeDB();
		return media;
	}
	
}
