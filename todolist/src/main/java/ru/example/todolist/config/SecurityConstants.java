package ru.example.todolist.config;

public class SecurityConstants {
    public static final String SIGN_UP_URLS = "/api/users/**";
    public static final String SECRET = "SecretToGenJWT";
    public static final String TOKEN_PREFIX = "PRETOKEN ";//space in the end is a must
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 30_000;
}
