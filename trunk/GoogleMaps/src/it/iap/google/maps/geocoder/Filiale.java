package it.iap.google.maps.geocoder;

public class Filiale {

	private String banca;
	private String nome;
	private String indirizzo;
	private float lat;
	private float lng;
	
	public Filiale() {
	}
	
	public Filiale(String banca, String nome, String indirizzo) {
		setBanca(banca);
		setNome(nome);
		setIndirizzo(indirizzo);
	}
	
	public String getBanca() {
		return banca;
	}
	public void setBanca(String banca) {
		this.banca = escape(banca);
	}
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = escape(nome);
	}
	
	public String getIndirizzo() {
		return indirizzo;
	}
	public void setIndirizzo(String indirizzo) {
		this.indirizzo = escape(indirizzo);
	}
	
	public float getLat() {
		return lat;
	}
	public void setLat(float lat) {
		this.lat = lat;
	}
	
	public float getLng() {
		return lng;
	}
	public void setLng(float lng) {
		this.lng = lng;
	}
	
	public String toString() {
		return "BANCA: " + banca + " - NOME FILIALE: " + nome + " - INDIRIZZO: " + indirizzo +" - LAT: " + lat + " LNG: " + lng; 
	}
	
	public String toCsv() {
		return banca + ";" + nome + ";" + indirizzo + ";" + lat + ";" + lng;
	}
	
	private String escape(String s) {
		return s.replaceAll("�", "a'").replaceAll("�", "e'").replaceAll("�", "e'").replaceAll("�", "i'").replaceAll("�", "o'").replaceAll("�", "u'").replaceAll("�", "A'").replaceAll("�", "E'").replaceAll("�", "E'").replaceAll("�", "I'").replaceAll("�", "O'").replaceAll("�", "U'");
	}
}
