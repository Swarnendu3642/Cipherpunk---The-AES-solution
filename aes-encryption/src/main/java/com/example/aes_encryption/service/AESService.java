package com.example.aes_encryption.service;

import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;
import com.itextpdf.text.pdf.PdfWriter;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.ByteArrayOutputStream;
import java.security.SecureRandom;
import java.util.Base64;

@Service
public class AESService {

    @Autowired
    private JavaMailSender mailSender;

    private int KEY_SIZE = 256;

    public void setKeySize(int size) {
        if (size != 128 && size != 192 && size != 256) {
            throw new IllegalArgumentException("Allowed key sizes: 128, 192, 256");
        }
        this.KEY_SIZE = size;
    }


    public byte[] encryptAndSendKey(byte[] fileBytes, String email) throws Exception {
        // Generate AES key
        KeyGenerator keyGen = KeyGenerator.getInstance("AES");
        keyGen.init(KEY_SIZE);
        SecretKey aesKey = keyGen.generateKey();

        // Generate IV
        byte[] iv = new byte[16];
        new SecureRandom().nextBytes(iv);
        IvParameterSpec ivSpec = new IvParameterSpec(iv);

        // Encrypt the file content
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, aesKey, ivSpec);
        byte[] encryptedMessage = cipher.doFinal(fileBytes);

        // Prepare content
        String keyFileContent = Base64.getEncoder().encodeToString(aesKey.getEncoded()) + "\n" +
                Base64.getEncoder().encodeToString(iv);

        // Create PDF file in memory
        ByteArrayOutputStream pdfOut = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, pdfOut);
        document.open();
        document.add(new Paragraph("This file contains your AES key and IV.\n\n"));
        document.add(new Paragraph("Key (Base64): " + Base64.getEncoder().encodeToString(aesKey.getEncoded())));
        document.add(new Paragraph("IV (Base64): " + Base64.getEncoder().encodeToString(iv)));
        document.close();

        // Password-protect PDF
        String password = email.substring(0, 5); // Use first 5 characters (case-sensitive)
        ByteArrayOutputStream encryptedPdfOut = new ByteArrayOutputStream();
        PdfReader reader = new PdfReader(pdfOut.toByteArray());
        PdfStamper stamper = new PdfStamper(reader, encryptedPdfOut);

        stamper.setEncryption(password.getBytes(), password.getBytes(),
                PdfWriter.ALLOW_PRINTING,
                PdfWriter.ENCRYPTION_AES_128);

        stamper.close();
        reader.close();

        // Send the PDF via email
        sendKeyFileByEmail(email, encryptedPdfOut.toByteArray());

        return encryptedMessage;
    }

    private void sendKeyFileByEmail(String to, byte[] encryptedKeyPDF) throws Exception {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject("Your Encrypted AES Key File");
        helper.setText("Attached is your password-protected PDF key file.\n\n" +
                "Password: First 5 characters of your email (case-sensitive).\n\n" +
                "Use it to decrypt your encrypted file when needed.");

        helper.addAttachment("keyinfo.pdf", new ByteArrayResource(encryptedKeyPDF));
        mailSender.send(message);
    }


    public byte[] decrypt(byte[] encryptedMessage, byte[] encryptedKeyFile, String email) throws Exception {
        String password = email.substring(0, 5); // case-sensitive (as used during encryption)

        // Read the PDF with password
        PdfReader reader = new PdfReader(encryptedKeyFile, password.getBytes());

        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= reader.getNumberOfPages(); i++) {
            sb.append(com.itextpdf.text.pdf.parser.PdfTextExtractor.getTextFromPage(reader, i));
        }
        reader.close();

        String[] lines = sb.toString().split("\n");
        String keyLine = null, ivLine = null;

        for (String line : lines) {
            line = line.trim();
            if (line.startsWith("Key (Base64):")) {
                keyLine = line.replace("Key (Base64):", "").trim();
            } else if (line.startsWith("IV (Base64):")) {
                ivLine = line.replace("IV (Base64):", "").trim();
            }
        }

        if (keyLine == null || ivLine == null) {
            throw new IllegalArgumentException("Could not find Key or IV in the PDF.");
        }

        byte[] key = Base64.getDecoder().decode(keyLine);
        byte[] iv = Base64.getDecoder().decode(ivLine);

        SecretKeySpec keySpec = new SecretKeySpec(key, "AES");
        IvParameterSpec ivSpec = new IvParameterSpec(iv);

        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, keySpec, ivSpec);

        return cipher.doFinal(encryptedMessage);
    }


    private byte[] encryptWithPassword(byte[] data, String password) throws Exception {
        byte[] keyBytes = password.getBytes();
        byte[] keyPadded = new byte[16];
        System.arraycopy(keyBytes, 0, keyPadded, 0, Math.min(keyBytes.length, 16));

        SecretKeySpec passwordKey = new SecretKeySpec(keyPadded, "AES");
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, passwordKey);
        return cipher.doFinal(data);
    }

    private byte[] decryptWithPassword(byte[] data, String password) throws Exception {
        byte[] keyBytes = password.getBytes();
        byte[] keyPadded = new byte[16];
        System.arraycopy(keyBytes, 0, keyPadded, 0, Math.min(keyBytes.length, 16));

        SecretKeySpec passwordKey = new SecretKeySpec(keyPadded, "AES");
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, passwordKey);
        return cipher.doFinal(data);
    }
}