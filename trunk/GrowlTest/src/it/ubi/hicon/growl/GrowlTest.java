package it.ubi.hicon.growl;

import com.growl.Growl;

public class GrowlTest {

	private static final boolean MAC_OS_X = System.getProperty("os.name").toLowerCase().startsWith("mac os x");

	public static void main(String[] args) {
		// Controllo se siamo effettivamente su Mac OS X
		if (MAC_OS_X) {
			// Le mie varie azioni registrate in Growl che posso notificare
			// posso metterne quante ne voglio
			String[] myAlerts = { "Running", "Down" };
			// Prendo l'istanza di Growl
			Growl growl = new Growl("HiconBus", myAlerts, myAlerts);
			// Registro la mia applicazione se non è già stato fatto
			growl.register();
			try {
				// Provo a notificare qualcosa
				growl.notifyGrowlOf("Running", "HiconBus up", "Server is up and running");
				Thread.sleep(5000);
				growl.notifyGrowlOf("Down", "HiconBus down", "Server stopped gracefully");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

}
