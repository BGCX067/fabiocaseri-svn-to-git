package it.iap.google.maps.geocoder;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.sojo.interchange.AbstractSerializer;
import net.sf.sojo.interchange.json.JsonSerializer;

public class BPUMain {

	private static final String GEOCODER_URL = "http://maps.google.com/maps/geo?";
	private static final String GOOGLE_MAPS_KEY = "ABQIAAAA-_cOmkVl3ACZ0B0AB_l5fRT2yXp_ZAY8_ufC3CFXhHIE1NvwkxQehl_gUGkqjFpHtCIlmTGbg0CdrA";
	private static final String GEOCODER_OUT_TYPE = "csv";
	private static final String ENC_TYPE = "UTF-8";
	private static final String INPUT_FILE = "bpu_input.txt";
	private static final String OUTPUT_FILE = "bpu_output.txt";
	private static final String JSON_FILE = "web/bpu_json.txt";
	private static final String ERROR_FILE = "bpu_error.txt";
	
	public static void main(String[] args) throws Exception {
		if(args.length > 0) {
			BufferedReader reader = new BufferedReader(new FileReader(new File(INPUT_FILE)));
			String line = null;
			ArrayList<Filiale> list = new ArrayList<Filiale>();
			ArrayList<String> errorList = new ArrayList<String>();
			int i = 1;
			while((line = reader.readLine()) != null) {
				String[] params = line.split(";");
				String nome = params[1].trim();
				String indirizzo = params[2].replaceAll(",", "").trim() + ", " + params[3].trim() + ", " + params[4].trim() + " (" + params[5] + "), Italy";
				System.out.println(i + " - " + indirizzo);
				Filiale filiale = new Filiale(params[0], nome, indirizzo);
				URL url = new URL(GEOCODER_URL + "q=" + URLEncoder.encode(indirizzo, ENC_TYPE) + "&output=" + GEOCODER_OUT_TYPE + "&key=" + GOOGLE_MAPS_KEY);
				System.out.println(url);
				URLConnection conn = url.openConnection();
				BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
				String result = in.readLine();
				System.out.println(result);
				String resultArray[] = result.split(",");
				if(Integer.parseInt(resultArray[0], 10) != 200) {
					System.err.println(params[0] + " - " + nome + " - " + indirizzo);
					errorList.add(i + " - " + params[0] + " - " + nome + " - " + indirizzo);
				} else {
					filiale.setLat(Float.parseFloat(resultArray[2]));
					filiale.setLng(Float.parseFloat(resultArray[3]));
					list.add(filiale);
				}
				in.close();
				Thread.sleep(300);
				i++;
			}
			reader.close();
			PrintWriter wr = new PrintWriter(new FileWriter(new File(OUTPUT_FILE)));
			Iterator<Filiale> fit = list.iterator();
			while(fit.hasNext()) {
				wr.println(fit.next().toCsv());
			}
			wr.close();
			wr = new PrintWriter(new FileWriter(new File(ERROR_FILE)));
			Iterator<String> it = errorList.iterator();
			while(it.hasNext()) {
				wr.println(it.next());
			}
			wr.close();
		} else {
				BufferedReader reader = new BufferedReader(new FileReader(new File(OUTPUT_FILE)));
				String line = null;
				ArrayList<Filiale> list = new ArrayList<Filiale>();
				while((line = reader.readLine()) != null) {
					String[] params = line.split(";");
					Filiale filiale = new Filiale(params[0], params[1], params[2]);
					filiale.setLat(Float.parseFloat(params[3]));
					filiale.setLng(Float.parseFloat(params[4]));
					list.add(filiale);
				}
				AbstractSerializer serializer = new JsonSerializer();
				Map<String, List> outMap = new HashMap<String, List>();
				outMap.put("filiali", list);
				String output = (String) serializer.serialize(outMap);
				FileWriter writer = new FileWriter(new File(JSON_FILE));
				writer.write(output);
				writer.close();
			}
		System.out.println("DONE!");
	}
	
}