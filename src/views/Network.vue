<template>
	<div>
    	<div class="container">

			<h1 class="mb-5">Netwerk</h1>

			<div class="layoutbox rounded">
				<div class="text-white p-2 h3 layoutbox-title w-100 background-primary">
					Kies een netwerk
				</div>

				<div class="layoutbox-content">

					<div class="row before-submit">
						<div class="col-lg-8 col-lg-offset-2">
							<form class="form form-horizontal" id='connect-form' :action="`http://${hostname}:8080/connect`" method='post'>
								<div class="form-group">
									<label for="ssid-select" class="control-label col-lg-2">Netwerk naam</label>
									<div class="col-lg-6">
										<select id='ssid-select' class="form-control" name='ssid' @change="onChange($event)" v-model="selected.ssid">
											<option v-for="n of networks" v-bind:key="n.ssid" :value="n.ssid" :data-security="n.security">{{n.ssid}}</option>
										</select>
									</div>
								</div>
								<div v-show="security == 'enterprise'" class="form-group" id="identity-group">
									<label for="identity" class="control-label col-lg-2">user</label>
									<div class="col-lg-6">
										<input class="form-control" name="identity" v-model="selected.identity"/>
									</div>
								</div>
								<div class="form-group">
									<label for="passphrase" class="control-label col-lg-2">wachtwoord</label>
									<div class="col-lg-6">

					
									<input :type="passwordFieldType" class="form-control" name="passphrase" v-model="selected.password">
									<!-- shows the password -->
									<a @click="toggleVisibility()" >hide/show</a>


									</div>
								</div>
								<div class="form-group">
									<div class="col-lg-6 col-lg-offset-2">
										<button @click="connect" type="button" class="btn btn-success">connect</button>
									</div>
								</div>
							</form>
						</div>
					</div>
					<div class="row hidden" id='submit-message'>
						<div class="col-lg-8 col-lg-offset-2">
							<p>Tijdens het verwisselen van het netwerk gata zoef even offline. Als het verbinden mislukt zal het verbindingspunt van Zoef vanzelf weer online komen. Als zoef niet meer online komt dat is het verbinden gelukt.</p>
						</div>
					</div>

				</div>
			</div>


		</div>
	</div>
</template>

<script>

// real world test data
// [{"ssid":"TP-LINK_2159","security":"wpa"},{"ssid":"Snelle wifi 5 euro op je muil","security":"wpa"},{"ssid":"Wifi en Adriaan","security":"wpa"},{"ssid":"ASUS_68_2G","security":"wpa"},{"ssid":"MICHAEL32","security":"wpa"},{"ssid":"DIRECT-5F-HP ENVY 7640 series","security":"wpa"},{"ssid":"DIRECT-G2DESKTOP-3CIBGTRmsMP","security":"wpa"},{"ssid":"Arashi 2.4GHz","security":"wpa"},{"ssid":"EMIL WIFI 2.4GHZ","security":"wpa"},{"ssid":"SystemMeltdown_Delft","security":"wpa"},{"ssid":"dlink","security":"wpa"},{"ssid":"edimax_2.4G_53F27E","security":"wpa"},{"ssid":"Geen wifi","security":"wpa"},{"ssid":"Cisco1905 2.4GHz","security":"wpa"},{"ssid":"Sitecom255D02","security":"wpa"},{"ssid":"Ik weet het nu wel","security":"wpa"}]

export default {
  data: function () {
    return {
	networks: [],
        security: "wpa",
	hostname: "",
        selected: {password: "", ssid: "", identity: ""},
        passwordFieldType: "password"
    }
  },
  methods: {
		onChange: function(event) {
			this.security = event.target.options[event.target.options.selectedIndex].dataset.security;
		}, 
		toggleVisibility() {
			this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
		},
		connect() {
				var data = new FormData();
				data.append("ssid", this.selected.ssid );
				data.append("identity", this.selected.identity );
				data.append("passphrase", this.selected.password );
				fetch(`http://192.168.42.1:8080/connect`, {
						"method": "POST",
						"mode": "cors",
						"body": data})
						.then(console.log("send"))
						.then(data => {
									console.log('received');
						});

		}

  },
  mounted(){
    
    fetch(`http://${location.hostname}:8080/networks`, {
    	"method": "GET",
    	"mode": "cors"})
    .then(res => res.json())
    .then(data => {
		this.networks = data.filter(v=>v.ssid!="");
        });

	this.hostname = location.hostname

  }
}
</script>

