// ==UserScript==
// @name         CFSTC-Local
// @description  金融标准全文公开系统-标准文件本地化 (标准号: JR/T XXXX-YEAR)
// @version      1.3
// @author       xcanwin
// @namespace    https://github.com/xcanwin/CFSTC-Local/
// @supportURL   https://github.com/xcanwin/CFSTC-Local/
// @license      AGPL-3.0-only
// @updateURL    https://raw.githubusercontent.com/xcanwin/CFSTC-Local/main/CFSTC-Local.user.js
// @downloadURL  https://raw.githubusercontent.com/xcanwin/CFSTC-Local/main/CFSTC-Local.user.js
// @match        https://www.cfstc.org/bzgk/gk/view/yulan.jsp?i_id=*&s_file_id=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let dp = displayPdfIframe;
    dp.onload = function(){
        let dm = new dp.contentWindow.DownloadManager();
        let fileurl = unescape(dp.src.split('=')[1]);
        let i_id = location.href.match(/i_id=(.*?)&/)[1];
        $.getJSON("/bzgk/gk?action=bzxq&xqpra=" + i_id, function(data){
            let s_num = data.p.s_num, s_name = data.p.s_name;
            let filename = `${s_num} ${s_name}.pdf`.replace("/", "").replace("—", "-");
            dm.downloadUrl(fileurl, filename);
            setTimeout(function(){
                alert(`CFSTC-Local 标准文件本地化:\n${filename}`);
            }, 2000);
        })
    };
})();