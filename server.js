// run `node app.js` in the terminal

const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.argv[2] || 8080;

let server = http.createServer((req, res) => {
	if (req.url == '/') req.url = '/QuintOS_live.html';
	let url = `.${req.url}`.split('?')[0];
	console.log(`${req.method} '${url}'`);

	// based on the URL path, extract the file extention.
	const ext = path.parse(url).ext;
	// maps file extention to MIME type
	const MIME = {
		'.aac': 'audio/aac',
		'.css': 'text/css',
		'.doc': 'application/msword',
		'.html': 'text/html',
		'.ico': 'image/x-icon',
		'.jpg': 'image/jpeg',
		'.js': 'text/javascript',
		'.json': 'application/json',
		'.mp3': 'audio/mpeg',
		'.pdf': 'application/pdf',
		'.png': 'image/png',
		'.svg': 'image/svg+xml',
		'.ttf': 'font/ttf',
		'.wav': 'audio/wav',
		'.woff': 'font/woff',
		'.woff2': 'font/woff2'
	};

	{
   ".aac": {
      "Kind of document": "AAC audio",
      "MIME Type": "audio/aac"
   },
   ".abw": {
      "Kind of document": "AbiWord document",
      "MIME Type": "application/x-abiword"
   },
   ".arc": {
      "Kind of document": "Archive document (multiple files embedded)",
      "MIME Type": "application/x-freearc"
   },
   ".avi": {
      "Kind of document": "AVI: Audio Video Interleave",
      "MIME Type": "video/x-msvideo"
   },
   ".azw": {
      "Kind of document": "Amazon Kindle eBook format",
      "MIME Type": "application/vnd.amazon.ebook"
   },
   ".bin": {
      "Kind of document": "Any kind of binary data",
      "MIME Type": "application/octet-stream"
   },
   ".bmp": {
      "Kind of document": "Windows OS/2 Bitmap Graphics",
      "MIME Type": "image/bmp"
   },
   ".bz": {
      "Kind of document": "BZip archive",
      "MIME Type": "application/x-bzip"
   },
   ".bz2": {
      "Kind of document": "BZip2 archive",
      "MIME Type": "application/x-bzip2"
   },
   ".cda": {
      "Kind of document": "CD audio",
      "MIME Type": "application/x-cdf"
   },
   ".csh": {
      "Kind of document": "C-Shell script",
      "MIME Type": "application/x-csh"
   },
   ".css": {
      "Kind of document": "Cascading Style Sheets (CSS)",
      "MIME Type": "text/css"
   },
   ".csv": {
      "Kind of document": "Comma-separated values (CSV)",
      "MIME Type": "text/csv"
   },
   ".doc": {
      "Kind of document": "Microsoft Word",
      "MIME Type": "application/msword"
   },
   ".docx": {
      "Kind of document": "Microsoft Word (OpenXML)",
      "MIME Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
   },
   ".eot": {
      "Kind of document": "MS Embedded OpenType fonts",
      "MIME Type": "application/vnd.ms-fontobject"
   },
   ".epub": {
      "Kind of document": "Electronic publication (EPUB)",
      "MIME Type": "application/epub+zip"
   },
   ".gz": {
      "Kind of document": "GZip Compressed Archive",
      "MIME Type": "application/gzip"
   },
   ".gif": {
      "Kind of document": "Graphics Interchange Format (GIF)",
      "MIME Type": "image/gif"
   },
   ".htm .html": {
      "Kind of document": "HyperText Markup Language (HTML)",
      "MIME Type": "text/html"
   },
   ".ico": {
      "Kind of document": "Icon format",
      "MIME Type": "image/vnd.microsoft.icon"
   },
   ".ics": {
      "Kind of document": "iCalendar format",
      "MIME Type": "text/calendar"
   },
   ".jar": {
      "Kind of document": "Java Archive (JAR)",
      "MIME Type": "application/java-archive"
   },
   ".jpeg .jpg": {
      "Kind of document": "JPEG images",
      "MIME Type": "image/jpeg"
   },
   ".js": {
      "Kind of document": "JavaScript",
      "MIME Type": "text/javascript (Specifications: HTML and its reasoning, and IETF)"
   },
   ".json": {
      "Kind of document": "JSON format",
      "MIME Type": "application/json"
   },
   ".jsonld": {
      "Kind of document": "JSON-LD format",
      "MIME Type": "application/ld+json"
   },
   ".mid .midi": {
      "Kind of document": "Musical Instrument Digital Interface (MIDI)",
      "MIME Type": "audio/midi audio/x-midi"
   },
   ".mjs": {
      "Kind of document": "JavaScript module",
      "MIME Type": "text/javascript"
   },
   ".mp3": {
      "Kind of document": "MP3 audio",
      "MIME Type": "audio/mpeg"
   },
   ".mp4": {
      "Kind of document": "MP4 video",
      "MIME Type": "video/mp4"
   },
   ".mpeg": {
      "Kind of document": "MPEG Video",
      "MIME Type": "video/mpeg"
   },
   ".mpkg": {
      "Kind of document": "Apple Installer Package",
      "MIME Type": "application/vnd.apple.installer+xml"
   },
   ".odp": {
      "Kind of document": "OpenDocument presentation document",
      "MIME Type": "application/vnd.oasis.opendocument.presentation"
   },
   ".ods": {
      "Kind of document": "OpenDocument spreadsheet document",
      "MIME Type": "application/vnd.oasis.opendocument.spreadsheet"
   },
   ".odt": {
      "Kind of document": "OpenDocument text document",
      "MIME Type": "application/vnd.oasis.opendocument.text"
   },
   ".oga": {
      "Kind of document": "OGG audio",
      "MIME Type": "audio/ogg"
   },
   ".ogv": {
      "Kind of document": "OGG video",
      "MIME Type": "video/ogg"
   },
   ".ogx": {
      "Kind of document": "OGG",
      "MIME Type": "application/ogg"
   },
   ".opus": {
      "Kind of document": "Opus audio",
      "MIME Type": "audio/opus"
   },
   ".otf": {
      "Kind of document": "OpenType font",
      "MIME Type": "font/otf"
   },
   ".png": {
      "Kind of document": "Portable Network Graphics",
      "MIME Type": "image/png"
   },
   ".pdf": {
      "Kind of document": "Adobe Portable Document Format (PDF)",
      "MIME Type": "application/pdf"
   },
   ".php": {
      "Kind of document": "Hypertext Preprocessor (Personal Home Page)",
      "MIME Type": "application/x-httpd-php"
   },
   ".ppt": {
      "Kind of document": "Microsoft PowerPoint",
      "MIME Type": "application/vnd.ms-powerpoint"
   },
   ".pptx": {
      "Kind of document": "Microsoft PowerPoint (OpenXML)",
      "MIME Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation"
   },
   ".rar": {
      "Kind of document": "RAR archive",
      "MIME Type": "application/vnd.rar"
   },
   ".rtf": {
      "Kind of document": "Rich Text Format (RTF)",
      "MIME Type": "application/rtf"
   },
   ".sh": {
      "Kind of document": "Bourne shell script",
      "MIME Type": "application/x-sh"
   },
   ".svg": {
      "Kind of document": "Scalable Vector Graphics (SVG)",
      "MIME Type": "image/svg+xml"
   },
   ".swf": {
      "Kind of document": "Small web format (SWF) or Adobe Flash document",
      "MIME Type": "application/x-shockwave-flash"
   },
   ".tar": {
      "Kind of document": "Tape Archive (TAR)",
      "MIME Type": "application/x-tar"
   },
   ".tif .tiff": {
      "Kind of document": "Tagged Image File Format (TIFF)",
      "MIME Type": "image/tiff"
   },
   ".ts": {
      "Kind of document": "MPEG transport stream",
      "MIME Type": "video/mp2t"
   },
   ".ttf": {
      "Kind of document": "TrueType Font",
      "MIME Type": "font/ttf"
   },
   ".txt": {
      "Kind of document": "Text, (generally ASCII or ISO 8859-n)",
      "MIME Type": "text/plain"
   },
   ".vsd": {
      "Kind of document": "Microsoft Visio",
      "MIME Type": "application/vnd.visio"
   },
   ".wav": {
      "Kind of document": "Waveform Audio Format",
      "MIME Type": "audio/wav"
   },
   ".weba": {
      "Kind of document": "WEBM audio",
      "MIME Type": "audio/webm"
   },
   ".webm": {
      "Kind of document": "WEBM video",
      "MIME Type": "video/webm"
   },
   ".webp": {
      "Kind of document": "WEBP image",
      "MIME Type": "image/webp"
   },
   ".woff": {
      "Kind of document": "Web Open Font Format (WOFF)",
      "MIME Type": "font/woff"
   },
   ".woff2": {
      "Kind of document": "Web Open Font Format (WOFF)",
      "MIME Type": "font/woff2"
   },
   ".xhtml": {
      "Kind of document": "XHTML",
      "MIME Type": "application/xhtml+xml"
   },
   ".xls": {
      "Kind of document": "Microsoft Excel",
      "MIME Type": "application/vnd.ms-excel"
   },
   ".xlsx": {
      "Kind of document": "Microsoft Excel (OpenXML)",
      "MIME Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
   },
   ".xml": {
      "Kind of document": "XML",
      "MIME Type": "application/xml if not readable from casual users (RFC 3023, section 3) text/xml if readable from casual users (RFC 3023, section 3)"
   },
   ".xul": {
      "Kind of document": "XUL",
      "MIME Type": "application/vnd.mozilla.xul+xml"
   },
   ".zip": {
      "Kind of document": "ZIP archive",
      "MIME Type": "application/zip"
   },
   ".3gp": {
      "Kind of document": "3GPP audio/video container",
      "MIME Type": "video/3gpp audio/3gpp if it doesn't contain video"
   },
   ".3g2": {
      "Kind of document": "3GPP2 audio/video container",
      "MIME Type": "video/3gpp2 audio/3gpp2 if it doesn't contain video"
   },
   ".7z": {
      "Kind of document": "7-zip archive",
      "MIME Type": "application/x-7z-compressed"
   }
}

	let fileExists;
	try {
		fileExists = fs.statSync(url).isFile();
	} catch (error) {}

	if (!fileExists) {
		// if the file is not found, return 404
		res.statusCode = 404;
		res.end(`File ${url} not found!`);
		return;
	}

	// read file from file system
	let data;
	try {
		data = fs.readFileSync(url);
	} catch (err) {
		res.statusCode = 500;
		res.end(`Error getting the file: ${err}.`);
		return;
	}

	// if the file is found, set Content-Type and send data
	res.setHeader('Content-Type', MIME[ext] || 'text/plain');
	res.end(data);
});

server.listen(parseInt(port));

console.log(`Server listening on port: ${port}`);
