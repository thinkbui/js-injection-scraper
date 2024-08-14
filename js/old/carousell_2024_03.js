//carousell 2024 mar
var copyDownloadListToClipboard = function(){
  document.getElementById("extract_download_list").select();
  document.execCommand("copy");
}
var copyDownloadCommandsToClipboard = function(){
  document.getElementById("extract_download_commands").select();
  document.execCommand("copy");
}
var toggleCustomCommandsContainer = function(){
  var custom_cont = document.getElementById("custom_commands_container");
  if(custom_cont.style.display == "none"){
    custom_cont.style.display = "inline";
  } else {
    custom_cont.style.display = "none";
  }
}
var load_codes = function() {
  var itm_url_split = document.location.href.split('?')[0].split('/');
  var itm_num = itm_url_split[4];
  var img_urls = [];
  var pics = document.getElementById("FieldSetField-Container-field_photo_viewer").getElementsByTagName("img");
  if (pics.length > 0){
    for(var i=0;i<pics.length;i++){
      img_urls.push(pics[i].src);
    }
  }
  if (img_urls.length > 0){
    for (var i=0; i<img_urls.length; i++){
      var img_filename = img_urls[i].split('/').pop();
      var new_img_filename = img_filename.split('?')[0];
      img_urls[i] = img_urls[i].replace(img_filename, new_img_filename);
    }
    for (var j=img_urls.length-1; j>=0; j--){
      for (var i=0; i<img_urls.length; i++){
        if (i!=j && img_urls[i]==img_urls[j]){ img_urls.splice(j,1)}
      }
    }
    var thmcodes = '<button id="toggle_custom_commands_button" onclick="toggleCustomCommandsContainer()">Custom Commands ('+img_urls.length+')</button><hr/><span id="custom_commands_container"><textarea id="extract_download_commands" rows="4" cols="30"></textarea><br/><input type="submit" id="copy_commands_button" value="Copy Commands" onclick="copyDownloadCommandsToClipboard()"/><hr/><textarea id="extract_download_list" rows="4" cols="30"></textarea><br/><input type="submit" id="copy_list_button" value="Copy List" onclick="copyDownloadListToClipboard()"/><hr/>';
    var cli_codes = '';
    var curl_codes = '';
    for (var i=0; i<img_urls.length; i++){
      var filename = img_urls[i].split('/').pop();
      var download_name = "carousell " + itm_num + " ";
      var filename_segs = filename.split('.');
      download_name += filename_segs[0];
      for (var j=1; j<filename_segs.length-1; j++){
        download_name += "." + filename_segs[j];
      }
      download_name += " " + i + "." + filename_segs[filename_segs.length-1];
      thmcodes += '<a id="extract_download_link_' + i + '" class="extract_download_link" href="' + img_urls[i] + '" download="' + download_name + '">' + download_name + '</a><br/>\n ';
      cli_codes += ' "'+img_urls[i]+'" "'+download_name+'"';
      curl_codes += 'curl "'+img_urls[i]+'" -o "'+download_name+'"\n';
    }
    thmcodes += "<hr/></span>";
    if ( document.getElementById("toggle_custom_commands_button") === null ){
      var thmcodes_cont = document.createElement('span');
      thmcodes_cont.innerHTML = thmcodes;
      var listing_info = document.getElementsByClassName("D_EK")[0];
      listing_info.insertBefore(thmcodes_cont, listing_info.firstChild);

      document.getElementById("extract_download_list").value = cli_codes;
      document.getElementById("extract_download_commands").value = curl_codes;
      toggleCustomCommandsContainer();
      document.getElementById("toggle_custom_commands_button").addEventListener("click", function(event){
        event.preventDefault()
      });
      document.getElementById("copy_commands_button").addEventListener("click", function(event){
        event.preventDefault()
      });
      document.getElementById("copy_list_button").addEventListener("click", function(event){
        event.preventDefault()
      });
    }
  }
}

setTimeout(load_codes, 500);