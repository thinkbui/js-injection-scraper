let getItmNum = function(){
  return document.location.href.split('?')[0].split('/')[6];
}

let getItmTitle = function(){
  let item_title = document.querySelector("h1[data-test='product-title']").innerHTML;
  item_title = item_title.replaceAll(/[#&%\{\}\/\\<>\[\]\*\?\$!'":,;`@\+\|=]/g,"");
  item_title = item_title.replaceAll(/[^\x00-\x7F]/g,"");
  return item_title;
}

let downloadName = function(url, i){
  return ["target",getItmNum(),getItmTitle(),getFilename(url).split('?')[0],i].join(" ") + ".jpg";
}

let grabImageUrls = function(){
  let img_urls = [];
  let pics = document.querySelectorAll("[data-module-type='ProductDetailImageGallery'] img");
  if (pics.length > 0){
    for(var i=0;i<pics.length;i++){
      img_urls.push(pics[i].src);
    }
  }
  return img_urls;
}

let processImgUrls = function(img_urls){
  let img_urls_buffer = img_urls;
  for(let i=0;i<img_urls_buffer.length;i++){
    img_urls_buffer[i] = img_urls_buffer[i].split("?")[0] + "?wid=3000&hei=3000";
  }
  return img_urls_buffer;
}

const BODY = document.getElementsByTagName("body")[0];
const SCRAPE_DIV_ID = "scrape";
const SCRAPE_CONTENT_ID = "scrape_content";
const SCRAPE_OPENED_ID = "scrape_open";
const SCRAPE_CLOSED_ID = "scrape_close";
const SCRAPE_COUNT_ID = "scrape_count";
const SCRAPE_DL_CMD_ID = "scrape_download_commands";
const SCRAPE_URL_LIST_ID = "scrape_list";
const SCRAPE_LINK_LIST_ID = "scrape_link_list";
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
                          overflow-x: hidden;
                          overflow-y: scroll;
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
  document.getElementById(SCRAPE_CLOSED_ID).style.visibility = "visible";
  document.getElementById(SCRAPE_OPENED_ID).style.visibility = "hidden";
}

let scrapeOpen = function(){
  document.getElementById(SCRAPE_CLOSED_ID).style.visibility = "hidden";
  document.getElementById(SCRAPE_OPENED_ID).style.visibility = "visible";
}

let genScrape = function(){
  let img_urls = grabImageUrls();
  img_urls = processImgUrls(img_urls);
  img_urls = removeImgUrlsDups(img_urls);
  updateImageCount(img_urls.length);
  populateLists(img_urls);
}

let updateImageCount = function(i){
  document.getElementById(SCRAPE_COUNT_ID).innerHTML = i;
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

let getFilename = function(url){
  return url.split('/').pop();
}

let decomposeFilename = function(filename){
  return filename.split('.');
}

let getFilenameName = function(filename){
  let filename_segs = decomposeFilename(filename);
  filename_segs.pop();
  return filename_segs.join(".");
}

let getFilenameExt = function(filename){
  return decomposeFilename(filename).pop();
}

let buildLinkListItem = function(url, i){
  let img_lnk = document.createElement("a");
  img_lnk.href = url;
  img_lnk.target = "_blank";
  img_lnk.rel = "noopener noreferrer";
  img_lnk.download = downloadName(url, i);
  img_lnk.innerHTML = downloadName(url, i);
  return img_lnk;
}

let populateLists = function(img_urls){
  let download_commands = "";

  let url_list = "";

  let link_list_el = document.getElementById(SCRAPE_LINK_LIST_ID);
  link_list_el.innerHTML = "";

  for (let i=0; i<img_urls.length; i++){
    download_commands += "curl \"" + img_urls[i] + "\" -o \"" + downloadName(img_urls[i], i) + "\"\n";

    url_list += "\"" + img_urls[i] + "\" \"" + downloadName(img_urls[i], i) + "\"\n";

    link_list_el.append(
                         buildLinkListItem(img_urls[i], i),
                         document.createElement("br")
                       );
  }

  document.getElementById(SCRAPE_DL_CMD_ID).innerHTML = download_commands;

  document.getElementById(SCRAPE_URL_LIST_ID).innerHTML = url_list;
}

let copyScrapeDownload = function(){
  document.getElementById(SCRAPE_DL_CMD_ID).select();
  document.execCommand("copy");
}

let copyScrapeList = function(){
  document.getElementById(SCRAPE_URL_LIST_ID).select();
  document.execCommand("copy");
}

let buildCloseBtn = function(){
  let close_btn = document.createElement("button");
  close_btn.onclick = scrapeClose;
  close_btn.innerHTML = "X";
  close_btn.style.cssText = SCRAPE_BTN_STYLE;
  return close_btn;
}

let buildOpenBtn = function(){
  let open_btn = document.createElement("button");
  open_btn.onclick = scrapeOpen;
  open_btn.innerHTML = "↗";
  open_btn.style.cssText = SCRAPE_BTN_STYLE;
  return open_btn;
}

let buildGenScrapeBtn = function(){
  let gen_scrape_btn = document.createElement("button");
  gen_scrape_btn.onclick = genScrape;
  gen_scrape_btn.innerHTML = "Generate Scraping Content";
  return gen_scrape_btn;
}

let buildCountEl = function(){
  let count_el = document.createElement("span");
  count_el.id = SCRAPE_COUNT_ID;
  count_el.innerHTML = "0";
  return count_el;
}

let buildDownloadEl = function(){
  let download_el = document.createElement("textarea");
  download_el.id = SCRAPE_DL_CMD_ID;
  download_el.cols = 30;
  download_el.rows = 4;
  return download_el;
}

let buildDownloadBtn = function(){
  let download_btn = document.createElement("button");
  download_btn.onclick = copyScrapeDownload;
  download_btn.innerHTML = "Copy Download Commands";
  return download_btn;
}

let buildListEl = function(){
  let list_el = document.createElement("textarea");
  list_el.id = SCRAPE_URL_LIST_ID;
  list_el.cols = 30;
  list_el.rows = 4;
  return list_el;
}

let buildListBtn = function(){
  let list_btn = document.createElement("button");
  list_btn.onclick = copyScrapeList;
  list_btn.innerHTML = "Copy List";
  return list_btn;
}

let buildLinkListEl = function(){
  let link_list_el = document.createElement("div");
  link_list_el.id = SCRAPE_LINK_LIST_ID;
  link_list_el.innerHTML = "<i>(pending generation)</i>";
  return link_list_el;
}

let buildScrapeContentEl = function(){
  let scrape_content_el = document.createElement("div");
  scrape_content_el.id = SCRAPE_CONTENT_ID;
  scrape_content_el.innerHTML = "Count: ";
  scrape_content_el.append(
                            buildCountEl(),
                            document.createElement("hr"),
                            buildDownloadEl(),
                            document.createElement("br"),
                            buildDownloadBtn(),
                            document.createElement("hr"),
                            buildListEl(),
                            document.createElement("br"),
                            buildListBtn(),
                            document.createElement("hr"),
                            buildLinkListEl()
                          );
  return scrape_content_el;
}

let buildOpenedEl = function(){
  let opened_el = document.createElement("div");
  opened_el.id = SCRAPE_OPENED_ID;
  opened_el.style.cssText = OPENED_EL_STYLE;
  opened_el.append(
                    buildCloseBtn(),
                    buildGenScrapeBtn(),
                    buildScrapeContentEl()
                  );
  return opened_el;
}

let buildClosedEl = function(){
  let closed_el = document.createElement("div");
  closed_el.id = SCRAPE_CLOSED_ID;
  closed_el.style.cssText = CLOSED_EL_STYLE;
  closed_el.appendChild(buildOpenBtn());
  return closed_el;
}

let buildScrapeEl = function(){
  let el = document.createElement("div");
  el.id = SCRAPE_DIV_ID;
  el.style.cssText = SCRAPE_EL_STYLE;
  el.append(
             buildOpenedEl(),
             buildClosedEl()
           );
  BODY.appendChild(el);
}

if (!document.getElementById(SCRAPE_DIV_ID)){
  buildScrapeEl();
}
