
//TODO import properly ./service/UI/UIEvents instead of redefining
var destroyIfFired = {

    HANGUP: "UI.hangup",
    LOGOUT: "UI.logout",
};
var updateIfFired = {
    //NICKNAME_CHANGED: "UI.nickname_changed",
    SELECTED_ENDPOINT: "UI.selected_endpoint",
    PINNED_ENDPOINT: "UI.pinned_endpoint",
    /**
     * Notifies that local user created text message.
     */
    //MESSAGE_CREATED: "UI.message_created",
    /**
     * Notifies that local user changed language.
     */
    //LANG_CHANGED: "UI.lang_changed",
    /**
     * Notifies that local user changed email.
     */
    //EMAIL_CHANGED: "UI.email_changed",
    /**
     * Notifies that "start muted" settings changed.
     */
    /*START_MUTED_CHANGED: "UI.start_muted_changed",
    AUDIO_MUTED: "UI.audio_muted",
    VIDEO_MUTED: "UI.video_muted",*/
    ETHERPAD_CLICKED: "UI.etherpad_clicked",
    SHARED_VIDEO_CLICKED: "UI.start_shared_video",
    /**
     * Updates shared video with params: url, state, time(optional)
     * Where url is the video link, state is stop/start/pause and time is the
     * current video playing time.
     */
    UPDATE_SHARED_VIDEO: "UI.update_shared_video",
    ROOM_LOCK_CLICKED: "UI.room_lock_clicked",
    //USER_INVITED: "UI.user_invited",
    //USER_KICKED: "UI.user_kicked",
    REMOTE_AUDIO_MUTED: "UI.remote_audio_muted",
    FULLSCREEN_TOGGLE: "UI.fullscreen_toggle",
    AUTH_CLICKED: "UI.auth_clicked",
    TOGGLE_CHAT: "UI.toggle_chat",
    TOGGLE_SETTINGS: "UI.toggle_settings",
    TOGGLE_CONTACT_LIST: "UI.toggle_contact_list",
    /**
     * Notifies that a command to toggle the film strip has been issued. The
     * event may optionally specify a {Boolean} (primitive) value to assign to
     * the visibility of the film strip (i.e. the event may act as a setter).
     * The very toggling of the film strip may or may not occurred at the time
     * of the receipt of the event depending on the position of the receiving
     * event listener in relation to the event listener which carries out the
     * command to toggle the film strip.
     *
     * @see {TOGGLED_FILM_STRIP}
     */
    TOGGLE_FILM_STRIP: "UI.toggle_film_strip",
    /**
     * Notifies that the film strip was (actually) toggled. The event supplies
     * a {Boolean} (primitive) value indicating the visibility of the film
     * strip after the toggling (at the time of the event emission).
     *
     * @see {TOGGLE_FILM_STRIP}
     */
    TOGGLED_FILM_STRIP: "UI.toggled_film_strip",
    TOGGLE_SCREENSHARING: "UI.toggle_screensharing",
    TOGGLED_SHARED_DOCUMENT: "UI.toggled_shared_document",
    CONTACT_CLICKED: "UI.contact_clicked",
    //RECORDING_TOGGLED: "UI.recording_toggled",
    //SIP_DIAL: "UI.sip_dial",
    SUBJECT_CHANGED: "UI.subject_changed",
    VIDEO_DEVICE_CHANGED: "UI.video_device_changed",
    AUDIO_DEVICE_CHANGED: "UI.audio_device_changed",
    /**
     * Notifies interested listeners that the follow-me feature is enabled or
     * disabled.
     */
    FOLLOW_ME_ENABLED: "UI.follow_me_enabled"
}

var no_animation_rules = "* {\
\
 -o-transition-property: none !important; \
 \
 -moz-transition-property: none !important; \
 \
 -ms-transition-property: none !important; \
 \
 -webkit-transition-property: none !important; \
 \
 transition-property: none !important; \
 \
 \
 \
 -o-transform: none !important; \
 \
 -moz-transform: none !important; \
 \
 -ms-transform: none !important; \
 \
 -webkit-transform: none !important; \
 \
 transform: none !important; \
 \
 \
 -webkit-animation: none !important; \
 \
 -moz-animation: none !important; \
 \
 -o-animation: none !important; \
 \
 -ms-animation: none !important; \
 \
 animation: none !important; \
 \
}";

var largeVideo = null;

onDOMReady = function()
{
	if(isiOSRTC === true)
	{	
	}
}

onRTCReady = function()
{
	if(isiOSRTC === true)
	{
		
		config.alwaysVisibleToolbar =  true;
		//interfaceConfig.FILM_STRIP_MAX_HEIGHT =  160;
		
		//handle JitsiMeet HANGUP i.e. Changing location => reload jitsi_index.html
		//cordova-plugin-iosrtc need to be destroyed properly
		//so we delete the part of html to activate destroying callbacks on cordova side
		function destroyVideosOnPathChange()
		{
			var videoSpace = document.getElementById("videoconference_page");
			videoSpace.remove();
		}
		
		//Fix, largeVideo displayed at the top and masks everything
		largeVideo = document.getElementById("largeVideo");
		largeVideo.style.top = "10%";
		largeVideo.style.height = "70%";
		
		cordova.plugins.iosrtc.refreshVideos();
		
		//handle video changes
		 window.addEventListener("orientationchange", function () {
			console.log("iOSRTCApp >>> orientationchange event");
			updateVideos();
		  });
		  
		 window.updateVideos = function () {
			console.log("iOSRTCApp >>> update iosrtc videos");
			// NOTE: hack, but needed due to CSS transitions and so on.
			[0/*, 500, 1000*/, 1500, 3000].forEach(function (delay) {
			  setTimeout(function () {
				  
				cordova.plugins.iosrtc.refreshVideos();
			  }, delay);
			});
			
			
		  };
		  
		 //adding video destroying events
		for(var key in destroyIfFired)
		{
		  var value = destroyIfFired[key];
			 APP.UI.addListener(value, function(e) {
				destroyVideosOnPathChange();
			});
		}
		/*

		//adding video updating events
		for(var key in updateIfFired)
		{
		 
			
			  
			 APP.UI.addListener(value, function(e) { 
			 var value = updateIfFired[key];
			
				updateVideos();
			});
		}*/
	}
	
}