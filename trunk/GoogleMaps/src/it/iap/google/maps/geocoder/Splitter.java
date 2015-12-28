package it.iap.google.maps.geocoder;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.sojo.interchange.AbstractSerializer;
import net.sf.sojo.interchange.json.JsonSerializer;

public class Splitter {

	private static final String BANK = "bpi";
	private static final String INPUT_FILE = "web/bl_json.txt";
	private static final String OUTPUT_FILE = "web/" + BANK +".json";
	
	public static void main(String[] args) throws Exception {
		BufferedReader reader = new BufferedReader(new FileReader(new File(INPUT_FILE)));
		String line = reader.readLine();
		reader.close();
		AbstractSerializer serializer = new JsonSerializer();
		Map<String, List> map = new HashMap<String, List>();
		map = (Map<String, List>) serializer.deserialize(line);
		ArrayList<Filiale> list = new ArrayList<Filiale>();
		list = (ArrayList<Filiale>) map.get("filiali");
		Iterator<Filiale> it = list.iterator();
		ArrayList<Filiale> outList = new ArrayList<Filiale>();
		while(it.hasNext()) {
			Filiale fil = it.next();
			if(BANK.toUpperCase().equals(fil.getBanca().toUpperCase())) {
				outList.add(fil);
			}
		}
		Map<String, List> outMap = new HashMap<String, List>();
		outMap.put("filiali", outList);
		String output = (String) serializer.serialize(outMap);
		System.out.println(output);
		FileWriter writer = new FileWriter(new File(OUTPUT_FILE));
		writer.write(output);
		writer.close();
		System.out.println(outList.size());
	}
	
}
