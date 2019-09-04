/*
 * Copyright (c) 2012-14 Meetup
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE."
 */
window.mu = window.mu || {};

(function() {
   if(!Array.prototype.filter) {
     Array.prototype.filter = function(f) {
       "use strict";
       if(this === null || this === undefined) {
         throw new TypeError();
       }
       var t = Object(this), l = t.length >>> 0;
       if(typeof f !== 'function') {
         throw new TypeError();
       }
       var res = [], thisp = arguments[1];
       for(var i = 0; i < l; i++) {
         if (i in t) {
           var val = t[i];
           if(f.call(thisp, val, i, t)) {
             res.push(val);
           }
         }
       }
       return res;
     };
   }

   var Domains = {
     auth: "https://secure.meetup.com/oauth2/authorize"
     , api: "https://api.meetup.com"
     , proxy: "https://api.meetup.com/api_xd.html"
     , site: "https://www.meetup.com"
     , logout: "https://secure.meetup.com/logout"
   }
   , Assets = {
       defaultImage: "http://photos4.meetupstatic.com/photos/member/8/2/4/a/thumb_11733354.jpeg"
       , json2: "https://secure.meetup.com/script/Meetup/api/json2.js"
       , jquery: "https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"
   }
   , OAuthOptions = {
       scopes: ['ageless']
   }
   /* FIXME */
   , GlobalVars = {}

   /** Provides persistance. defaults to localStorage, falling back on memory */
   , Store = (function(){
     var ls = 'localStorage' in window && window['localStorage'] !== null ? localStorage : null, m = {};
     return ls ? {
       get: function(k) { return ls[k]; }
       , set: function(k, v) { ls[k] = v; }
       , del: function(k) { ls.removeItem(k); }
       , clear: function() { ls.clear(); }
     } : {
       get: function(k) { return m[k]; }
       , set: function(k, v) { m[k] = v; }
       , del: function(k) { delete m[k]; }
       , clear: function() { m = {}; }
     };
   })()

   /** Provides access copy. Simple uses provide access through k-v means
    *  C('my-template'). Templates with place holders are referenced by arg index
    *  C('my-template', 'arg1', 'arg2') */
   , C = (function() {
       var defaultlang = 'en'
       /** tmpl templates may have place holders denoted as {0} ... {n}. */
       , tmpl = function(txt) {
           return function() {
             var args = arguments[0] instanceof Array ? arguments[0] : Array.prototype.slice.call(arguments);
             for(var i = 0, l = args.length;i<l;i++) {
               txt = txt.replace(new RegExp('\\{'+i+'}', 'g'), args[i]);
             }
             return txt;
          };
       }
       , copy = {
         'en' : {
           'awaitingapproval':'Your request to join is pending approval.<br/>{0}'
           , 'cancel-create-profile-btn':'Maybe later'
           , 'create-profile-btn': 'Create Profile'
           , 'create-profile-validation-fail': 'Please answer questions in red'
           , 'did-go':'Glad you made it.'
           , 'evt-not-visible': 'Sorry, this Meetup must be private.'
           , 'group-join-closed': 'Sorry, this Meetup is closed to new members'
           , 'invite-explained': 'You must be invited by the Organizer of this particular Meetup. {0}'
           , 'invite-code' : 'Invitation code'
           , 'join-btn': '<strong>Join</strong> this group to RSVP'
           , 'logout': 'Log out of Meetup'
           , 'logging-out': 'Logging out of Meetup...'
           , 'no-waitlist': 'There is no waitlist'
           , 'paymentreq':'RSVP and pay on Meetup &rarr;'
           , 'profile-intro':'Introduce yourself'
           , 'profile-invalid-answer':'Invalid answer'
           , 'profile-invalid-url': 'Invalid url'
           , 'profile-invalid-inv-code': 'Invalid invitation code'
           , 'profile-invalid-general':'Could not create Group profile'
           , 'requires-photo': 'This group requires a photo. Try uploading one on {0}'
           , 'rsvp-question' : 'Will you attend?'
           , 'rsvp-yes-btn':'Yes'
           , 'rsvp-no-btn': 'No'
           , 'rsvp-switch-to-no-btn': 'Change RSVP'
           , 'rsvp-switch-to-yes-btn': 'Change RSVP'
           , 'rsvp-want-to-wait-btn': 'Put me on the waitlist'
           , 'rsvpd-no': "I'm not attending"
           , 'rsvpd-yes': "I'm attending"
           , 'rsvp-btn': '<strong>RSVP</strong> with Meetup'
           , 'rsvps-open-at': 'RSVPS open<br/> {0}'
           , 'rsvps-closed': 'RSVPS CLOSED'
           , 'rsvps-full': 'RSVPS FULL'
           , 'upto-on-mu': 'See what else this group is up to on Meetup &rarr;'
           , 'waitlisted':'On the waitlist'
         }
       };
       /** takes var args. first arg assumed to be name of copy */
       return function() {
         var args = Array.prototype.slice.call(arguments)
         , name = args.shift(), l = defaultlang;
         return copy[l] ?
          (copy[l][name] ?
            (args.length ? tmpl(copy[l][name])(args)
            : copy[l][name]) : "copy not found " + name)
          : "unsupported language " + l;
       };
   })()

   /** Provides simple UI templating. Templates are referenced as functions that may or may not
    *  accecpt arguments T.foo(), T.bar(baz, boom) */
   , T = {
     thumb: function(img) {
       return img || Assets.defaultImage;
     }
     , style: function(css) {
       return ['<style type="text/css">', css, '</style>'].join('');
     }
     , safe: function(raw) {
         return raw.replace(/</g, '&lt;').replace(/>/g, '&gt;');
     }
     // on Mon Jan 2 @ 6pm
     , date: function(time) {
       var DAYS = {0:'Sunday',1:'Monday',2:'Tuesday',3:'Wednesday',4:'Thursday',5:'Friday',6:'Saturday'}
       , MON = {0:'Jan',1:'Feb',2:'Mar',3:'Apr',4:'May', 5:'June', 6:'July',7:'Aug',8:'Sep',9:'Oct',10:'Nov',11:'Dec'}
       , d = new Date(time)
       , hrs = function(h) { return h > 12 ? h - 12 : h; }
       , mins = function(m) { return m ? ':' + ("0" + m).substr(-2,2) : ''; };
       return time ? [DAYS[d.getDay()]
                      , ' '
                      , MON[d.getMonth()]
                      , ' '
                      , d.getDate()
                      , ' @ '
                      , hrs(d.getUTCHours())
                      , mins(d.getUTCMinutes())
                      , (d.getUTCHours() > 11 ? 'pm' : 'am')].join('') : '';
     }
     , css: function() {
         return ['.mu-widget :-moz-any-link:focus {outline:none;}'
              , '.mu-clearfix:after{content:".";display:block;clear:both;visibility:hidden;line-height:0;height:0}.mu-clearfix{display:inline-block}html[xmlns] .mu-clearfix{display:block}* html .mu-clearfix{height:1%}'
              , '.mu-widget * {margin:0;padding:0;}'
              , '.mu-widget { position:relative; display:inline-block;}'
              , '.mu-widget a:active { top:0; right:0; bottom:0; left:0; margin:0; padding:0;}'
              , '.mu-widget img, .mu-rsvp-btn img { width:auto; border-radius:0 !important; }'
              , '.mu-widget .prompt {position:absolute;margin-top:-2px; z-index:9999;}'
              , '.mu-widget .logout-container { text-align:right; }'
              , '.mu-widget .interact {background:#eee; clear:both; margin:.5em 0 0 0; padding:1em .5em;}'
              , '.mu-widget .interact a { font-weight:bold;}'
              , '.mu-widget .interact .pad { padding:.5em 0;}'
              , '.mu-widget textarea, .mu-widget input[type="text"] {width:95%;font-family:verdana,sans-serif;color:#333;font-weight:bold;'
              , 'border:3px solid #eee;-webkit-border-radius: 5px;-moz-border-radius: 5px; border-radius: 5px;font-size:12px; padding:.25em;}'
              , '.mu-widget textarea:focus {border:3px solid #BFDFFF;}'
              , '.mu-widget .q {margin:.5em 0;}'
              , '.mu-widget a:hover { color:#007AB3;}'
              , ' .mu-widget a.mu-a:link, .mu-widget a.mu-a:visited, .mu-widget .mu-event-details a:link,'
              , '.mu-widget .mu-event-details a:visited {'
              , '  color:#fff; text-shadow:#333 0px 0px 1px;font-family:verdana,geneva,sans-serif;font-size:11px;'
              , '  background:#eee; padding:.5em;-webkit-border-radius: 5px; margin-top:15px;'
              , '  -moz-border-radius: 5px;border-radius: 5px;'
              , "  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#F10044', endColorstr='#AD0000');"
              , '  background: -webkit-gradient(linear, left top, left bottom, from(#F10044), to(#AD0000));'
              , '  background: -moz-linear-gradient(top, #F10044, #AD0000);}'
              , '.mu-widget .profile-frm { margin-bottom:1em;}'
			  , '.mu-widget .profile-frm .err textarea, .mu-widget .profile-frm .err input[type="text"] { border:1px solid red;}'
			  , '.mu-widget .profile-frm-errs { color:red; font-weight:bold; }'
              , '.mu-widget .profile-frm .rstar { color:red; }'
              , '.mu-widget a:link, .mu-widget a:visited, .mu-widget a { color:#3987CB; text-decoration:none; }'
              , '.mu-widget .actns {float:right;}'
              , '.mu-widget .actns-centered {text-align:center;}'
              , '.mu-widget .going a, .mu-widget .going a:link, .mu-widget .going a:visited, .mu-widget .going a:hover {color:transparent; height:48px; width:48px; display:block;float:left; margin-right:5px;}'
              , '.mu-widget .going .mimg { background:#eee; text-align:center;'
              , '  -moz-border-radius: 3px;-webkit-border-radius: 3px;border-radius: 3px; padding:2px; display:block; overflow:hidden; }'
              , '.mu-widget .going .mimg:hover {background:#ccc;}'
              , '.mu-widget .yep, .mu-widget .nope {width:100%;}'
              , '.mu-widget .yep .in, .mu-widget .yep .waiting { color:#fff; font-weight:bold; text-shadow:0 1px #333; background:#62AC75;'
              , ' padding:.5em 1em; -moz-box-shadow:1px 1px 3px 0 rgba(0, 0, 0, 0.5) inset;'
              , ' -webkit-box-shadow:1px 1px 3px 0 rgba(0, 0, 0, 0.5) inset; box-shadow:1px 1px 3px 0 rgba(0, 0, 0, 0.5) insert;'
              , ' -webkit-border-radius:3px;-moz-border-radius:3px; border-radius:3px;}'
              , '.mu-widget .nope .out {color:#333; font-weight:bold; text-shadow:0 1px #eee; background:#ccc;'
              , ' padding:.5em 1em; -moz-box-shadow:1px 1px 3px 0 rgba(0, 0, 0, 0.5) inset;'
              , ' -webkit-box-shadow:1px 1px 3px 0 rgba(0, 0, 0, 0.5) inset; box-shadow:1px 1px 3px 0 rgba(0, 0, 0, 0.5) insert;'
              , ' -webkit-border-radius:3px;-moz-border-radius:3px; border-radius:3px;}'
              , '.mu-widget .mu-yn .rsvp-q { font-weight:bold;}'
              , '.mu-widget strong { font-weight:bold; } '

              // default btns are red
              , '.mu-widget a.btn:link, .mu-widget a.btn:visited {'
              , '  text-decoration:none; font-weight:bold; color:#fff; text-shadow: 0 1px #333;'
              , '  -webkit-border-radius: 5px;-moz-border-radius: 5px; border-radius: 5px;'
              , '  background:#F10044; border:1px solid #AD0000;'
              , "  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#F10044', endColorstr='#AD0000');"
              , '  background: -webkit-gradient(linear, left top, left bottom, from(#F10044), to(#AD0000));'
              , '  background: -moz-linear-gradient(top,  #F10044, #AD0000); padding:.4em .5em;}'
              , '.mu-widget a:hover {color:#007AB3;}'
              , '.mu-widget a.btn:hover {'
              , '  background: -moz-linear-gradient(center top, #FB0A52, #B7000E) repeat scroll 0 0 #B7000E;'
              , '  border: 1px solid #B7000E;'
              , '  text-decoration: none;'
              , "  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FB0A52', endColorstr='#B7000E');"
              , '  background: -webkit-gradient(linear, left top, left bottom, from(#FB0A52), to(#B7000E));'
              , '  background: -moz-linear-gradient(top,  #FB0A52,  #B7000E);'
              , '}'

              // passive btns are grey
              , '.mu-widget a.btn.passive:link, .mu-widget a.btn.passive:visited {'
              , '  color:#fff; font-weight:bold; -moz-box-shadow: 0 0 5px #ccc;'
              , '  -webkit-box-shadow: 0 0 5px #ccc; box-shadow: 0 0 5px #ccc;'
              , '  border:1px solid #737070; text-shadow: 0 1px #333;'
              , "  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#999999', endColorstr='#737070');"
              , '  background: -webkit-gradient(linear, left top, left bottom, from(#999999), to(#737070));'
              , '  background: -moz-linear-gradient(top, #999999, #737070); padding:.4em .5em;}'

              , '.mu-widget a.mu-rsvp-btn:link, .mu-widget a.mu-rsvp-btn:visited, .mu-widget a.mu-rsvp-btn:hover {margin:0;padding:0; background:none; border:0;}'

              , '.mu-widget .tail {'
              , '  position:absolute; width:0;height:0;border-left:10px solid transparent;'
              , '  border-right:10px solid transparent;border-top:10px transparent;'
              , '  border-bottom:10px solid #ddd; z-index:1; top:-5px;}'
              , '.mu-widget .tip {'
              , '  position:absolute; width:0;height:0;border-left:10px solid transparent;'
              , '  border-right:10px solid transparent;border-top:10px solid transparent;'
              , '  border-bottom:10px solid #fff; margin-top:-6px;margin-left:-10px; z-index:99999; }'
              , '.mu-widget .mu-ev-details {'
              , '  margin-top:.3em; margin-left:-5px; background:#fff;overflow:hidden;'
              , '  font-family:verdana, sans-serif;padding:.5em; color:#333; font-size:12px; -webkit-border-radius: 5px;'
              , '  -moz-border-radius: 5px; border-radius: 5px; -moz-box-shadow: 0 0 5px #ccc;'
              , '  -webkit-box-shadow:0 0 5px #ddd; box-shadow:0 0 5px #ccc;width:270px;border:2px solid #ddd;position:absolute;}'

              , '.mu-widget .fee .fee-desc { font-size:90%; color:#ccc;}'
              , '.mu-widget .fee { color:#333; font-weight:bold; margin-bottom:.5em; padding-bottom:.5em; border-bottom:1px dotted #eee;}'
              , '.mu-widget .dets {margin-bottom:.5em; padding-bottom:.5em;border-bottom:1px dotted #eee;}'
              , '.mu-widget .mu-r-cnt {clear:both;font-weight:bold;}'
              , '.mu-widget .mu-e-name {font-weight:bold;font-size:110%;}'
             ].join('');
     }
     , a: function(url, txt) {
         return ['<a target="_blank" href="', url, '">', txt, '</a>'].join('');
     }
     , mua: function(path, txt) {
         return T.a(Domains.site + path, txt);
     }
     , grpa: function(g, txt) {
         return T.mua('/' + g.urlname + "/", T.safe(txt || g.name));
     }
     , vena: function(e) {
         return T.mua(['/' + e.group.urlname, 'venue', e.venue.id].join('/')+"?=event_id=" + e.id, T.safe(e.venue.name));
     }
     , eventVenue: function(e) {
         return e.venue ?
             ['<div class="mu-e-ven">', T.vena(e)
              , (e.venue.city ? ' '+T.safe(e.venue.city): ''), (e.venue.state? ', ' + T.safe(e.venue.state):'')
              , '</div> '].join('') : '';
     }
     , attending: function(c) {
         return c ? ['<span class="n">', c ,'</span> attending'].join('') : '';
     }
     , attended: function(c) {
         return c ? ['<span class="n">', c, '</span> attended'].join('') : '';
     }
     , btn: function(txt,cls) {
         return ['<a href="javascript:void(0)" class="btn'+ (cls?' '+cls:'')+'">',txt,'</a>'].join('');
     }
     , box: function(content) {
         return ['<div class="mu-ev-details">'
                 , content
                 , '<div class="logout-container"><a href="javascript:void(0)" class="mu-logout">'
                 , C('logout')
                 , '</div>'
                 , '</div><div class="tail"><div class="tip"/></div>'].join('');
     }
     , notfound: function(url) {
         return T.box(C('evt-not-visible'));
     }
     , feeInfo: function(e) {
         return e && e.fee ? ['<div class="fee">'
                              , e.fee.label || ''
                              , ' '
                              , (e.fee.currency==='USD'?'$':''), Math.round(e.fee.amount*1000)/1000
                              , (e.fee.currency==='USD'?'':e.fee.currency)
                              , '<span class="fee-desc">/'
                              , T.safe(e.fee.description)
                              , '</span></div>'].join('') : '';
     }
     , eventDetails: function(e, closed, content) {
       return T.box(
              ['<div class="dets">'
                 , '<div class="mu-e-name">', T.a(e.event_url, T.safe(e.name)), '</div>'
               , '<div class="mu-e-time">', T.date(e.time + e.utc_offset), '</div>'
                 , T.eventVenue(e)
                 , '</div>'
                 , T.feeInfo(e)
                 , '<div class="going"><div class="yes-pics mu-clearfix"></div><div class="mu-r-cnt">'
                 , T.attending(e.yes_rsvp_count)
                 , (closed ? ' ' + (closed === 4 ? C('rsvps-full') : C('rsvps-closed')) : '')
                 , '</div></div>'
                 , '<div class="interact">', (content || 'fill me in'), '</div>'].join(''));
     }
     , pastEventDetails: function(e, content) {
       return T.box(
              ['<div class="dets">'
                 , '<div class="mu-e-time">On '
                 , T.date(e.time + e.utc_offset)
                 , '</div> ', T.attended(e.yes_rsvp_count),
                 , '<div class="mu-e-name">', T.a(e.event_url, T.safe(e.name)), '</div></div>'
                 , '<div class="going"><div class="yes-pics mu-clearfix"></div></div>'
                 , '<div class="interact">', (content || 'fill me in'), '</div>'
                 ].join(''));
     }
     , imOut: function() {
         return ['<div class="nope">'
                 , '<span class="out">', C('rsvpd-no'), '</span>'
                 , '<div class="actns">', T.btn(C('rsvp-switch-to-yes-btn'), 'mu-im-in passive'), '</div>'
                 , '</div>'].join('');
     }
	 , imIn: function() {
         return ['<div class="yep">'
                 , '<span class="in">', C('rsvpd-yes'), '</span>'
                 , '<div class="actns">', T.btn(C('rsvp-switch-to-no-btn'),'mu-im-out passive'), '</div>'
                 , '</div>'].join('');
     }
	 , iWantToWait: function() {
         return ['<div class="yep">'
				 , '<div class="actns-centered">', T.btn(C('rsvp-want-to-wait-btn'), 'mu-im-in waitlist passive'), '</div>'
                 , '</div>'].join('');
     }
     , noWaiting: function() {
         return ['<div class="yep">', C('no-waitlist'), '</div>'].join('');
     }
     , imWaiting: function() {
         return ['<div class="yep">'
                 , '<span class="waiting">', C('waitlisted'), '</span>'
                 , '<div class="actns">', T.btn(C('rsvp-switch-to-no-btn'), 'mu-im-out waitlist passive'), '</div>',
                 , '</div>'].join('');
     }
     , haventDecided: function() {
         return ['<div class="mu-yn">'
                 , '<span class="rsvp-q">', C('rsvp-question'), '</span>'
                 , '<div class="mu-yn actns">'
                 ,  T.btn(C('rsvp-yes-btn'), 'mu-im-in'), ' ', T.btn(C('rsvp-no-btn'),'mu-im-out passive')
                 , '</div>'
                 , '</div>'].join('');
     }
     // the meetup requires payment to rsvp
     , payreq: function(e) {
       var f = e.fee;
         return ['<div class="mu-payreq">', T.a(e.event_url, C('paymentreq')), '</div>'].join('');
     }
     // show button to join group
     , joinGroup: function(mode) {
       return ['<div class="actns-centered">', T.btn(C('join-btn'), 'mu-join-grp'), '</div>'].join('');
     }
     // show form to create profile
     , createProfile: function(u, g) {
       var jm = g.join_mode, i = g.join_info, qs = i.questions
         , qr = parseInt(i.questions_req, 10)
         , pr = parseInt(i.photo_req, 10), idx = 1,
         ques = function(q) {
			 return ['<div><div class="q">'
                 , (qr?'<span class="rstar">*</span> ':'')
                 , T.safe(q.question)
                 , '</div><div><textarea class="ans'
                 , (qr?' req':'')
                 ,'" name="answer_'
                 , q.id
                 , '" tabindex="'
                 , idx++
                 ,'"/></div></div>'].join('');
		 };
		 if(jm === 'closed') {
			 return ['<div>'
					 , C('group-join-closed')
					 , '</div><div class="actns-centered">'
					 , T.btn(C('cancel-create-profile-btn'), 'cancel-profile-closed')
					 , '</div>'].join('');
		 } else {
             if(pr && !u.photo && !u.photo_url) {
               return ['<div><div class="pad">', C('requires-photo', T.grpa(g, 'Meetup'))
                      , '</div><div class="actns-centered">'
					  , T.btn(C('cancel-create-profile-btn'), 'cancel cancel-profile-closed')
					  , '</div></div>'].join('');
             } else {
               var extra = jm === 'invite' ? [
                 '<div>'
                 , C('invite-explained', T.mua('/' + g.urlname + '/suggestion/', 'Contact the organizer'))
                 , '</div><div class="q">'
                 , '<span class="rstar">*</span> '
                 , C('invite-code')
                 , '</div><div><input type="text" name="inv_code" class="req ans inv-code" tabindex="'
                 , idx++
                 ,'"/></div>'].join('') : '';

   			   return ['<form class="profile-frm"><div class="profile-frm-errs"/>',
                 , extra ,'<div class="q">'
                 , C('profile-intro')
                 , '</div><div><textarea class="intro'
                 , (qr?' req':'')
                 , '" tabindex="'
                 , idx++
                 ,'"/></div>'
                 , qs ? $jq.map(qs, ques).join('') : ''
                 , '</form>'
                 , T.btn(C('create-profile-btn'), 'create-profile')
                 , ' ',
                 , T.btn(C('cancel-create-profile-btn'), 'cancel cancel-profile')
			        ].join('');
             }
		 }
     }
     // show if a member requested to join a group and is waiting on org approval
     , pendingProfile: function(g, p) {
         return  C('awaitingapproval', T.mua('/' + g.urlname, C('upto-on-mu')));
     }
     , afterwards: function(e) {
         return ['<div class="aw">'
                 , e.self && e.self.rsvp && e.self.rsvp === 'yes' ?
                   C('did-go') : T.grpa(e.group, C('upto-on-mu'))
                 , '</div>'].join('');
     }
     , closedStatus: function(e) {
         var closedCode = e.rsvp_rules ? e.rsvp_rules.closed : 0;
         if(!closedCode && e.rsvp_rules) {
             /* check date boundry */
             var now = +new Date();
           if(e.rsvp_rules.open_time && now < e.rsvp_rules.open_time) {
               closedCode = 2;
           } else if(e.rsvp_rules.close_time && now > e.rsvp_rules.close_time) {
               closedCode = 3;
           }
         }
         if(!closedCode && e.rsvp_limit) {
           if(e.yes_rsvp_count >= e.rsvp_limit) {
               /* rsvp full */
               closedCode = 4;
           }
         }
         return closedCode;
     }
     , visible: function(profile, e) {
       var past = e.status === 'past'
         , rsvp = e.self && e.self.rsvp
         , payreq = e.fee && e.fee.required;
       if(past) {
         return T.pastEventDetails(e, T.afterwards(e));
       } else {
         var closedCode = T.closedStatus(e);
         if(!rsvp || !profile) {
           if(profile) {
             var nonpendingMarkup = function() {
               switch(closedCode) {
               case 0: return T.haventDecided();
               case 1: return C('rsvps-closed');
               case 2: return T.date(e.rsvp_rules.open_time);
               case 3: return C('rsvps-closed');
               case 4: return e.rsvp_rules && e.rsvp_rules.waitlisting === 'off' ?  T.noWaiting() : T.iWantToWait();
               default: return T.haventDecided();
               }
             };
             return T.eventDetails(e, closedCode, payreq ? T.payreq(e) : (
                                       profile.status === 'pending' ? T.pendingProfile(e.group, profile) : (
                                           nonpendingMarkup()
                                       )
             ));
           } else {
             return T.eventDetails(e, closedCode, payreq ? T.payreq(e) : T.joinGroup(e.group.join_mode));
           }
         } else {
           switch(closedCode) {
           case 0:/*not closed*/
               return T.eventDetails(e, closedCode, e.self.rsvp.response === 'yes' ?
                                     T.imIn() : (e.self.rsvp.response === 'waitlist' ?
                                                 T.imWaiting() : T.imOut()));
		   case 1: return /*closed*/ T.eventDetails(e, closedCode, C('rsvps-closed'));
           case 2: return /*prior to open*/T.eventDetails(e, closedCode, C('rsvps-open-at',
																	 T.date(e.rsvp_rules.open_time)));
           case 3: return /*past the close*/T.eventDetails(e, closedCode, C('rsvps-closed'));
		   case 4: return /*at/over rsvp lim*/T.eventDetails(e, closedCode, e.self.rsvp.response === 'yes'?
															 T.imIn() : (e.self.rsvp.response === 'waitlist' ?
                                                                         T.imWaiting() : (e.rsvp_rules.waitlisting === 'off' ?
                                                                                          T.noWaiting() : T.iWantToWait())));
           default: return T.eventDetails(e, closedCode, C('rsvps-closed'));
           };
         }
       }
     }
     , event: function(profile, e, event_id) {
       if(e) {
         return T.visible(profile, e);
       } else if(event_id) {
         T.notfound(event_id);
       }
       return null;
     }
   }
   , sargs = function(s) {
      var xs = document.getElementsByTagName('script') || [],
       tag = null, s = s.indexOf('?') > -1 ? s : s+'?', args = {};
      for(var i = 0, l = xs.length, f = function(t) { return t.src.indexOf(s) > -1; };
          i < l && !tag; i++) {
        var st = xs[i];
        if(f(st)) tag = st;
      }
      if(tag) {
          var qs = tag.src.split('?').pop();
          if(qs.indexOf('=') > 0) {
              var ps = qs.split("&");
              for(var i = 0, l = ps.length;i<l;i++) {
                  var p = ps[i].split('=');
                  args[p[0]] = p[1];
              }
          }
      }
      return args;
   }
   // an object containing k-v pairs of arguements passed to the script
   , muargs = sargs('mu.btns.js');

   /**
    * Primary function which exposes public api and rsvp btn bindings. Users
    * do not need to invoke this method explicitly if they append a querystring
    * parameter of "id" to the script itself.
    * @param opts object containing the following options
    *  authUrl - url for oauth authorization
    *  apiUrl - base url for invoking api calls
    *  clientId - valid oauth 2 client id
    *  proxyUrl - url for hosted api proxy resource
    *  redirectUri - where to redirect after oauth authorization
    * @params muready a function that takes one argument representing the exported api
    *                 invoked when function api wrapper is ready
    */
   mu.api = mu.api || (function(opts, muready) {
     mu.inited = true;
     var self = this
     , opts = opts || {}
     , authUrl = opts.authUrl || Domains.auth
     , apiUrl = opts.apiUrl || Domains.api
     , proxyUrl = opts.proxyUrl || Domains.proxy
     , clientId = muargs && muargs.id ? muargs.id : opts.client
     , redirectUri = opts.redirectUri || window.location.href
     , scopes = opts.scopes || OAuthOptions.scopes
     , server = null // contentWindow of iframe hosting api proxy
     , user = null  // cached authenticated member
     , Errors = { 'access_denied' : 'This page was denied access' }

     , requestAuth = function(event, cnt) {
         var width = 510, height = 420
           , top = (screen.height - height)/2
           , left = (screen.width - width)/2;
         window.open(
           [authUrl, "?client_id=", clientId, "&response_type=token"
            , (event ? '&state=ev-' + event + ',' + cnt : '')
            , (scopes ? ('&scope=' + scopes.join('+')) : '')
            , "&redirect_uri=", redirectUri].join('')
            , "Meetup"
            , ["height=", height, ",width=", width, ",top=", top, ",left=", left].join('')
         );
     }

     // Discard authorization credentials.
     , deauthenticate = function() {
       Store.clear();
     }

     // @return token if valid, null otherwise
     , authenticated = function() {
         var access = Store.get('access')
           , parsed = access ? $jq.parseJSON(access) : null;
         if (!parsed) {
           return null;
         }
         return new Date(parsed.expires) > +new Date() ? parsed.token : (
             !parsed.expires && parsed.token ? parsed.token : null);
     }

     // produce a new meetup platform client exposing public methods
     , client = (function(me) {
       return {
         /** Finds the next upcoming event
          *  @param cb handler for response
          *  @return event object representing next upcoming event for user */
         nextEvent: function(cb) {
           invoke('/2/events', { member_id:'self',status:"upcoming",page:"1" }, function(res) {
             cb(res.results[0]);
           });
         },
         /** Finds an event by id
          *  @param id event id
          *  @param cb handler for response
          */
         event: function(id, cb) {
           invoke('/2/event', { id:id,fields:"self,rsvp_rules" }, cb);
         },
         /** RSVP's to an event
          * @param ev event id
          * @param status rsvp status, yes or no
          * @param cb handler for response
          */
         rsvp: function(ev, status, cb) {
           invoke('/rsvp', { event_id: ev, rsvp: status }, cb);
         },
         /** Find rsvps for an event
          * @param ev event id
          * @param cb handler for response
          */
         rsvps: function(ev, cb) {
           invoke('/2/rsvps', {event_id:ev, rsvp:'yes', 'page':5}, function(res) {
             cb(res.results);
           });
         },
         /** Finds a group by id
          *  @param grp group id
          *  @param cb handler for response
          */
         group: function(grp, cb) {
           invoke('/2/groups', { group_id: grp }, function(res) {
              cb(res.results[0]);
           });
         },
         /** Creates a member profile for a target group
          * @param args object representing require info to join group
          * @param handler for response
          */
         createProfile: function(args, cb) {
           invoke('/2/profile', args, function(res){
             cb(res);
           });
         },
         /** Finds a member profile by group id for the current user
          *  @param grp group id
          *  @param cb handler for response
          */
         profile: function(grp, cb) {
           invoke('/2/profiles', { group_id: grp, member_id: me.id }, function(res) {
             cb(res.results ? res.results[0] : null);
           });
         },
         /**
          * @return true if user is connected, false otherwise
          */
         connected: function() {
           return authenticated() != null;
         },
         /**
          * @return a reference to the authorized user
          */
         user: function() {
           return me;
         }
       };
     })

     , requireAuth = function(cb) {
       var auth = authenticated();
       if(auth) { cb(auth); }
       else { throw new Error("not authenticated"); }
     }

     , requireUser = function(cb, reload) {
       if(user && !reload) { cb(user); }
       else {
         invoke('/members', { member_id: 'self' }, function(res) {
           if(res.results && res.results[0]) {
             user = res.results[0]; // cache it
             Store.set('user', JSON.stringify(user));
             cb(user);
           } else {
             throw new Error('unable to fetch user');
           }
         });
       }
     }

     // Called when meetup.com user denies authorization
     , onError = function(err, state) {
       if(!Errors[err]) throw new Error('unexpected error ' + err);
     }

     // Called when meetup.com user authorizes client
     , onToken = function(token, expires, state) {
       requireServer(function() {
         Store.set('access', JSON.stringify({
           'token': token,
           'expires': +new Date() + (expires * 1000)
         }));
         if(state) {
           // page state [event id, count]
           var decoded = decodeURIComponent(state)
           , pstate = decoded.split('-').pop().split(',');
           showRsvp(pstate[0], pstate[1]);
         }
       });
     }

     // requests authorization if not authorized then shows
     // rsvp for an event
     , authenticate = function(event, cnt) {
       if(authenticated()) {
         requireServer(function() {
           showRsvp(event, cnt);
         });
       } else {
         requestAuth(event, cnt);
       }
     }

     , showRsvp = null
     , requireServer = null
     , invoke = null
     , receive = null;

     // attach fns to window
     window.onMuAuthPass = onToken;
     window.onMuAuthFail = onError;

     // logging out of meetup will expire token
     var logout = function(token, callback) {
       var uri = Domains.logout + '?access_token=' + token
       , iframe = $jq('<iframe style="width:0px;height:0px;border:0px" scrolling="no" frameborder="no" allowtransparency="true" src="'+uri+'"></iframe>')
       , removeIframe = function() {
         iframe.remove();
       }
       , complete = function() {
         callback();
         deauthenticate();
       };
       try {
         $jq("body").append(iframe);
         iframe.load(function() {
           complete();
           setTimeout(removeIframe, 200);
         });
       } catch (e) {
         complete();
         setTimeout(removeIframe, 200);
       }
     };

     // all jquery dependent code should go within this function
     var jqready = function() {
        $jq = jQuery.noConflict();
        $jq("head").append(T.style(T.css()));
        user = Store.get('user') ? $jq.parseJSON(Store.get('user')) : null;

        // redifineing this year to a btn query for event id
        // and a redirect, note the selector for the rsvp btn
        // may be in the format of rsvp-id-counter a
        T.notfound = function(eid) {
          var nfurl = $jq('span[id^="rsvp-'+eid+'"] a').attr("href");
          if(nfurl) { window.location.href= nfurl; }
          else { throw Error("could not find an rsvp btn for event " + eid); }
        };

        // displays event/rsvp info
        showRsvp = function(event_id, cnt) {
          requireUser(function(me) {
            if(me) {
              var cli = client(me);
              cli.event(event_id, function(ev) {
                if(ev) {
                  cli.profile(ev.group.id, function(profile) {
                    var markup = $jq(T.event(profile, ev, event_id)), behave = function(mku) {
                      mku.find("div.logout-container a.mu-logout").bind('click', function() {
                        $jq(mku.find('div.interact')).html(
                         '<div class="actns-centered">'+C('logging-out')+'</div>');
                        requireAuth(function(token) {
                          logout(token, function() {
                            if (GlobalVars.bubble && GlobalVars.bubble.length > 0) {
                              GlobalVars.bubble.hide();
                              GlobalVars.bubble = undefined;
                            }
                          });
                        });
                      });
                      var interact = mku.find("div.interact");
                      interact.delegate(".mu-join-grp", 'click', function(e){
                        e.preventDefault();
                        cli.group(ev.group.id, function(res) {
                          if(res) {
                            interact.fadeOut(200, function() {
                              var self = $jq(this);
                              if(res && res.join_info && parseInt(res.join_info.photo_req, 10)) {
                                requireUser(function(newMe){
                                  me = newMe;
                                  self.html(T.createProfile(me, res)).fadeIn(function(){
                                   self.find('.intro').focus();
                                  });
                                }, true/*force load the user to ensure a valid check of photo*/);
                              } else {
                                self.html(T.createProfile(me, res)).fadeIn(function(){
                                  self.find('.intro').focus();
                                });
                              }
                            });
                          } else {
                            throw new Error("unable to find group " + ev.group.id);
                          }
                        });
                      })
                      .delegate('.cancel-profile', 'click', function(e) {
                        e.preventDefault();
                        interact.fadeOut(200, function() {
                          $jq(this).html(T.joinGroup(ev.group.join_mode)).fadeIn(200);
                        });
                      })
                      .delegate('.cancel-profile-closed', 'click', function(e) {
                         e.preventDefault();
                         if(GlobalVars.bubble) {
                           GlobalVars.bubble.hide();
                           GlobalVars.bubble = undefined;
                         } else {
                           mku.hide();
                         }
                      })
                      .delegate('.create-profile', 'click', function(e) {
                        e.preventDefault();
                        var jargs = { group_id: ev.group.id }
                        , errs = false
                        , ji = ev.group.join_info
                        , collect = function(name, input) {
                          if(!input.val() && input.hasClass('req')) {
                            errs = true;
                            input.parent().addClass('err');
                          } else {
                            input.parent().removeClass('err');
                            jargs[name] = input.val();
                          }
                        };
                        collect('intro', $jq(mku.find('.intro')));
                        mku.find('.ans').each(function(e, a) {
                          collect(a.name, $jq(a));
                        });

                        if(!errs) {
                          cli.createProfile(jargs, function(res){
                            if(res.problem) {
                              if(res.code) {
                                var c = res.code;
                                if(c === 'invalid_answer') {
                                  $jq(mku).find('.profile-frm-errs').text(C('profile-invalid-answer'));
                                } else if(c === 'invalid_url') {
                                  $jq(mku).find('.profile-frm-errs').text(C('profile-invalid-url'));
                                } else if(c === 'invalid_inv_code') {
                                  $jq(mku).find('.profile-frm-errs').text(C('profile-invalid-inv-code'));
                                  $jq(mku).find('.inv-code').parent().addClass('err');
                                } else if(c === 'join_viaweb') {
                                  $jq(mku).find('.profile-frm-errs').text(
                                    C('requires-photo', T.grpa(ev.group, 'Meetup'))
                                  );
                                } else {
                                  $jq(mku).find('.profile-frm-errs').text(C('profile-invalid-general'));
                                }
                              }
                            } else {
                              interact.fadeOut(200, function(){
                                 var wl = ev.rsvp_limit && ev.rsvp_limit <= ev.yes_rsvp_count;
                                 $jq(this).html(res.status === 'pending' ?
                                              T.pendingProfile(ev.group, res) :
                                              (wl ? (ev.rsvp_rules && ev.rsvp_rules.waiting === 'off' ?
                                                     T.noWaiting() : T.iWantToWait()) : T.haventDecided())).fadeIn(200);
                              });
                            }
                          });
                        } else {
						  $jq(mku.find('div.profile-frm-errs')).text(C('create-profile-validation-fail'));
						}
                      })
                      .delegate(".mu-im-out", 'click', function(e) {
						e.preventDefault();
                        cli.rsvp(ev.id, "no", function(res) {
                          var wl = ev.rsvp_limit && ev.rsvp_limit >= parseInt(res.yes, 10);
                          mku.find('.mu-r-cnt').html(T.attending(res.yes) + (wl ? ' ' +  C('rsvps-full'):''));
                          var mems = mku.find("div.going .mimg");
                          for(var i=0,l=mems.length;i<l;i++) {
                            var m = $jq(mems[i]);
                            if(parseInt(m.data()['member'], 10) === parseInt(me.id, 10)) {
                              m.parent().fadeOut('fast', function() {
                                $jq(this).remove();
                              });
                              break;
                            }
                          }
                          interact.fadeOut(200, function() {
                                               $jq(this).html(wl ? (ev.rsvp_rules && ev.rsvp_rules.waitlisting === 'off' ?
                                                                  T.noWaiting() : T.iWantToWait()) : T.imOut()).fadeIn(200);
                          });
                        });
                      })
                      .delegate(".mu-im-in", 'click', function(e) {
						e.preventDefault();
                        var waiting = $jq(this).hasClass('waitlist');
                        var response = waiting ? 'waitlist': 'yes';
                        cli.rsvp(ev.id, response, function(res) {
                          mku.find('.mu-r-cnt').html(T.attending(res.yes) + (waiting ? ' ' +  C('rsvps-full'):''));
                          var mems = mku.find("div.going .mimg");
                          if(!waiting && mems.size() < 5) {
                              cli.profile(ev.group.id, function(p) {
                                $jq("div.going .yes-pics").append(['<a href="'
                                                               , p.profile_url
                                                               ,'" target="_blank"><span data-member="'
                                                               , p.member_id, '" class="mimg"><img width="40" height="40" src="'
                                                               , T.thumb(p.photo_url ?
                                                                           p.photo_url.replace('/member_', '/thumb_'):null)
                                                               , '" title="'
                                                               , me.name
                                                               , '"></span></a>'].join(''));
                            });
                          }

                          interact.fadeOut(200, function(){
                                               $jq(this).html(waiting ? (ev.rsvp_rules && ev.rsvp_rules.waitlisting === 'off' ?
                                                                       T.noWaiting(): T.imWaiting()) : T.imIn()).fadeIn(200);
                          });
                        });
                      });

                      return mku;
                    };

                    if (GlobalVars.bubble && GlobalVars.bubble.length > 0) {
                      GlobalVars.bubble.hide();
                      GlobalVars.bubble = undefined;
                    }
                    GlobalVars.bubble = $jq("#rsvp-" + event_id + "-" + cnt + " .prompt").empty().html(
                      behave(markup)).show(function(){
                        cli.rsvps(event_id, function(res) {
                          var f = res.filter(function(r){ return r.response === 'yes'; })
                          , l = Math.min(f.length, 5), pics = [], pic = function(i) {
                            var m = f[i-1];
                            return T.mua(['/' + ev.group.urlname, 'members', m.member.member_id].join('/')
                                         , ['<span class="mimg" data-member="',m.member.member_id,'"><img title="'
                                            , m.member.name
                                            , '" width="40" height="40" src="'
                                            , T.thumb(m.member_photo ? m.member_photo.thumb_link : null)
                                            , '" /></span>'].join(''));
                        };
                        while(l>0) pics.push(pic(l--));
                        if(pics.length>0) markup.find("div.going .yes-pics").hide().html(pics.join('')).slideDown('fast');
                      });
                    });

                  });

                } else {
                  if (GlobalVars.bubble && GlobalVars.bubble.length > 0) {
                    GlobalVars.bubble.hide();
                    GlobalVars.bubble = undefined;
                  }
                  GlobalVars.bubble = $jq("#rsvp-" + event_id + " .prompt").empty().html(T.event(null, null, null)).show();
                }
              });
            } else {
              throw new Error('could not auth member');
            }
          });
        }
        // ensures that a server is accessible to dispatch calls to
        , requireServer = function(cb) {
          var iframe = $jq("#meetup-api");
          if(iframe[0]) {
            server = iframe[0].contentWindow;
            cb();
          } else {
             iframe = $jq(['<iframe style="width:0px;height:0px;border:0px" scrolling="no" frameborder="no" allowtransparency="true" id="meetup-api" src="'
                       , proxyUrl
                         , '"></iframe>'].join(''));
            // todo: attach an iframe.onerror handler to handle server errors
            $jq("body").append(iframe);
              iframe.load(function() {
              server = iframe[0].contentWindow;
              cb();
            });
          }
        };

       // rewrite rsvp btn html and laf
       $jq.fn.decorateRsvpBtn = function(id) {
         var img = id ? "https://www.meetup.com/t/img/api/rbtn/"+id+"/rsvp_btn.png" : "/img/api/rsvp_btn.png";
         this.empty().html('<img src="'+img+'"/>').addClass('mu-a btn');
         return this;
       };

       // server communication
       var uuid = 0, callbacks = [];
       invoke = function(method, args, cb) {
         requireServer(function() {
           requireAuth(function(token) {
             var id = uuid++;
             var msg = {
               method: method
               , args: args
               , uuid: id
               , token: token
             };
             callbacks[id] = {
               request: msg,
               responder: function(req, res) {
                 if(res) { cb(res); }
                 else {
                     // this was a 404
                     // fixme. this could be handled more elegantly
                     // with event dispatching
                     if('/2/event' === req.method) {
                       if(req.args.id) {
                         T.notfound(req.args.id);
                       } else {
                         throw new Error("unknown event");
                       }
                     } else {
                       throw new Error("unhandled 404 request");
                     }
                   }
                 }
             };
             server.postMessage(JSON.stringify(msg), proxyUrl);
           });
         });
       }
       // if data is null, request resulted in a 404
       , respondWith = function(uuid, data) {
           var cb = callbacks[uuid];
           if(cb && cb.responder) {
              cb.responder(cb.request, data);
              callbacks[uuid] = undefined;
           } else {
             throw new Error('no callback: ' + uuid);
           }
       }
       , throttle = function(req) {
         if(req.meta && parseInt(req.meta.remaining, 10) < 1) {
           throw new Error(
             "client is being rate limited. will reset on " +  new Date(parseInt(req.meta.reset, 10)+1000));
         }
       }
       // handling incoming msg from remote server
       , receive = function(e) {
         var r = $jq.parseJSON(e.data);
         if(r) {
           switch(r.status) {
           case 401:
             deauthenticate();
             requestAuth();
             break;
           case 404: // we can't see this
             throttle(r);
             respondWith(r.uuid, null);
             break;
           case 200:
           case 201:
           case 400: // client should handle error case
             throttle(r);
             respondWith(r.uuid, $jq.parseJSON(r.response));
           }
         } else {
           throw new Error("rec malformed response");
         }
       };

       // listen for incoming posted messages
       // relies on support for postMessage
       window.attachEvent ?
         window.attachEvent("onmessage", receive)
         : window.addEventListener("message", receive, false);

       // oauth2 token handling
       if(window.location.hash) {
         var fp = window.location.hash.substring(1).split('&')
         , i = fp.length
         , params = {}
         , re = /(\S+)=(\S+)/
         , inject = function(pair) {
           if(re.test(pair)) {
             var kv = re.exec(pair).splice(1, 2);
             params[kv[0]] = kv[1];
           }
         };
         while(i--) { inject(fp[i]); }
         if(params.access_token) {
           window.close();
           window.opener.onMuAuthPass(params.access_token, params.expires_in, params.state);
         } else if(params.error) {
           window.close();
           window.opener.onMuAuthFail(params.error, params.state);
         }
       }
       var btnCount = 0;

       /** Exported public api */
       var binding = {
         /** If not authenticated, request authentication */
         auth: function(event, cnt) {
           if(!authenticated()) {
             authenticate(event, cnt);
           }
           return self;
         },

         /** Parses page decorating and attaching event handlers for meetup api
          *  @param sel selector of element containing rsvp btns */
         rsvpBtns: function(sel) {
           var valid = [];
           $jq((sel || '') + " a.mu-rsvp-btn").each(function(i,e) {
             var btn = $jq(this)
              , elink = this.href.split("#").shift().split("?").shift()
              , id = /^.+[.]meetup.com\/.+\/events\/(\w+)\/?$/.exec(elink);
              if(id) {
                btn.data().event = id[1];
                btnCount++;
                btn.data().cnt = btnCount;
                valid.push(btn);
              } else {
                if(btn.data() && btn.data().event) {
                  btnCount++;
                  btn.data().cnt = btnCount;
                  valid.push(btn);
                }
              }
           });
           $jq(valid).each(function(i,e) {
             e.decorateRsvpBtn(clientId)
              .wrap('<span class="mu-widget" id="rsvp-' + e.data().event + '-'+ e.data().cnt+'"/>')
              .after('<div class="prompt"/>').bind('click', function(e) {
                e.preventDefault();
                var btn = $jq(this), auth = authenticated();
                if(auth && btn.hasClass('active')) {
                  btn.parent().find("div.prompt").hide();
                  btn.removeClass('active');
                } else {
                  btn.addClass('active');
                  if(auth) {
                    showRsvp(btn.data().event, btn.data().cnt);
                  } else {
                    binding.auth(btn.data().event, btn.data().cnt);
                  }
                }
              });
           });
           return self;
         }
      };

      if(muready) {
          muready(binding);
          // export this behavior
          mu.rsvpBtns = binding.rsvpBtns;
      }

      /* FIXME */
      $jq(document.body).click(
        function (ev) {
          if (GlobalVars.bubble && GlobalVars.bubble.length > 0 && !$jq.contains(GlobalVars.bubble[0], ev.target)) {
            GlobalVars.bubble.hide();
            GlobalVars.bubble = undefined;
          }
        }
      );
    }; // end jqready

    var use = (function(s, cond, f){
      if(cond){
        var d = document, j = d.createElement('script');
        j.type = 'text/javascript'; j.src = s;
        d.getElementsByTagName('head')[0].appendChild(j);
        if(j.attachEvent) {
          j.onreadystatechange = function() {
            var ready = this.readyState;
            if(ready === 'loaded' || ready === 'complete') {
              this.onreadystatechange = null;
              f();
            }
          };
        } else {
          j.onload = f;
        }
      } else {
        f();
      }
    });
    use(Assets.json2, typeof JSON === 'undefined',
      function(){
        use(Assets.jquery, typeof jQuery === 'undefined', jqready);
      }
    );
  }); // end mu.api

  // auto execute rsvp btns method if client id is provided
  // as a script query string param
  if(muargs && 'id' in muargs && !mu.inited) {
    mu.api({client:muargs.id}, function(M) { M.rsvpBtns(); });
  }

}());
