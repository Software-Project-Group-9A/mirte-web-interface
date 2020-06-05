<template>
	<div>
    	<div class="container">
			<div class="row before-submit">
				<div class="col-lg-8 col-lg-offset-2">
					<h3>Hi! Please choose your wifi from the list.</h3>
				</div>
			</div>
			<div class="row before-submit">
				<div class="col-lg-8 col-lg-offset-2">
					<form class="form form-horizontal" id='connect-form' :action="'http://' + location.hostname + ':8080/connect'" method='post'>
						<div class="form-group">
							<label for="ssid-select" class="control-label col-lg-2">SSID</label>
							<div class="col-lg-6">
								<select id='ssid-select' class="form-control" name='ssid' @change="onChange($event)">
									<option v-for="n of networks" v-bind:key="n.ssid" :value="n.ssid" :data-security="n.security">{{n.ssid}}</option>
								</select>
							</div>
						</div>
						<div v-show="security == 'enterprise'" class="form-group" id="identity-group">
							<label for="identity" class="control-label col-lg-2">user</label>
							<div class="col-lg-6">
								<input class="form-control" name="identity"/>
							</div>
						</div>
						<div class="form-group">
							<label for="passphrase" class="control-label col-lg-2">passphrase</label>
							<div class="col-lg-6">
								<input type='password' class="form-control" name='passphrase'/>
							</div>
						</div>
						<div class="form-group">
							<div class="col-lg-6 col-lg-offset-2">
								<button type='submit' class='btn btn-success'>Connect</button>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div class="row hidden" id='submit-message'>
				<div class="col-lg-8 col-lg-offset-2">
					<h3>While changing networks</h3>
					<p>Your device will be temporarily offline. If connection is unsuccessful, the Access Point will be back up in a few minutes, and reloading this page will allow you to try again.</p>
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
		security: "wpa"
	}
  },
  methods: {
		onChange: function(event) {
			this.security = event.target.options[event.target.options.selectedIndex].dataset.security;
		}
  },
  mounted(){
    
    fetch(`http://${location.hostname}:8080/networks`, {
    	"method": "GET",
    	"mode": "cors"})
    .then(res => res.json())
    .then(data => {
		this.networks = data
    });

  }
}
</script>

