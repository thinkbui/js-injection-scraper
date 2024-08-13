# js-injection-scraper

|  :warning: WARNING      |
|:------------------------| 
| THIS PROJECT IS MEANT FOR DIRECT INJECTION INTO EXISTING WEBSITES, WHICH IS ALSO A COMMON WAY FOR SENSITIVE DATA THEFT AND OTHER MALICIOUS ACTIVITY.  THIS CODE IS ONLY FOR USE BY THOSE WITH AT LEAST A DECENT UNDERSTANDING OF JAVASCRIPT AND HTML/CSS.  YOU SHOULD ALWAYS BE SUSPICIOUS OF ANYONE ASKING YOU TO INJECT CODE YOU HAVEN'T REVIEWED AND/OR DON'T UNDERSTAND.  FOR THIS REASON, I WON'T INCLUDE INSTRUCTIONS FOR THE ACTUAL INJECTION, MANUALLY OR VIA BROWSER PLUGIN, AS WEB DEVELOPERS WHO KNOW WHAT THEY'RE DOING SHOULD ALREADY KNOW HOW TO DO THAT.  I CANNOT BE HELD RESPONSIBLE IF YOU INJECT MALICIOUS CODE AND YOUR SECURITY IS COMPROMISED.  USE AT YOUR OWN RISK. |

## SUMMARY
This project is intended to provide a basic framework for scraping images and videos from popular e-commerce websites.  Since the format of each website is different to suit branding and other design considerations, it is incumbent on the user of this framework to complete the functions for the target website and, if necessary, tailor the framework itself to function with that website.

The framework creates a small popup in the bottom left of the window that can be toggled open.  Once open, the popup contains text areas (along with buttons to copy their contents) that contain lists of curl commands to download the images and urls along with the generated download filenames.  There's also an area at the bottom for clickable links to each image.  However none of these are populated until you click the "Generate Scraping Content" button.  If at any point the listing's images get update, you can click this button again and the popup's contents will be updated accordingly.

To avoid loading of duplicate libraries, the framework is built in VanillaJS.

This code was conceived both as a study of HTML DOM manipulation and to assist sellers in extracting generic images for their own listings.

## INSTRUCTIONS
The template file is `js/main.js`.  The code is structured such that in most forseeable situations, you just need to complete the five functions at the top of the template.

`getItmNum()` and `getItmTitle()`, as the names imply, are helper functions to get identifying information for the product listing.  These are to be used in the `downloadName()` function and it is highly recommended that you use at least one of these functions.  You should be using JS's DOM object getters and/or query selectors to grab this information.

`downloadName()` is a function that is used to designate a download filename for each image (or video).  It is highly recommended that the format you use contains the name of the website your scraping from (eBay, Mercari, Target, etc), at least one of `getItmNum()` and `getItmTitle()`, the original filename, and the iterator or some other counter to differentiate the first picture from the second, third, fourth, etc.

`grabImageUrls()` is the function used to get all the image (and video) URLs for the product listing.  You should be using JS's DOM object getters and/or query selectors to grab these URLs.

`processImgUrls()` is to be used to modify the image URLs.  If you are trying to scrape images of a certain resolution and are familiar enough with how the website you're targetting structures its image endpoints to get that image size, you can used string manipulation functions modify the URLs accordingly.  Completing this function is optional.

It is not recommended that you import jQuery or another library in case it interferes with any libraries the target website uses.  However you may use jQuery if the website already uses it.
