class GryOnlineClient {
    static openGame(gameTitle) {
        const resp = await MonkeyUtils.gmFetch(`https://www.gry-online.pl/ajax/xml/gry.asp?search=${gameTitle}`);
        const responseXml = resp.hasXml ? new DOMParser().parseFromString(resp.responseText, 'text/xml') : null;
        const url = responseXml?.getElementsByTagName("row")[0]?.getAttribute('url');
        if (url) {
            window.open(url, '_blank', 'noopener noreferrer');
        } else {
            navigator.clipboard.writeText(gameTitle);
            alert('no url found, title copied to clipboard')
        }
    }
}
unsafeWindow.GryOnlineClient = GryOnlineClient;