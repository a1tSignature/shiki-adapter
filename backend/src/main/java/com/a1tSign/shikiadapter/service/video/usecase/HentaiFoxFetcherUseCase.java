package com.a1tSign.shikiadapter.service.video.usecase;

import com.a1tSign.shikiadapter.contracts.dto.to.TitleTo;
import com.a1tSign.shikiadapter.util.HtmlToStringUtil;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.stream.Collectors;

import static com.a1tSign.shikiadapter.util.HtmlToStringUtil.getConnection;
import static com.a1tSign.shikiadapter.util.HtmlToStringUtil.parseHtmlPageToString;
import static org.jsoup.Jsoup.parse;

@Component
public class HentaiFoxFetcherUseCase {

    private static final String BASE_URL = "https://hentaifox.tv";
    private static final String SERIES = "/series/";
    private static final String VIDEO = "/video/";
    private static final String REG_EXP = "[^a-zA-Z]";

    public String getVideoLinks(TitleTo title) throws IOException {

        String searchSubstring = String.join("-", "Imaizumin Chi wa Douyara Gal no Tamariba ni Natteru Rashii".replaceAll(REG_EXP, " ")
                .toLowerCase().split(" "));
        HttpURLConnection con = getConnection(BASE_URL + SERIES + searchSubstring);

        String content = parseHtmlPageToString(con);
        Document document = parse(content);

        var videoPageLinks = document.getElementsByClass("vc_item").stream()
                .map(s -> s.attr("href"))
                .map(s -> BASE_URL + s)
                .collect(Collectors.toList());

        for (String link : videoPageLinks) {
            String number = StringUtils.substringAfterLast(link, "-");

            HttpURLConnection connection = getConnection(link);
            String pageContent = parseHtmlPageToString(connection);
            Document pageDocument = parse(pageContent);

            var nestedIframe = pageDocument.getElementsByTag("iframe").attr("src");

            HttpURLConnection iframeCon = getConnection(nestedIframe);;

            String iframeContent = parseHtmlPageToString(iframeCon);
            Document iframeDocument = parse(iframeContent);

            var a = iframeDocument.getElementsByTag("iframe").attr("src");

            System.out.println(a);

        }

        System.out.println(document.title());

        return String.join(" ", content);
    }
}
