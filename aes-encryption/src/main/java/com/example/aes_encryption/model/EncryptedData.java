package com.example.aes_encryption.model;

public class EncryptedData {
    private final String encryptedMessage;
    private final String encodedKey;
    private final String encodedIV;

    public EncryptedData(String encryptedMessage, String encodedKey, String encodedIV) {
        this.encryptedMessage = encryptedMessage;
        this.encodedKey = encodedKey;
        this.encodedIV = encodedIV;
    }

    public String getEncryptedMessage() {
        return encryptedMessage;
    }

    public String getEncodedKey() {
        return encodedKey;
    }

    public String getEncodedIV() {
        return encodedIV;
    }
}