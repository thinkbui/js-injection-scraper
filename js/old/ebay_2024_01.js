//ebay jan 2024
// This was a quick-and-dirty script for use with eBay and the version
// of its website deployed as of January 2024.  Since that version uses
// jQuery, this script takes advantage of its library.  However this
// script is just here as a reference during framework construction and
// the final version will be strictly in VanillaJS.
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
var getItmNum = function(){
  return $(".ux-layout-section__textual-display--itemId").first().find(".ux-textspans.ux-textspans--BOLD").text();
}
var getImgUrls = function(){
  var img_urls = [];
  var pics = $("#PicturePanel").find(".ux-image-grid-container.filmstrip.filmstrip-x button.ux-image-grid-item.image-treatment.rounded-edges");
  console.log(pics.length);
  if(pics.length > 0){
    // img_urls = $.map(pics, function(n){
    //   var img = $(n).find("img");
    //   var url = $(img).attr("src");
    //   console.log(url);
    //   if(url) {
    //     return url;
    //   } else {
    //     var dataURL = $(img).attr("data-src");
    //     console.log(dataURL);
    //     return dataURL;
    //   }
    // })
    img_urls = $.map(pics, function(n) {var img = $(n).find("img"); var url = $(img).attr("src"); if(url){return url} else{return $(img).attr("data-src")}});
    console.log(img_urls);
  } else {
    var img = $("#PicturePanel").find("div.image")[0];
    img = $(img).find("img")[0];
    img_urls.push($(img).attr("src"));
  }
  console.log(img_urls);
  return img_urls;
}
var updateImgUrls = function(img_urls){
  var img_urls_buffer = img_urls;
  for (var i=0; i<img_urls_buffer.length; i++){
    console.log(img_urls_buffer);
    img_urls_buffer[i]=img_urls_buffer[i].replace(/_\d+\.JPG/,"_10.JPG");
    img_urls_buffer[i]=img_urls_buffer[i].replace(/\/s\-l\d+(\/r)*.jpg/i,"/s-l1600.jpg"); //////2015 format
    img_urls_buffer[i]=img_urls_buffer[i].replace(/\/s\-l\d+(\/r)*.png/i,"/s-l1600.png"); //////2015 format
    img_urls_buffer[i]=img_urls_buffer[i].replace(/\/s\-l\d+(\/r)*.gif/i,"/s-l1600.gif"); //////2015 format
    img_urls_buffer[i]=img_urls_buffer[i].replace(/\/s\-l\d+(\/r)*.webp/i,"/s-l1600.jpg"); //////2015 format
  }
  return img_urls_buffer;
}
var removeImgUrlsDups = function(img_urls){
  var img_urls_buffer = img_urls;
  for (var j=img_urls_buffer.length-1; j>=0; j--){
    for (var i=0; i<img_urls_buffer.length; i++){
      if (i!=j && img_urls_buffer[i]==img_urls_buffer[j]){ img_urls_buffer.splice(j,1)}
    }
  }
  return img_urls_buffer;
}
var load_codes = function() {
  var img_urls = getImgUrls();
  console.log("!!!!!!!!")
  console.log(img_urls);
  console.log("!!!!!!!!")
  if (img_urls.length > 0){
    img_urls = updateImgUrls(img_urls);
    img_urls = removeImgUrlsDups(img_urls);
    var thmcodes = '<button id="toggle_custom_commands_button" onclick="toggleCustomCommandsContainer()">Custom Commands ('+img_urls.length+')</button><hr/><span id="custom_commands_container"><textarea id="extract_download_commands" rows="4" cols="30"></textarea><br/><input type="submit" id="copy_commands_button" value="Copy Commands" onclick="copyDownloadCommandsToClipboard()"/><hr/><textarea id="extract_download_list" rows="4" cols="30"></textarea><br/><input type="submit" id="copy_list_button" value="Copy List" onclick="copyDownloadListToClipboard()"/><hr/>';
    var cli_codes = '';
    var curl_codes = '';
    for (var i=0; i<img_urls.length; i++){
      var filename = img_urls[i].split('/').pop();
      var download_name = "ebay " + getItmNum() + " ";
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
    if ( $("#toggle_custom_commands_button").length == 0 ){
      $("#mainContent").prepend(thmcodes);
  
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
