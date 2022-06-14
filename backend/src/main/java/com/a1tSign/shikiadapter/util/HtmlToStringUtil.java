package com.a1tSign.shikiadapter.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Util class for parsing html to string.
 */
public class HtmlToStringUtil {

    public static String parseHtmlPageToString(HttpURLConnection connection) throws IOException {
        BufferedReader in = new BufferedReader(
                new InputStreamReader(connection.getInputStream()));
        String inputLine;
        StringBuilder content = new StringBuilder();
        while ((inputLine = in.readLine()) != null) {
            content.append(inputLine);
        }
        in.close();

        return content.toString();
    }

    /**
     * Method for creating connection object.
     *
     * @param stringUrl url of connection
     * @return connection object
     * @throws IOException io exception
     */
    //TODO: can be added several params to configure connection object.
    public static HttpURLConnection getConnection(String stringUrl) throws IOException {
        URL url = new URL(stringUrl);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");

        return con;
    }
}
