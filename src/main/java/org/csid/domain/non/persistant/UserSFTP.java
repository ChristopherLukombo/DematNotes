package org.csid.domain.non.persistant;

import java.io.Serializable;
import java.util.Objects;

public class UserSFTP implements Serializable {
    private static final long serialVersionUID = 1L;

    private String username;
    private String password;
    private String server;
    private int port;

    public UserSFTP() { }

    public UserSFTP(String username, String password, String server, int port) {
        this.username = username;
        this.password = password;
        this.server = server;
        this.port = port;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getServer() {
        return server;
    }

    public void setServer(String server) {
        this.server = server;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserSFTP userSFTP = (UserSFTP) o;
        return port == userSFTP.port &&
            Objects.equals(username, userSFTP.username) &&
            Objects.equals(password, userSFTP.password) &&
            Objects.equals(server, userSFTP.server);
    }

    @Override
    public int hashCode() {

        return Objects.hash(username, password, server, port);
    }

    @Override
    public String toString() {
        return "UserSFTP{" +
            "username='" + username + '\'' +
            ", password='" + password + '\'' +
            ", server='" + server + '\'' +
            ", port=" + port +
            '}';
    }
}
