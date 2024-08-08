const BODY = document.getElementsByTagName("body")[0];
const SCRAPE_DIV_ID = "scrape";
const SCRAPE_EL_STYLE = `
                          position: fixed;
                          bottom: 0;
                          left: 0;
                          z-index: 1000000000;
                        `;
const OPENED_EL_STYLE = `
                          height: 500px;
                          width: 500px;
                          border: 1px solid black;
                          background-color: white;
                          position: fixed;
                          bottom: 0;
                          left: 0;
                          text-align: center;
                          overflow: hidden;
                          visibility: hidden;
                        `;
const CLOSED_EL_STYLE = `
                          height: 30px;
                          width: 30px;
                          border: 1px solid black;
                          background-color: white;
                          position: fixed;
                          bottom: 0;
                          left: 0;
                          text-align: center;
                          overflow: hidden;
                          visibility: visible;
                        `;
const SCRAPE_BTN_STYLE = "float: right;"

let scrapeClose = function(){
  closed_el.style.visibility = "visible";
  opened_el.style.visibility = "hidden";
}

let scrapeOpen = function(){
  closed_el.style.visibility = "hidden";
  opened_el.style.visibility = "visible";
}

let genScrape = function(){
  let img_urls = grabImageUrls();
  img_urls = processImgUrls(img_urls);
  img_urls = removeImgUrlsDups(img_urls);
  updateImageCount(img_urls.length);
}

let copyScrapeDownload = function(){
  alert("Event Trigger");
}

let copyScrapeList = function(){
  alert("Event Trigger");
}

let el = document.createElement("div");
el.id = SCRAPE_DIV_ID;
el.style.cssText = SCRAPE_EL_STYLE;

let opened_el = document.createElement("div");
opened_el.id = "scrape_open";
opened_el.style.cssText = OPENED_EL_STYLE;
el.appendChild(opened_el);

let close_btn = document.createElement("button");
close_btn.onclick = scrapeClose;
close_btn.innerHTML = "X";
close_btn.style.cssText = SCRAPE_BTN_STYLE;
opened_el.appendChild(close_btn);

let closed_el = document.createElement("div");
closed_el.id = "scrape_close";
closed_el.style.cssText = CLOSED_EL_STYLE;
el.appendChild(closed_el);

let open_btn = document.createElement("button");
open_btn.onclick = scrapeOpen;
open_btn.innerHTML = "↗";
open_btn.style.cssText = SCRAPE_BTN_STYLE;
closed_el.appendChild(open_btn);

let gen_scrape_btn = document.createElement("button");
gen_scrape_btn.onclick = genScrape;
gen_scrape_btn.innerHTML = "Generate Scraping Content";
opened_el.appendChild(gen_scrape_btn);

let scrape_content_el = document.createElement("div");
scrape_content_el.id = "scrape_content";
scrape_content_el.innerHTML = "Count: ";

let count_el = document.createElement("span");
count_el.id = "scrape_count";
count_el.innerHTML = "0";
scrape_content_el.appendChild(count_el);
scrape_content_el.appendChild(document.createElement("hr"));

let download_el = document.createElement("textarea");
download_el.id = "scrape_download_commands";
download_el.cols = 30;
download_el.rows = 4;
scrape_content_el.appendChild(download_el);
scrape_content_el.appendChild(document.createElement("br"));

let download_btn = document.createElement("button");
download_btn.onclick = copyScrapeDownload;
download_btn.innerHTML = "Copy Download Commands";
scrape_content_el.appendChild(download_btn);
scrape_content_el.appendChild(document.createElement("hr"));

let list_el = document.createElement("textarea");
list_el.id = "scrape_list";
list_el.cols = 30;
list_el.rows = 4;
scrape_content_el.appendChild(list_el);
scrape_content_el.appendChild(document.createElement("br"));

let list_btn = document.createElement("button");
list_btn.onclick = copyScrapeDownload;
list_btn.innerHTML = "Copy List";
scrape_content_el.appendChild(list_btn);
scrape_content_el.appendChild(document.createElement("hr"));

let link_list_el = document.createElement("div");
link_list_el.id = "link_list";
link_list_el.innerHTML = "<i>(pending generation)</i>";
scrape_content_el.appendChild(link_list_el);

opened_el.appendChild(scrape_content_el);

BODY.appendChild(el);

let updateImageCount = function(i){
  document.getElementById("scrape_count").innerHTML = i;
}

let getItmNum = function(){
  return document.querySelectorAll(".ux-layout-section__textual-display--itemId .ux-textspans.ux-textspans--BOLD")[0].innerHTML;
}

let downloadName = function(url, i){
  let filename = url.split('/').pop();
  let filename_segs = filename.split('.');
  return "ebay " + getItmNum() + " " + filename_segs[0] + " " + i + "." + filename_segs[1];
}

let grabImageUrls = function(){
  let img_urls = [];
  let pics = document.getElementById("PicturePanel").querySelectorAll(".ux-image-grid-container.filmstrip.filmstrip-x button.ux-image-grid-item.image-treatment.rounded-edges img");
  // console.log(pics.length);
  if(pics.length > 0){
    img_urls = [...pics].map(function(n) {
      if(n.src){
        return n.src;
      }else{
        return n.dataset.src;
      }
    });
    // console.log(img_urls);
  } else {
    let img = document.getElementById("PicturePanel").querySelectorAll("div.image img")[0];
    img_urls.push(img.src);
    // console.log(img_urls);
  }
  // console.log(img_urls);
  return img_urls;
}

let processImgUrls = function(img_urls){
  let img_urls_buffer = img_urls;
  for (let i=0; i<img_urls_buffer.length; i++){
    console.log(img_urls_buffer);
    img_urls_buffer[i]=img_urls_buffer[i].replace(/_\d+\.JPG/,"_10.JPG");
    img_urls_buffer[i]=img_urls_buffer[i].replace(/\/s\-l\d+(\/r)*.jpg/i,"/s-l1600.jpg"); //////2015 format
    img_urls_buffer[i]=img_urls_buffer[i].replace(/\/s\-l\d+(\/r)*.png/i,"/s-l1600.png"); //////2015 format
    img_urls_buffer[i]=img_urls_buffer[i].replace(/\/s\-l\d+(\/r)*.gif/i,"/s-l1600.gif"); //////2015 format
    img_urls_buffer[i]=img_urls_buffer[i].replace(/\/s\-l\d+(\/r)*.webp/i,"/s-l1600.jpg"); //////2015 format
  }
  return img_urls_buffer;
}

let removeImgUrlsDups = function(img_urls){
  let img_urls_buffer = img_urls;
  for (let j=img_urls_buffer.length-1; j>=0; j--){
    for (let i=0; i<img_urls_buffer.length; i++){
      if (i!=j && img_urls_buffer[i]==img_urls_buffer[j]){ img_urls_buffer.splice(j,1)}
    }
  }
  return img_urls_buffer;
}
