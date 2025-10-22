package com.rally.up.go.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {

    @Value("${upload.dir}")
    private String filePath;

    @Value("${upload.prefix}")
    private String uploadPrefix;

    public String storeFile(MultipartFile file) throws IOException {
        String imageUrl = null;
        if (file != null && !file.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path absoluteFilePath = Paths.get(filePath, fileName);
            Files.copy(file.getInputStream(), absoluteFilePath, StandardCopyOption.REPLACE_EXISTING);
            imageUrl = uploadPrefix + fileName;
        }

        return imageUrl;
    }

    public void deleteFile(String fileName) throws IOException{
        fileName = fileName.replaceFirst(uploadPrefix, "");
        Path filePath = Paths.get(this.filePath, fileName);
        Files.delete(filePath);

    }

    public String updateFile(String filePath, MultipartFile newFile) throws IOException {
        deleteFile(filePath);
        return storeFile(newFile);
    }
}
