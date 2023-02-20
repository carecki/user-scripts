class MonkeyUtils {
        static init() {
            unsafeWindow.MonkeyUtils = MonkeyUtils;
        }

        static addCode(code) {
            const script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.textContent = code;
            document.body.appendChild(script);
        }

        static guid() {
            function _p8(s = false) {
                const p = (Math.random().toString(16) + '000000000').substring(2, 10);
                return s ? '-' + p.substring(0, 4) + '-' + p.substring(4, 8) : p;
            }
            return _p8() + _p8(true) + _p8(true) + _p8();
        }

        static async gmFetch(url, method = 'GET', payload = undefined) {
            let result = await new Promise((resolve, reject) => {
                GM.xmlHttpRequest({
                    method,
                    url,
                    onload: response => {
                        console.log('GM_xmlHttpRequestAsync', response);
                        resolve(response);
                    },
                    onerror: (...args) => reject(args),
                    onabort: (...args) => reject(args),
                    ontimeout: (...args) => reject(args),
                });
            });

            result = {
                responseHeaders: result.responseHeaders,
                status: result.status,
                responseText: result.responseText,
                headersObj: (result.responseHeaders || '').split('\r\n').map(i => i.match(/([^:]+):\s*(.*)/)).filter(i => !!i).reduce((r, [all, g1, g2]) => { r[g1.toLowerCase()] = g2; return r; }, {}),
                hasXml: result.responseXML?.hasChildNodes(),
            };
            return result;
        }
    }
