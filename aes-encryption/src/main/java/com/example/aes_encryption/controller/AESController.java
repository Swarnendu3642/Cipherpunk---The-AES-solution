package com.example.aes_encryption.controller;

import com.example.aes_encryption.service.AESService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class AESController {

    @Autowired
    private AESService aesService;


    // Encrypt with dynamic keySize (128, 192, or 256)
    @PostMapping("/encrypt")
    public ResponseEntity<byte[]> encrypt(@RequestParam("file") MultipartFile file,
                                          @RequestParam("email") String email,
                                          @RequestParam("keySize") int keySize) {
        try {
            aesService.setKeySize(keySize); // set key size here based on user input
            byte[] encryptedData = aesService.encryptAndSendKey(file.getBytes(), email);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=encrypted_file.txt")
                    .body(encryptedData);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(("Invalid key size: " + e.getMessage()).getBytes());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(("Encryption failed: " + e.getMessage()).getBytes());
        }
    }

    // ✅ Decrypt remains unchanged
    @PostMapping("/decrypt")
    public ResponseEntity<byte[]> decrypt(@RequestParam("encryptedFile") MultipartFile encFile,
                                          @RequestParam("keyFile") MultipartFile keyFile,
                                          @RequestParam("email") String email) {
        try {
            byte[] decrypted = aesService.decrypt(encFile.getBytes(), keyFile.getBytes(), email);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=decrypted_file.txt")
                    .body(decrypted);
        } catch (Exception e) {
            e.printStackTrace();  // For debugging
            return ResponseEntity.status(500).body(("Decryption failed: " + e.getMessage()).getBytes());
        }
    }
}
