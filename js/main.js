const BODY = document.getElementsByTagName("body")[0];
const OPENED_EL_STYLE = `
													height: 500px;
													width: 500px;
													border: 1px solid black;
													background-color: white;
													position: fixed;
													bottom: 0;
													left: 0;
													text-align: center;
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
	alert("Event Trigger");
}

let copyScrapeDownload = function(){
  alert("Event Trigger");
}

let copyScrapeList = function(){
  alert("Event Trigger");
}

let el = document.createElement("div");
el.id = "scrape";
el.style.position = "fixed";
el.style.bottom = "0";
el.style.left = "0";
el.style.zIndex = "1000000000";

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

opened_el.appendChild(scrape_content_el);

BODY.appendChild(el);
