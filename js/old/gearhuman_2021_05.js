//gearhuman may 2021
// This was a quick-and-dirty script for use with Gearhuman and the version
// of its website as of May 2021.
var copyDownloadListToClipboard = function(){
  $("#extract_download_list").select();
  document.execCommand("copy");
}
var copyDownloadCommandsToClipboard = function(){
  $("#extract_download_commands").select();
  document.execCommand("copy");
}
var toggleCustomCommandsContainer = function(){
  $("#custom_commands_container").toggle();
}
var load_codes = function() {
  var img_urls = [];
  var pics = $(".product_gallery").find("img");
  $.each(pics, function(id,pic){
    img_urls.push($(pic).attr("src"));
  })
  if (img_urls.length > 0){
    for (var i=0; i<img_urls.length; i++){
      img_urls[i]=img_urls[i].replace(/_\d+x\.jpg/,".jpg");
      img_urls[i]=img_urls[i].split("?")[0];
      if (img_urls[i][0] == "/"){
        img_urls[i] = "https:" + img_urls[i]
      }
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
      var download_name = "";
      var filename_segs = filename.split('.');
      download_name += filename_segs[0];
      for (var j=1; j<filename_segs.length-1; j++){
        download_name += "." + filename_segs[j];
      }
      download_name += "." + filename_segs[filename_segs.length-1];
      thmcodes += '<a id="extract_download_link_' + i + '" class="extract_download_link" href="' + img_urls[i] + '" download="' + download_name + '">' + download_name + '</a><br/>\n ';
      cli_codes += ' "'+img_urls[i]+'" "'+download_name+'"';
      curl_codes += 'curl "'+img_urls[i]+'" -o "'+download_name+'"\n';
    }
    thmcodes += "<hr/></span>";
    if ( $("#toggle_custom_commands_button").length == 0 ){
      $(".seven").prepend(thmcodes);

      $("#extract_download_list").val(cli_codes);
      $("#extract_download_commands").val(curl_codes);
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

var defer = function(method) {
  if (window.jQuery) {
    method();
  } else {
    setTimeout(function(){ defer(method) }, 50);
  }
}

defer(load_codes);
